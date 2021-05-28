package com.openu.project.controller;


import com.openu.project.business.service.PurchaseService;
import com.openu.project.data.entity.Purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;


    // TODO: should be user secured
    @PostMapping({"/createPurchase", "/user/{userId}/createPurchase"})
    public void createProduct(@RequestBody Purchase newPurchase) {
        this.purchaseService.addNewPurchase(newPurchase);
    }

    // The following services currently not in use
    // TODO: Remove the following code, we dont use it
//    @GetMapping("/getProductsByReservation")
//    public ArrayList<ProductsForCart> getProductsByReservation(@RequestParam int reservationId){
//        return this.purchaseService.getProductsByReservation(reservationId);
//    }

    @GetMapping("/admin/getAllPurchase")
    public Iterable<Purchase> getPurchase() {
        return this.purchaseService.getPurchase();
    }

}
