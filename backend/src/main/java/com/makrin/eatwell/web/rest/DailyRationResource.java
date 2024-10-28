package com.makrin.eatwell.web.rest;

import com.makrin.eatwell.domain.DailyRation;
import com.makrin.eatwell.repository.DailyRationRepository;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.makrin.eatwell.domain.DailyRation}.
 */
@RestController
@RequestMapping("/api/daily-rations")
@Transactional
public class DailyRationResource {

    private static final Logger LOG = LoggerFactory.getLogger(DailyRationResource.class);

    private static final String ENTITY_NAME = "dailyRation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DailyRationRepository dailyRationRepository;

    public DailyRationResource(DailyRationRepository dailyRationRepository) {
        this.dailyRationRepository = dailyRationRepository;
    }

    /**
     * {@code POST  /daily-rations} : Create a new dailyRation.
     *
     * @param dailyRation the dailyRation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dailyRation, or with status {@code 400 (Bad Request)} if the dailyRation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<DailyRation> createDailyRation(@Valid @RequestBody DailyRation dailyRation) throws URISyntaxException {
        LOG.debug("REST request to save DailyRation : {}", dailyRation);
        if (dailyRation.getId() != null) {
            throw new BadRequestAlertException("A new dailyRation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        dailyRation = dailyRationRepository.save(dailyRation);
        return ResponseEntity.created(new URI("/api/daily-rations/" + dailyRation.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, dailyRation.getId().toString()))
            .body(dailyRation);
    }

    /**
     * {@code PUT  /daily-rations/:id} : Updates an existing dailyRation.
     *
     * @param id the id of the dailyRation to save.
     * @param dailyRation the dailyRation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dailyRation,
     * or with status {@code 400 (Bad Request)} if the dailyRation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dailyRation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<DailyRation> updateDailyRation(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DailyRation dailyRation
    ) throws URISyntaxException {
        LOG.debug("REST request to update DailyRation : {}, {}", id, dailyRation);
        if (dailyRation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dailyRation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dailyRationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        dailyRation = dailyRationRepository.save(dailyRation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dailyRation.getId().toString()))
            .body(dailyRation);
    }

    /**
     * {@code PATCH  /daily-rations/:id} : Partial updates given fields of an existing dailyRation, field will ignore if it is null
     *
     * @param id the id of the dailyRation to save.
     * @param dailyRation the dailyRation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dailyRation,
     * or with status {@code 400 (Bad Request)} if the dailyRation is not valid,
     * or with status {@code 404 (Not Found)} if the dailyRation is not found,
     * or with status {@code 500 (Internal Server Error)} if the dailyRation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DailyRation> partialUpdateDailyRation(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DailyRation dailyRation
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update DailyRation partially : {}, {}", id, dailyRation);
        if (dailyRation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, dailyRation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!dailyRationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DailyRation> result = dailyRationRepository
            .findById(dailyRation.getId())
            .map(existingDailyRation -> {
                if (dailyRation.getProductWeight() != null) {
                    existingDailyRation.setProductWeight(dailyRation.getProductWeight());
                }
                if (dailyRation.getCreatedDate() != null) {
                    existingDailyRation.setCreatedDate(dailyRation.getCreatedDate());
                }
                if (dailyRation.getLastModifiedDate() != null) {
                    existingDailyRation.setLastModifiedDate(dailyRation.getLastModifiedDate());
                }

                return existingDailyRation;
            })
            .map(dailyRationRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, dailyRation.getId().toString())
        );
    }

    /**
     * {@code GET  /daily-rations} : get all the dailyRations.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of dailyRations in body.
     */
    @GetMapping("")
    public ResponseEntity<List<DailyRation>> getAllDailyRations(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of DailyRations");
        Page<DailyRation> page = dailyRationRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /daily-rations/:id} : get the "id" dailyRation.
     *
     * @param id the id of the dailyRation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dailyRation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<DailyRation> getDailyRation(@PathVariable("id") Long id) {
        LOG.debug("REST request to get DailyRation : {}", id);
        Optional<DailyRation> dailyRation = dailyRationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(dailyRation);
    }

    /**
     * {@code DELETE  /daily-rations/:id} : delete the "id" dailyRation.
     *
     * @param id the id of the dailyRation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDailyRation(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete DailyRation : {}", id);
        dailyRationRepository.deleteById(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
