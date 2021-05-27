package com.openu.project.controller;

import com.openu.project.business.service.CategoryService;
import com.openu.project.data.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/public/getAllCategory")
    public Iterable<Category> getCategory() {
        return this.categoryService.getCategory();
    }

    @PostMapping("/admin/category")
    public void createCategory(@RequestBody Category newCategory) {
        categoryService.createCategory(newCategory);
    }

    // TODO: This is only for debug purpose
    @PostMapping("/liat.arama1@gmail.com")
    public Iterable<Category> liatTest() {
        return this.categoryService.getCategory();
    }

}