package com.openu.project.Controller;

import com.openu.project.data.entity.Product;
import com.openu.project.data.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openu.project.business.service.ProductInStockService;

import java.util.ArrayList;

@RestController
public class ProductController {
    private ProductRepository productRepository;
    private ProductInStockService productInStockService;

    @Autowired
    public ProductController(ProductInStockService productInStockService)
    {
        this.productInStockService = productInStockService;
    }

        @GetMapping("/product")
    public Iterable<Product> getProduct() {
        return this.productRepository.findAll();
    }

    @GetMapping("/products_in_stock")
    public Iterable<Product> apiGetProduct(){
        return this.productInStockService.getProductInStock();
        //return productInStockService.getProductInStock();
    }
}