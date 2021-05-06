package com.openu.project.business.service;

import com.openu.project.business.domain.CreateNewReservation;
import com.openu.project.business.domain.ProductsForCart;
import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import com.openu.project.data.repository.UserRepository;
import com.openu.project.exception.ReservationConfirmError;
import com.openu.project.exception.UpdateTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.openu.project.data.entity.Users;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PurchaseService purchaseService;

    public Iterable<Reservation> findAll() {
        return reservationRepository.findAll();
    }


    public Iterable<Reservation> getReservationByUserId(int userId) {
        return this.reservationRepository.findByUserId(userId);
    }

    public Iterable<Reservation> getReservationByMail(String mail) {
        // TODO: Make mail unique?
        Users user = this.userRepository.findByMail(mail).iterator().next();
        return this.reservationRepository.findByUserId(user.getUserId());
    }

    public void updateReservationId(Reservation reservation, Integer reservationId) {
        Reservation reservationOld = reservationRepository.findByReservationId(reservationId);
        fillNewReservationToOld(reservationOld, reservation);
        reservationRepository.save(reservationOld);
    }

    private void fillNewReservationToOld(Reservation reservationOld, Reservation reservation) {
//        SimpleDateFormat format = new SimpleDateFormat("DD/MM/YYYY");
//        Date newReservationDate = format.parse(reservation.getReservationDate());
//        Date newDeliveryDate = format.parse("20110210");
//        java.sql.Date sql = new java.sql.Date(parsed.getTime());

        reservationOld.setTotal(reservation.getTotal());
        reservationOld.setPaymentId(reservation.getPaymentId());
        reservationOld.setReservationDate(reservation.getReservationDate());
        reservationOld.setDeliveryDate(reservation.getDeliveryDate());
        reservationOld.setStatus(reservation.getStatus());
    }

    public Reservation createReservation(CreateNewReservation newReservation) {

        // TODO: Add checkers
        // 1. dates, user id, total prince?!
        Reservation dbReservation = new Reservation();
        // TODO: set payment id in confirm
        //dbReservation.setPaymentId(newReservation.getPaymentId());
        dbReservation.setTotal(newReservation.getTotalPrice());
        dbReservation.setReservationDate(newReservation.getReservationDate());
        dbReservation.setDeliveryDate(newReservation.getDeliveryDate());
        dbReservation.setUserId(newReservation.getUserId());
        this.reservationRepository.save(dbReservation);
        return dbReservation;
    }


    public Reservation confirmReservation(int reservationId, String paymentId) throws ReservationConfirmError{

        // TODO: Add checkers
        // 1. dates, user id, total prince?!
        Reservation reservation = this.reservationRepository.findByReservationId(reservationId);
        reservation.setPaymentId(paymentId);

        // TODO: Send mail
        float totalReservationSum =  this.purchaseService.getProuductsSumByReservationId(reservationId);
        if (totalReservationSum != reservation.getTotal()) throw new ReservationConfirmError();

        // TODO: Check real payment status with paypal service
        reservation.setStatus("Approved");
        this.reservationRepository.save(reservation);
        return reservation;
    }

}