package com.openu.project.business.service;

import com.openu.project.data.entity.Category;
import com.openu.project.data.entity.Product;
import com.openu.project.data.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository)
    {
        this.categoryRepository = categoryRepository;
    }
    public Iterable<Category> findAll() {
        return categoryRepository.findAll();
    }
}