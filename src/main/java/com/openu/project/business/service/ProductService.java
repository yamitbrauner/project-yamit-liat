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
public class ProductService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;


    public ProductService() {
    }

    public Iterable<Product> getProducts() {
        return productRepository.findAll();
    }
    
    public Iterable<Product> getProductInStock(){
        return this.productRepository.findByQuantityInStockGreaterThan(0);
//        Iterable<Product> allProducts = this.productRepository.findAll();
//        ArrayList<Product> productsInStock =  new ArrayList<Product>();
//
//        Iterator<Product> iter = allProducts.iterator();
//
//        while (iter.hasNext()) {
//            Product currProd = iter.next();
//            if (currProd.getQuantityInStock() > 0) {
//                productsInStock.add(currProd);
//            }
//        }
//        return productsInStock;
    }


    public Iterable<Product> getProductByCategory(int categoryId) {
        return this.productRepository.findByCategoryId(categoryId);
    }

    public Product getProductByProduct(Integer productId) {
        return this.productRepository.findByProdId(productId);
    }

    // TODO: add check for product post
    public void createProduct(Product product) {
        if (product.getProdName().length() == 0) {
            // empty product name
            return;
        }
        this.productRepository.save(product);
    }


    public void updateProduct(Product product, Integer productId) {
        Product productOld = productRepository.findByProdId(productId);
        fillNewProductToOld(productOld, product);
        productRepository.save(productOld);
    }

    private void fillNewProductToOld(Product productOld, Product product) {
        productOld.setDescription(product.getDescription());
        productOld.setProdName(product.getProdName());
        productOld.setPricePerUnit(product.getPricePerUnit());
        productOld.setPicUrl(product.getPicUrl());
        productOld.setQuantityInStock(product.getQuantityInStock());
        //productOld.setQuantityOrdered(product.getQuantityOrdered());
    }

    public void updateProductQuantity(Integer quantity, Integer productId) {
        Product productOld = productRepository.findByProdId(productId);
        int quantityInStock = productOld.getQuantityInStock();
        productOld.setQuantityInStock(quantityInStock - quantity);
        productRepository.save(productOld);
    }

    public Boolean isProductInStock(Integer productId) {
        Product prod = productRepository.findByProdId(productId);
        return prod.getQuantityInStock() > 0;
    }
}