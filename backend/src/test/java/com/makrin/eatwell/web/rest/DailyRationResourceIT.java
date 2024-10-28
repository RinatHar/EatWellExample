package com.makrin.eatwell.web.rest;

import static com.makrin.eatwell.domain.DailyRationAsserts.*;
import static com.makrin.eatwell.web.rest.TestUtil.createUpdateProxyForBean;
import static com.makrin.eatwell.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makrin.eatwell.IntegrationTest;
import com.makrin.eatwell.domain.DailyRation;
import com.makrin.eatwell.repository.DailyRationRepository;
import com.makrin.eatwell.repository.UserRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DailyRationResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DailyRationResourceIT {

    private static final Double DEFAULT_PRODUCT_WEIGHT = 1D;
    private static final Double UPDATED_PRODUCT_WEIGHT = 2D;

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LAST_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/daily-rations";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private DailyRationRepository dailyRationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDailyRationMockMvc;

    private DailyRation dailyRation;

    private DailyRation insertedDailyRation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DailyRation createEntity() {
        return new DailyRation()
            .productWeight(DEFAULT_PRODUCT_WEIGHT)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DailyRation createUpdatedEntity() {
        return new DailyRation()
            .productWeight(UPDATED_PRODUCT_WEIGHT)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
    }

    @BeforeEach
    public void initTest() {
        dailyRation = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedDailyRation != null) {
            dailyRationRepository.delete(insertedDailyRation);
            insertedDailyRation = null;
        }
    }

    @Test
    @Transactional
    void createDailyRation() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the DailyRation
        var returnedDailyRation = om.readValue(
            restDailyRationMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dailyRation)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            DailyRation.class
        );

        // Validate the DailyRation in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertDailyRationUpdatableFieldsEquals(returnedDailyRation, getPersistedDailyRation(returnedDailyRation));

        insertedDailyRation = returnedDailyRation;
    }

    @Test
    @Transactional
    void createDailyRationWithExistingId() throws Exception {
        // Create the DailyRation with an existing ID
        dailyRation.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDailyRationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dailyRation)))
            .andExpect(status().isBadRequest());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkProductWeightIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        dailyRation.setProductWeight(null);

        // Create the DailyRation, which fails.

        restDailyRationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dailyRation)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        dailyRation.setCreatedDate(null);

        // Create the DailyRation, which fails.

        restDailyRationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dailyRation)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLastModifiedDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        dailyRation.setLastModifiedDate(null);

        // Create the DailyRation, which fails.

        restDailyRationMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dailyRation)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllDailyRations() throws Exception {
        // Initialize the database
        insertedDailyRation = dailyRationRepository.saveAndFlush(dailyRation);

        // Get all the dailyRationList
        restDailyRationMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dailyRation.getId().intValue())))
            .andExpect(jsonPath("$.[*].productWeight").value(hasItem(DEFAULT_PRODUCT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(sameInstant(DEFAULT_LAST_MODIFIED_DATE))));
    }

    @Test
    @Transactional
    void getDailyRation() throws Exception {
        // Initialize the database
        insertedDailyRation = dailyRationRepository.saveAndFlush(dailyRation);

        // Get the dailyRation
        restDailyRationMockMvc
            .perform(get(ENTITY_API_URL_ID, dailyRation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(dailyRation.getId().intValue()))
            .andExpect(jsonPath("$.productWeight").value(DEFAULT_PRODUCT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.lastModifiedDate").value(sameInstant(DEFAULT_LAST_MODIFIED_DATE)));
    }

    @Test
    @Transactional
    void getNonExistingDailyRation() throws Exception {
        // Get the dailyRation
        restDailyRationMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDailyRation() throws Exception {
        // Initialize the database
        insertedDailyRation = dailyRationRepository.saveAndFlush(dailyRation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dailyRation
        DailyRation updatedDailyRation = dailyRationRepository.findById(dailyRation.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedDailyRation are not directly saved in db
        em.detach(updatedDailyRation);
        updatedDailyRation
            .productWeight(UPDATED_PRODUCT_WEIGHT)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restDailyRationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDailyRation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedDailyRation))
            )
            .andExpect(status().isOk());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedDailyRationToMatchAllProperties(updatedDailyRation);
    }

    @Test
    @Transactional
    void putNonExistingDailyRation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dailyRation.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDailyRationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, dailyRation.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dailyRation))
            )
            .andExpect(status().isBadRequest());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDailyRation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dailyRation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDailyRationMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(dailyRation))
            )
            .andExpect(status().isBadRequest());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDailyRation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dailyRation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDailyRationMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(dailyRation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDailyRationWithPatch() throws Exception {
        // Initialize the database
        insertedDailyRation = dailyRationRepository.saveAndFlush(dailyRation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dailyRation using partial update
        DailyRation partialUpdatedDailyRation = new DailyRation();
        partialUpdatedDailyRation.setId(dailyRation.getId());

        partialUpdatedDailyRation.createdDate(UPDATED_CREATED_DATE).lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restDailyRationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDailyRation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDailyRation))
            )
            .andExpect(status().isOk());

        // Validate the DailyRation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDailyRationUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedDailyRation, dailyRation),
            getPersistedDailyRation(dailyRation)
        );
    }

    @Test
    @Transactional
    void fullUpdateDailyRationWithPatch() throws Exception {
        // Initialize the database
        insertedDailyRation = dailyRationRepository.saveAndFlush(dailyRation);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the dailyRation using partial update
        DailyRation partialUpdatedDailyRation = new DailyRation();
        partialUpdatedDailyRation.setId(dailyRation.getId());

        partialUpdatedDailyRation
            .productWeight(UPDATED_PRODUCT_WEIGHT)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restDailyRationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDailyRation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedDailyRation))
            )
            .andExpect(status().isOk());

        // Validate the DailyRation in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertDailyRationUpdatableFieldsEquals(partialUpdatedDailyRation, getPersistedDailyRation(partialUpdatedDailyRation));
    }

    @Test
    @Transactional
    void patchNonExistingDailyRation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dailyRation.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDailyRationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, dailyRation.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dailyRation))
            )
            .andExpect(status().isBadRequest());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDailyRation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dailyRation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDailyRationMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(dailyRation))
            )
            .andExpect(status().isBadRequest());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDailyRation() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        dailyRation.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDailyRationMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(dailyRation)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the DailyRation in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDailyRation() throws Exception {
        // Initialize the database
        insertedDailyRation = dailyRationRepository.saveAndFlush(dailyRation);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the dailyRation
        restDailyRationMockMvc
            .perform(delete(ENTITY_API_URL_ID, dailyRation.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return dailyRationRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected DailyRation getPersistedDailyRation(DailyRation dailyRation) {
        return dailyRationRepository.findById(dailyRation.getId()).orElseThrow();
    }

    protected void assertPersistedDailyRationToMatchAllProperties(DailyRation expectedDailyRation) {
        assertDailyRationAllPropertiesEquals(expectedDailyRation, getPersistedDailyRation(expectedDailyRation));
    }

    protected void assertPersistedDailyRationToMatchUpdatableProperties(DailyRation expectedDailyRation) {
        assertDailyRationAllUpdatablePropertiesEquals(expectedDailyRation, getPersistedDailyRation(expectedDailyRation));
    }
}
