package com.makrin.eatwell.repository;

import com.makrin.eatwell.domain.UserProperties;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the UserProperties entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UserPropertiesRepository extends JpaRepository<UserProperties, Long> {}
