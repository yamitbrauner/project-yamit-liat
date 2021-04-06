package com.openu.project.Controller;

import com.openu.project.business.service.ReservationService;
import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReservationController {
    @Autowired
      private ReservationService reservationService;

    @GetMapping("/reservation")
    public Iterable<Reservation> getReservation() {
         return this.reservationService.findAll();
    }
}
