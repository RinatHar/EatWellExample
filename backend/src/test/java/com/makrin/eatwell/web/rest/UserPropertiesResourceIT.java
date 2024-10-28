package com.makrin.eatwell.web.rest;

import static com.makrin.eatwell.domain.UserPropertiesAsserts.*;
import static com.makrin.eatwell.web.rest.TestUtil.createUpdateProxyForBean;
import static com.makrin.eatwell.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makrin.eatwell.IntegrationTest;
import com.makrin.eatwell.domain.UserProperties;
import com.makrin.eatwell.domain.enumeration.Gender;
import com.makrin.eatwell.domain.enumeration.Lifestyle;
import com.makrin.eatwell.repository.UserPropertiesRepository;
import com.makrin.eatwell.repository.UserRepository;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.LocalDate;
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
 * Integration tests for the {@link UserPropertiesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserPropertiesResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_CURRENT_WEIGHT = 1D;
    private static final Double UPDATED_CURRENT_WEIGHT = 2D;

    private static final Double DEFAULT_PREFERRED_WEIGHT = 1D;
    private static final Double UPDATED_PREFERRED_WEIGHT = 2D;

    private static final Double DEFAULT_HEIGHT = 1D;
    private static final Double UPDATED_HEIGHT = 2D;

    private static final Lifestyle DEFAULT_LIFESTYLE = Lifestyle.SEDENTARY;
    private static final Lifestyle UPDATED_LIFESTYLE = Lifestyle.LIGHTLY_ACTIVE;

    private static final Double DEFAULT_CALORIES_NEEDED = 1D;
    private static final Double UPDATED_CALORIES_NEEDED = 2D;

    private static final ZonedDateTime DEFAULT_CREATED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_LAST_MODIFIED_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_LAST_MODIFIED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String ENTITY_API_URL = "/api/user-properties";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private UserPropertiesRepository userPropertiesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserPropertiesMockMvc;

    private UserProperties userProperties;

    private UserProperties insertedUserProperties;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProperties createEntity() {
        return new UserProperties()
            .name(DEFAULT_NAME)
            .gender(DEFAULT_GENDER)
            .date(DEFAULT_DATE)
            .currentWeight(DEFAULT_CURRENT_WEIGHT)
            .preferredWeight(DEFAULT_PREFERRED_WEIGHT)
            .height(DEFAULT_HEIGHT)
            .lifestyle(DEFAULT_LIFESTYLE)
            .caloriesNeeded(DEFAULT_CALORIES_NEEDED)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserProperties createUpdatedEntity() {
        return new UserProperties()
            .name(UPDATED_NAME)
            .gender(UPDATED_GENDER)
            .date(UPDATED_DATE)
            .currentWeight(UPDATED_CURRENT_WEIGHT)
            .preferredWeight(UPDATED_PREFERRED_WEIGHT)
            .height(UPDATED_HEIGHT)
            .lifestyle(UPDATED_LIFESTYLE)
            .caloriesNeeded(UPDATED_CALORIES_NEEDED)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);
    }

    @BeforeEach
    public void initTest() {
        userProperties = createEntity();
    }

    @AfterEach
    public void cleanup() {
        if (insertedUserProperties != null) {
            userPropertiesRepository.delete(insertedUserProperties);
            insertedUserProperties = null;
        }
    }

    @Test
    @Transactional
    void createUserProperties() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the UserProperties
        var returnedUserProperties = om.readValue(
            restUserPropertiesMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            UserProperties.class
        );

        // Validate the UserProperties in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        assertUserPropertiesUpdatableFieldsEquals(returnedUserProperties, getPersistedUserProperties(returnedUserProperties));

        insertedUserProperties = returnedUserProperties;
    }

    @Test
    @Transactional
    void createUserPropertiesWithExistingId() throws Exception {
        // Create the UserProperties with an existing ID
        userProperties.setId(1L);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNameIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setName(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkGenderIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setGender(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setDate(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCurrentWeightIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setCurrentWeight(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPreferredWeightIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setPreferredWeight(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkHeightIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setHeight(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLifestyleIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setLifestyle(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCaloriesNeededIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setCaloriesNeeded(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkCreatedDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setCreatedDate(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLastModifiedDateIsRequired() throws Exception {
        long databaseSizeBeforeTest = getRepositoryCount();
        // set the field null
        userProperties.setLastModifiedDate(null);

        // Create the UserProperties, which fails.

        restUserPropertiesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isBadRequest());

        assertSameRepositoryCount(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUserProperties() throws Exception {
        // Initialize the database
        insertedUserProperties = userPropertiesRepository.saveAndFlush(userProperties);

        // Get all the userPropertiesList
        restUserPropertiesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userProperties.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].currentWeight").value(hasItem(DEFAULT_CURRENT_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].preferredWeight").value(hasItem(DEFAULT_PREFERRED_WEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].height").value(hasItem(DEFAULT_HEIGHT.doubleValue())))
            .andExpect(jsonPath("$.[*].lifestyle").value(hasItem(DEFAULT_LIFESTYLE.toString())))
            .andExpect(jsonPath("$.[*].caloriesNeeded").value(hasItem(DEFAULT_CALORIES_NEEDED.doubleValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(sameInstant(DEFAULT_CREATED_DATE))))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(sameInstant(DEFAULT_LAST_MODIFIED_DATE))));
    }

    @Test
    @Transactional
    void getUserProperties() throws Exception {
        // Initialize the database
        insertedUserProperties = userPropertiesRepository.saveAndFlush(userProperties);

        // Get the userProperties
        restUserPropertiesMockMvc
            .perform(get(ENTITY_API_URL_ID, userProperties.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userProperties.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.currentWeight").value(DEFAULT_CURRENT_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.preferredWeight").value(DEFAULT_PREFERRED_WEIGHT.doubleValue()))
            .andExpect(jsonPath("$.height").value(DEFAULT_HEIGHT.doubleValue()))
            .andExpect(jsonPath("$.lifestyle").value(DEFAULT_LIFESTYLE.toString()))
            .andExpect(jsonPath("$.caloriesNeeded").value(DEFAULT_CALORIES_NEEDED.doubleValue()))
            .andExpect(jsonPath("$.createdDate").value(sameInstant(DEFAULT_CREATED_DATE)))
            .andExpect(jsonPath("$.lastModifiedDate").value(sameInstant(DEFAULT_LAST_MODIFIED_DATE)));
    }

    @Test
    @Transactional
    void getNonExistingUserProperties() throws Exception {
        // Get the userProperties
        restUserPropertiesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUserProperties() throws Exception {
        // Initialize the database
        insertedUserProperties = userPropertiesRepository.saveAndFlush(userProperties);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the userProperties
        UserProperties updatedUserProperties = userPropertiesRepository.findById(userProperties.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedUserProperties are not directly saved in db
        em.detach(updatedUserProperties);
        updatedUserProperties
            .name(UPDATED_NAME)
            .gender(UPDATED_GENDER)
            .date(UPDATED_DATE)
            .currentWeight(UPDATED_CURRENT_WEIGHT)
            .preferredWeight(UPDATED_PREFERRED_WEIGHT)
            .height(UPDATED_HEIGHT)
            .lifestyle(UPDATED_LIFESTYLE)
            .caloriesNeeded(UPDATED_CALORIES_NEEDED)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restUserPropertiesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserProperties.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(updatedUserProperties))
            )
            .andExpect(status().isOk());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedUserPropertiesToMatchAllProperties(updatedUserProperties);
    }

    @Test
    @Transactional
    void putNonExistingUserProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProperties.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserPropertiesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userProperties.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(userProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProperties.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserPropertiesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(userProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProperties.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserPropertiesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserPropertiesWithPatch() throws Exception {
        // Initialize the database
        insertedUserProperties = userPropertiesRepository.saveAndFlush(userProperties);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the userProperties using partial update
        UserProperties partialUpdatedUserProperties = new UserProperties();
        partialUpdatedUserProperties.setId(userProperties.getId());

        partialUpdatedUserProperties.lifestyle(UPDATED_LIFESTYLE).lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restUserPropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserProperties.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedUserProperties))
            )
            .andExpect(status().isOk());

        // Validate the UserProperties in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertUserPropertiesUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedUserProperties, userProperties),
            getPersistedUserProperties(userProperties)
        );
    }

    @Test
    @Transactional
    void fullUpdateUserPropertiesWithPatch() throws Exception {
        // Initialize the database
        insertedUserProperties = userPropertiesRepository.saveAndFlush(userProperties);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the userProperties using partial update
        UserProperties partialUpdatedUserProperties = new UserProperties();
        partialUpdatedUserProperties.setId(userProperties.getId());

        partialUpdatedUserProperties
            .name(UPDATED_NAME)
            .gender(UPDATED_GENDER)
            .date(UPDATED_DATE)
            .currentWeight(UPDATED_CURRENT_WEIGHT)
            .preferredWeight(UPDATED_PREFERRED_WEIGHT)
            .height(UPDATED_HEIGHT)
            .lifestyle(UPDATED_LIFESTYLE)
            .caloriesNeeded(UPDATED_CALORIES_NEEDED)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restUserPropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserProperties.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedUserProperties))
            )
            .andExpect(status().isOk());

        // Validate the UserProperties in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertUserPropertiesUpdatableFieldsEquals(partialUpdatedUserProperties, getPersistedUserProperties(partialUpdatedUserProperties));
    }

    @Test
    @Transactional
    void patchNonExistingUserProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProperties.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserPropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userProperties.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(userProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProperties.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserPropertiesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(userProperties))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserProperties() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        userProperties.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserPropertiesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(userProperties)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserProperties in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserProperties() throws Exception {
        // Initialize the database
        insertedUserProperties = userPropertiesRepository.saveAndFlush(userProperties);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the userProperties
        restUserPropertiesMockMvc
            .perform(delete(ENTITY_API_URL_ID, userProperties.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return userPropertiesRepository.count();
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

    protected UserProperties getPersistedUserProperties(UserProperties userProperties) {
        return userPropertiesRepository.findById(userProperties.getId()).orElseThrow();
    }

    protected void assertPersistedUserPropertiesToMatchAllProperties(UserProperties expectedUserProperties) {
        assertUserPropertiesAllPropertiesEquals(expectedUserProperties, getPersistedUserProperties(expectedUserProperties));
    }

    protected void assertPersistedUserPropertiesToMatchUpdatableProperties(UserProperties expectedUserProperties) {
        assertUserPropertiesAllUpdatablePropertiesEquals(expectedUserProperties, getPersistedUserProperties(expectedUserProperties));
    }
}
