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

    public Iterable<Product> getProductByCategory(int categoryId) {
        return this.productRepository.findByCategoryId(categoryId);
    }

    public Product getProductByProduct(Integer productId) {
        return this.productRepository.findByProdId(productId);
    }

    public void createProduct(Product product){
         this.productRepository.save(product);
    }

    public void updateProduct(Product product, Integer productId) {
        Product productOld = productRepository.findByProdId(productId);
        fillNewProductToOld(productOld, product);
        productRepository.save(productOld);
    }

    private void fillNewProductToOld(Product productOld, Product product) {
        productOld.setDescription(product.getDescription());
        productOld.setProd_name(product.getProd_name());
        productOld.setPrice_per_unit(product.getPrice_per_unit());
        productOld.setPic_url(product.getPic_url());
        productOld.setQuantityInStock(product.getQuantityInStock());
        productOld.setQuantity_ordered(product.getQuantity_ordered());
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
