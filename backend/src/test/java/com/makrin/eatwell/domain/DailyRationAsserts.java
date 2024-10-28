package com.makrin.eatwell.domain;

import static com.makrin.eatwell.domain.AssertUtils.zonedDataTimeSameInstant;
import static org.assertj.core.api.Assertions.assertThat;

public class DailyRationAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDailyRationAllPropertiesEquals(DailyRation expected, DailyRation actual) {
        assertDailyRationAutoGeneratedPropertiesEquals(expected, actual);
        assertDailyRationAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDailyRationAllUpdatablePropertiesEquals(DailyRation expected, DailyRation actual) {
        assertDailyRationUpdatableFieldsEquals(expected, actual);
        assertDailyRationUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDailyRationAutoGeneratedPropertiesEquals(DailyRation expected, DailyRation actual) {
        assertThat(expected)
            .as("Verify DailyRation auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDailyRationUpdatableFieldsEquals(DailyRation expected, DailyRation actual) {
        assertThat(expected)
            .as("Verify DailyRation relevant properties")
            .satisfies(e -> assertThat(e.getProductWeight()).as("check productWeight").isEqualTo(actual.getProductWeight()))
            .satisfies(e ->
                assertThat(e.getCreatedDate())
                    .as("check createdDate")
                    .usingComparator(zonedDataTimeSameInstant)
                    .isEqualTo(actual.getCreatedDate())
            )
            .satisfies(e ->
                assertThat(e.getLastModifiedDate())
                    .as("check lastModifiedDate")
                    .usingComparator(zonedDataTimeSameInstant)
                    .isEqualTo(actual.getLastModifiedDate())
            );
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertDailyRationUpdatableRelationshipsEquals(DailyRation expected, DailyRation actual) {
        assertThat(expected)
            .as("Verify DailyRation relationships")
            .satisfies(e -> assertThat(e.getProduct()).as("check product").isEqualTo(actual.getProduct()));
    }
}
