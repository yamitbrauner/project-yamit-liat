package com.openu.project.Controller;

import com.openu.project.business.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeliveryController {
    @Autowired
    private DeliveryService deliveryService;

   @GetMapping("/delivery")
   public Iterable<Delivery> getDelivery() {
       return this.deliveryService.findAll();
   }
}