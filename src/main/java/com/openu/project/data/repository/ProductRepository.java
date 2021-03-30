package com.openu.project.data.repository;

import com.openu.project.data.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer> {
    Iterable<Product> findByCategoryId(int categoryId);
//    Iterable<Product> findByQuantityInStock();
    Iterable<Product> findByQuantityInStockGreaterThan(int val);

    Product findByProdId(int prodId);
}

