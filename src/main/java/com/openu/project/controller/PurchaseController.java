package com.openu.project.controller;


import com.openu.project.business.domain.ProductsForCart;
import com.openu.project.business.service.PurchaseService;
import com.openu.project.data.entity.Category;
import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;

    @GetMapping("/purchase")
    public Iterable<Purchase> getPurchase() {
        return this.purchaseService.getPurchase();
    }


    @PostMapping("/createPurchase")
    public void createProduct(@RequestBody Purchase newPurchase) {
        this.purchaseService.addNewPurchase(newPurchase);
    }

    @GetMapping("/getProductsByReservation")
    public ArrayList<ProductsForCart> getProductsByReservation(@RequestParam int reservationId){
        return this.purchaseService.getProductsByReservation(reservationId);
        }
}
