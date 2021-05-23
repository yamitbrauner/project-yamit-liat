package com.openu.project.controller;

import com.openu.project.business.domain.CreateNewReservation;
import com.openu.project.business.domain.FullReservation;
import com.openu.project.business.service.ReservationService;
import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ReservationController {
    @Autowired
    private ReservationService reservationService;



    @GetMapping("/reservation")
    public Iterable<Reservation> getReservation() {
        return this.reservationService.getReservation();
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


    @PostMapping("/createNewReservation")
    public Reservation createNewReservation(@RequestBody CreateNewReservation newReservation) {
        return reservationService.createReservation(newReservation);
    }


    @PutMapping("/confirmReservation")
    public void confirmReservation(@RequestParam  Integer reservationId,
                                   @RequestParam String paymentId){
        reservationService.confirmReservation(reservationId, paymentId);
    }


    @GetMapping("/reservation/fullUserReservation/{userId}")
    public ArrayList<FullReservation> getUserFullReservation(@PathVariable("userId") Integer userId) {
        return this.reservationService.getFullReservation(userId);
    }

}