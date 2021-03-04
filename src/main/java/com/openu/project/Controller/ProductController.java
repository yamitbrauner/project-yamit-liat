package com.openu.project.Controller;

import com.openu.project.data.entity.Product;
import com.openu.project.data.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/product")
    public Iterable<Product> getProduct() {
        return this.productRepository.findAll();
    }
}
