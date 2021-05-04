package com.openu.project.data.repository;

import com.openu.project.data.entity.Category;
import com.openu.project.data.entity.Reservation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservationRepository extends CrudRepository<Reservation,Integer> {
    Iterable<Reservation> findByUserId(int userId);

    Reservation findByReservationId(Integer reservationId);
}
