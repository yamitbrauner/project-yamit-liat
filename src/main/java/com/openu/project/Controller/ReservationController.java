package com.openu.project.Controller;

import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReservationController {
    @Autowired
      private ReservationRepository reservationRepository;

    @GetMapping("/reservation")
    public Iterable<Reservation> getReservation() {
         return this.reservationRepository.findAll();
    }
}
