package com.makrin.eatwell.web.rest;

import com.makrin.eatwell.domain.UserProperties;
import com.makrin.eatwell.repository.UserPropertiesRepository;
import com.makrin.eatwell.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.makrin.eatwell.domain.UserProperties}.
 */
@RestController
@RequestMapping("/api/user-properties")
@Transactional
public class UserPropertiesResource {

    private static final Logger LOG = LoggerFactory.getLogger(UserPropertiesResource.class);

    private static final String ENTITY_NAME = "userProperties";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserPropertiesRepository userPropertiesRepository;

    public UserPropertiesResource(UserPropertiesRepository userPropertiesRepository) {
        this.userPropertiesRepository = userPropertiesRepository;
    }

    /**
     * {@code POST  /user-properties} : Create a new userProperties.
     *
     * @param userProperties the userProperties to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userProperties, or with status {@code 400 (Bad Request)} if the userProperties has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<UserProperties> createUserProperties(@Valid @RequestBody UserProperties userProperties)
        throws URISyntaxException {
        LOG.debug("REST request to save UserProperties : {}", userProperties);
        if (userProperties.getId() != null) {
            throw new BadRequestAlertException("A new userProperties cannot already have an ID", ENTITY_NAME, "idexists");
        }
        userProperties = userPropertiesRepository.save(userProperties);
        return ResponseEntity.created(new URI("/api/user-properties/" + userProperties.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, userProperties.getId().toString()))
            .body(userProperties);
    }

    /**
     * {@code PUT  /user-properties/:id} : Updates an existing userProperties.
     *
     * @param id the id of the userProperties to save.
     * @param userProperties the userProperties to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProperties,
     * or with status {@code 400 (Bad Request)} if the userProperties is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userProperties couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserProperties> updateUserProperties(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UserProperties userProperties
    ) throws URISyntaxException {
        LOG.debug("REST request to update UserProperties : {}, {}", id, userProperties);
        if (userProperties.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userProperties.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userPropertiesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        userProperties = userPropertiesRepository.save(userProperties);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userProperties.getId().toString()))
            .body(userProperties);
    }

    /**
     * {@code PATCH  /user-properties/:id} : Partial updates given fields of an existing userProperties, field will ignore if it is null
     *
     * @param id the id of the userProperties to save.
     * @param userProperties the userProperties to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userProperties,
     * or with status {@code 400 (Bad Request)} if the userProperties is not valid,
     * or with status {@code 404 (Not Found)} if the userProperties is not found,
     * or with status {@code 500 (Internal Server Error)} if the userProperties couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserProperties> partialUpdateUserProperties(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UserProperties userProperties
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update UserProperties partially : {}, {}", id, userProperties);
        if (userProperties.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userProperties.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userPropertiesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserProperties> result = userPropertiesRepository
            .findById(userProperties.getId())
            .map(existingUserProperties -> {
                if (userProperties.getName() != null) {
                    existingUserProperties.setName(userProperties.getName());
                }
                if (userProperties.getGender() != null) {
                    existingUserProperties.setGender(userProperties.getGender());
                }
                if (userProperties.getDate() != null) {
                    existingUserProperties.setDate(userProperties.getDate());
                }
                if (userProperties.getCurrentWeight() != null) {
                    existingUserProperties.setCurrentWeight(userProperties.getCurrentWeight());
                }
                if (userProperties.getPreferredWeight() != null) {
                    existingUserProperties.setPreferredWeight(userProperties.getPreferredWeight());
                }
                if (userProperties.getHeight() != null) {
                    existingUserProperties.setHeight(userProperties.getHeight());
                }
                if (userProperties.getLifestyle() != null) {
                    existingUserProperties.setLifestyle(userProperties.getLifestyle());
                }
                if (userProperties.getCaloriesNeeded() != null) {
                    existingUserProperties.setCaloriesNeeded(userProperties.getCaloriesNeeded());
                }
                if (userProperties.getCreatedDate() != null) {
                    existingUserProperties.setCreatedDate(userProperties.getCreatedDate());
                }
                if (userProperties.getLastModifiedDate() != null) {
                    existingUserProperties.setLastModifiedDate(userProperties.getLastModifiedDate());
                }

                return existingUserProperties;
            })
            .map(userPropertiesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userProperties.getId().toString())
        );
    }

    /**
     * {@code GET  /user-properties} : get all the userProperties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userProperties in body.
     */
    @GetMapping("")
    public List<UserProperties> getAllUserProperties() {
        LOG.debug("REST request to get all UserProperties");
        return userPropertiesRepository.findAll();
    }

    /**
     * {@code GET  /user-properties/:id} : get the "id" userProperties.
     *
     * @param id the id of the userProperties to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userProperties, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserProperties> getUserProperties(@PathVariable("id") Long id) {
        LOG.debug("REST request to get UserProperties : {}", id);
        Optional<UserProperties> userProperties = userPropertiesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userProperties);
    }

    /**
     * {@code DELETE  /user-properties/:id} : delete the "id" userProperties.
     *
     * @param id the id of the userProperties to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProperties(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete UserProperties : {}", id);
        userPropertiesRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
