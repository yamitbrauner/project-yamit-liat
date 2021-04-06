package com.openu.project.business.service;

import com.openu.project.data.entity.Delivery;
import com.openu.project.data.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {
    @Autowired
    DeliveryRepository deliveryRepository;

    public Iterable<Delivery> findAll() {
        return deliveryRepository.findAll();
    }
}
