package com.makrin.eatwell.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class DailyRationTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DailyRation getDailyRationSample1() {
        return new DailyRation().id(1L);
    }

    public static DailyRation getDailyRationSample2() {
        return new DailyRation().id(2L);
    }

    public static DailyRation getDailyRationRandomSampleGenerator() {
        return new DailyRation().id(longCount.incrementAndGet());
    }
}
