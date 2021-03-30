package com.openu.project.business.service;

import com.openu.project.business.domain.ProductInStock;
import com.openu.project.data.entity.Product;
import com.openu.project.data.repository.CategoryRepository;
import com.openu.project.data.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ProductInStockService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ProductInStockService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    public Iterable<Product> getProductInStock(){
        return this.productRepository.findByQuantityInStockGreaterThan(0);
//        Iterable<Product> allProducts = this.productRepository.findAll();
//        ArrayList<Product> productsInStock =  new ArrayList<Product>();
//
//        Iterator<Product> iter = allProducts.iterator();
//
//        while (iter.hasNext())
//        {
//            Product currProd = iter.next();
//            if (currProd.getQuantityInStock() > 0)
//            {
//                productsInStock.add(currProd);
//            }
//        }
//        return productsInStock;
    }
}
