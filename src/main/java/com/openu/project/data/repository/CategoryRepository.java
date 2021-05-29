package com.openu.project.data.repository;

import com.openu.project.data.entity.Category;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    //ArrayList<Category> findByCategoryId(int categoryId);
}




