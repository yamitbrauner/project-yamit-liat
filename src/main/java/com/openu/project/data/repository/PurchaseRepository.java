package com.openu.project.data.repository;

import com.openu.project.data.entity.Purchase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseRepository extends CrudRepository<Purchase, Integer>
{
    Iterable<Purchase> findByReservationId(int userId);
}
