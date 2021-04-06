package com.openu.project.data.repository;

import com.openu.project.data.entity.Delivery;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryRepository extends CrudRepository<Delivery,Integer> {

}
