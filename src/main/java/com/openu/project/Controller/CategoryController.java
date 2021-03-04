package com.openu.project.Controller;

import com.openu.project.data.entity.Category;
import com.openu.project.data.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/category")
    public Iterable<Category> getCategory(){
        return this.categoryRepository.findAll();
    }
}