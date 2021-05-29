package com.openu.project.data.repository;

import com.openu.project.data.entity.Reservation;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation,Integer> {
    Iterable<Reservation> findByUserId(int userId);
    Reservation findByReservationId(Integer reservationId);
    ArrayList<Reservation> findByPaymentId(String paymentId);
    ArrayList<Reservation> findByStatus(String status);
}
