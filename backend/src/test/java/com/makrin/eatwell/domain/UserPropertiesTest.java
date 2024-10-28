package com.makrin.eatwell.domain;

import static com.makrin.eatwell.domain.UserPropertiesTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.makrin.eatwell.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserPropertiesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserProperties.class);
        UserProperties userProperties1 = getUserPropertiesSample1();
        UserProperties userProperties2 = new UserProperties();
        assertThat(userProperties1).isNotEqualTo(userProperties2);

        userProperties2.setId(userProperties1.getId());
        assertThat(userProperties1).isEqualTo(userProperties2);

        userProperties2 = getUserPropertiesSample2();
        assertThat(userProperties1).isNotEqualTo(userProperties2);
    }
}
