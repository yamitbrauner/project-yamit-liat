package com.openu.project.Controller;

import com.openu.project.data.entity.Delivery;
import com.openu.project.data.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeliveryController {
    @Autowired
    private DeliveryRepository deliveryRepository;

   @GetMapping("/delivery")
   public Iterable<Delivery> getDelivery() {
       return this.deliveryRepository.findAll();
   }
}