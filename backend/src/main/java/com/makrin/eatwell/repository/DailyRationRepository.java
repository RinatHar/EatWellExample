package com.makrin.eatwell.repository;

import com.makrin.eatwell.domain.DailyRation;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the DailyRation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DailyRationRepository extends JpaRepository<DailyRation, Long> {
    @Query("select dailyRation from DailyRation dailyRation where dailyRation.user.login = ?#{authentication.name}")
    List<DailyRation> findByUserIsCurrentUser();
}
