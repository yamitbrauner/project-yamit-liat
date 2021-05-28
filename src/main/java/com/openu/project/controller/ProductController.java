package com.openu.project.controller;

import com.openu.project.business.service.ProductService;
import com.openu.project.data.entity.Product;
import com.openu.project.exception.UpdateTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping({"/public/getAllProducts"})
    public Iterable<Product> getProducts() {
        return this.productService.getProducts();
    }

    @GetMapping("/public/getProductsByCategory/{categoryId}")
    public Iterable<Product> getProductByCategory(@PathVariable("categoryId") Integer categoryId){
       return this.productService.getProductByCategory(categoryId);
   }

    @PostMapping("/admin/createNewProduct")
    public void createProduct(@RequestBody Product newProduct) {
        productService.createProduct(newProduct);
    }

    @DeleteMapping("/admin/deleteProductById")
    public void deleteProduct(@RequestParam Integer productId) {
        productService.deleteProduct(productId);
    }

    @PutMapping("/admin/updateProductById/{productId}")
    public void updateProduct(@RequestBody Product product,
                              @PathVariable("productId") Integer productId) throws UpdateTable {
    }

    // The following services currently not in use
    @GetMapping("/public/getAllProductInStock")
    public Iterable<Product> getProductInStock() {
        return this.productService.getProductInStock();
    }

    @GetMapping("/public/getProductByProdId")
    public Product getProductByProductId(@RequestParam Integer productId){
        return  this.productService.getProductByProduct(productId);
    }

    @PutMapping("/admin/updateProductQuantity/{productId}/{quantity}")
    public void updateProductQuantity( @PathVariable("quantity") Integer quantity,
                              @PathVariable("productId") Integer productId){
        productService.updateProductQuantity(quantity, productId);
    }

    @GetMapping("/public/isProductInStockById")
    public Boolean isProductInStock(@RequestParam Integer productId){
        return this.productService.isProductInStock(productId);
    }
}