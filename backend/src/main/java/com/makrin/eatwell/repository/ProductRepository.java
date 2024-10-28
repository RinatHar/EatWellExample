package com.makrin.eatwell.repository;

import com.makrin.eatwell.domain.Product;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select product from Product product where product.user.login = ?#{authentication.name}")
    List<Product> findByUserIsCurrentUser();
}
