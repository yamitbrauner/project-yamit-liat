package com.openu.project.Controller;

import com.openu.project.business.service.ReservationService;
import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/reservation")
    public Iterable<Reservation> getReservation() {
        return this.reservationService.findAll();
    }

    @GetMapping("/reservation/getById/{userId}")
    public Iterable<Reservation> getReservationByUserId(@PathVariable("userId") Integer userId){
        return this.reservationService.getReservationByUserId(userId);
    }

    @GetMapping("/reservation/getByMail/{mail}")
    public Iterable<Reservation> getReservationByMail(@PathVariable("mail") String mail){
        return this.reservationService.getReservationByMail(mail);
    }

    @PutMapping("/reservation/{reservationId}")
    public void updateReservation(@RequestBody Reservation reservation,
                              @PathVariable("reservationId") Integer reservationId){
        reservationService.updateReservationId(reservation, reservationId);
    }

}