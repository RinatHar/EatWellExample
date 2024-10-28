package com.makrin.eatwell.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class UserPropertiesTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static UserProperties getUserPropertiesSample1() {
        return new UserProperties().id(1L).name("name1");
    }

    public static UserProperties getUserPropertiesSample2() {
        return new UserProperties().id(2L).name("name2");
    }

    public static UserProperties getUserPropertiesRandomSampleGenerator() {
        return new UserProperties().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString());
    }
}
