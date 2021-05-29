package com.openu.project.controller;

import com.openu.project.business.service.PurchaseService;
import com.openu.project.data.entity.Purchase;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PurchaseController {
    @Autowired
    private PurchaseService purchaseService;

    @PostMapping("/user/{userId}/createPurchase")
    public void createPurchase(@RequestBody Purchase newPurchase) {
        this.purchaseService.addNewPurchase(newPurchase);
    }

    @GetMapping("/admin/getAllPurchase")
    public Iterable<Purchase> getAllPurchase() {
        return this.purchaseService.getPurchase();
    }
}