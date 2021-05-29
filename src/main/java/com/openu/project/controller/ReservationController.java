package com.openu.project.controller;

import com.openu.project.business.domain.CreateNewReservation;
import com.openu.project.business.domain.FullReservation;
import com.openu.project.business.domain.UserFullReservation;
import com.openu.project.business.service.ReservationService;
import com.openu.project.data.entity.Reservation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class ReservationController {
    @Autowired
    private ReservationService reservationService;

    @GetMapping("/admin/getAllReservations")
    public Iterable<Reservation> getReservation() {
        return this.reservationService.getReservation();
    }


    @PostMapping("/user/{userId}/createNewReservation")
    public Reservation createNewReservation(@RequestBody CreateNewReservation newReservation) {
        return reservationService.createReservation(newReservation);
    }

    @PutMapping("/user/{userId}/confirmReservation")
    public void confirmReservation(@RequestParam  Integer reservationId,
                                   @RequestParam String paymentId){
        reservationService.confirmReservation(reservationId, paymentId);
    }


    @GetMapping("/user/{userId}/getFullUserReservation")
    public ArrayList<FullReservation> getUserFullReservation(@PathVariable("userId") Integer userId) {
        return this.reservationService.getFullReservation(userId);
    }


    @GetMapping("/admin/allUsersFullReservation")
    public ArrayList<UserFullReservation> getAllUsersFullReservation()
    {
        return this.reservationService.getAllUsersFullReservation();
    }

    // The following services currently not in use
    // TODO: User specific api
    @GetMapping("/reservation/getById/{userId}")
    public Iterable<Reservation> getReservationByUserId(@PathVariable("userId") Integer userId){
        return this.reservationService.getReservationByUserId(userId);
    }

    // TODO: User specific api
    @GetMapping("/reservation/getByMail/{mail}")
    public Iterable<Reservation> getReservationByMail(@PathVariable("mail") String mail){
        return this.reservationService.getReservationByMail(mail);
    }

    // TODO: User specific api
    @PutMapping("/reservation/{reservationId}")
    public void updateReservation(@RequestBody Reservation reservation,
                                  @PathVariable("reservationId") Integer reservationId){
        reservationService.updateReservationId(reservation, reservationId);
    }
}