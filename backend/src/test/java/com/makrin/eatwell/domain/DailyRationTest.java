package com.makrin.eatwell.domain;

import static com.makrin.eatwell.domain.DailyRationTestSamples.*;
import static com.makrin.eatwell.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.makrin.eatwell.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DailyRationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DailyRation.class);
        DailyRation dailyRation1 = getDailyRationSample1();
        DailyRation dailyRation2 = new DailyRation();
        assertThat(dailyRation1).isNotEqualTo(dailyRation2);

        dailyRation2.setId(dailyRation1.getId());
        assertThat(dailyRation1).isEqualTo(dailyRation2);

        dailyRation2 = getDailyRationSample2();
        assertThat(dailyRation1).isNotEqualTo(dailyRation2);
    }

    @Test
    void productTest() {
        DailyRation dailyRation = getDailyRationRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        dailyRation.setProduct(productBack);
        assertThat(dailyRation.getProduct()).isEqualTo(productBack);

        dailyRation.product(null);
        assertThat(dailyRation.getProduct()).isNull();
    }
}
