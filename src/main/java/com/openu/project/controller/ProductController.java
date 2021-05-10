package com.openu.project.controller;

import com.openu.project.business.service.MatokLiEmailService;
import com.openu.project.business.service.ProductService;
import com.openu.project.data.entity.Product;
import com.openu.project.exception.UpdateTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

//    @Autowired
//    public ProductController(ProductInStockService productInStockService)
//    {
//        this.productInStockService = productInStockService;
//    }

    public ProductController() {
    }

    @GetMapping("/product")
    public Iterable<Product> getProducts() {
        return this.productService.getProducts();
    }

    @GetMapping("/productsInStock")
    public Iterable<Product> getProductInStock() {
        return this.productService.getProductInStock();
        //return productInStockService.getProductInStock();
    }

    @GetMapping("/products/category/{categoryId}")
    public Iterable<Product> getProductByCategory(@PathVariable("categoryId") Integer categoryId){
       return this.productService.getProductByCategory(categoryId);
   }

    @GetMapping("/products")
    public Product getProductByProductId(@RequestParam Integer productId){
        return  this.productService.getProductByProduct(productId);
    }

    @PostMapping("/products")
    public void createProduct(@RequestBody Product newProduct) {
        productService.createProduct(newProduct);
    }

    @PostMapping("/deleteProduct")
    public void deleteProduct(@RequestParam Integer productId) {
        productService.deleteProduct(productId);
    }

    @PutMapping("/products/{productId}")
    public void updateProduct(@RequestBody Product product,
                              @PathVariable("productId") Integer productId) throws UpdateTable {
//        try {
            productService.updateProduct(product, productId);
//        }
//        catch (UpdateTable e)
//        {
//            System.out.println("Product id dosent exist");
//            throw new UpdateTable();
//        }

    }

    @PutMapping("/products/quantity/{productId}/{quantity}")
    public void updateProductQuantity( @PathVariable("quantity") Integer quantity,
                              @PathVariable("productId") Integer productId){
        productService.updateProductQuantity(quantity, productId);
    }

    @GetMapping("/products/inStock")
    public Boolean isProductInStock(@RequestParam Integer productId){
        return this.productService.isProductInStock(productId);
    }
}