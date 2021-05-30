package com.openu.project.business.service;

import com.openu.project.data.entity.Category;
import com.openu.project.data.entity.Users;
import com.openu.project.exception.ApiGatewayException;
import com.openu.project.data.entity.Product;
import com.openu.project.data.repository.CategoryRepository;
import com.openu.project.data.repository.ProductRepository;

import com.openu.project.exception.exceptionsList.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Iterator;

@Service
public class ProductService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductRepository productRepository;

    public ProductService() {
    }

    public ArrayList<Product> getProducts() {

        ArrayList<Product> result = new ArrayList<Product>();
        Iterator<Product> productIterator = productRepository.findAll().iterator();
        while (productIterator.hasNext()) result.add(productIterator.next());

        Comparator<Product> productComparator = new Comparator<Product>() {
            @Override
            public int compare(Product o1, Product o2) {
                return (o1.getProdId() - o2.getProdId());
            }
        };

        result.sort(productComparator);

        return result;
    }

    public Iterable<Product> getProductInStock(){
        return this.productRepository.findByQuantityInStockGreaterThan(0);
    }


    public Iterable<Product> getProductByCategory(int categoryId) {
        return this.productRepository.findByCategoryId(categoryId);
    }

    public Product getProductByProduct(Integer productId) {
        return this.productRepository.findByProdId(productId);
    }

    public void createProduct(Product product) {
        if (product.getProdName().length() == 0) {
            throw new BadProductName();
        }

        this.categoryRepository.findById(product.getCategoryId())
                .orElseThrow(
                        () -> new NoSuchCategory());

        try {
            this.productRepository.save(product);
        }
        catch (Exception e)
        {
            System.out.println(e.getMessage());
            throw e;
        }

    }


    public void updateProduct(Product product, Integer productId) throws ApiGatewayException {
        Product productOld = productRepository.findByProdId(productId);
        if (productOld == null) throw new NoSuchProduct();
        fillNewProductToOld(productOld, product);
        productRepository.save(productOld);
    }

    private void fillNewProductToOld(Product productOld, Product product) {

        productOld.setProdName(product.getProdName());
        productOld.setQuantityInStock(product.getQuantityInStock());
        productOld.setPricePerUnit(product.getPricePerUnit());
        productOld.setDescription(product.getDescription());
        productOld.setPicUrl(product.getPicUrl());
        //productOld.setQuantityOrdered(product.getQuantityOrdered());
    }

    public void updateProductQuantity(Integer productId, Product product) {
        productRepository.save(product);
    }

    public void incProductQuantity(Integer productId, Integer quantity) {
        Product productOld = productRepository.findByProdId(productId);
        int quantityInStock = productOld.getQuantityInStock();
        int newQuantity = quantityInStock + quantity;
        productOld.setQuantityInStock(newQuantity);
        productRepository.save(productOld);
    }

    public Boolean isProductInStock(Integer productId) {
        Product prod = productRepository.findByProdId(productId);
        return prod.getQuantityInStock() > 0;
    }

    public void deleteProduct(Integer productId) {
        try{
            this.productRepository.deleteById(productId);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            throw new ProductDosentExistOrInUse();
        }
    }
}