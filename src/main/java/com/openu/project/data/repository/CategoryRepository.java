package com.openu.project.data.repository;

import com.openu.project.data.entity.Category;
import com.openu.project.data.entity.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    Iterable<Category> findByCategoryId(int categoryId);
}




