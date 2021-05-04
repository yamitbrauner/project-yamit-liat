package com.openu.project.business.service;

import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import com.openu.project.data.repository.UserRepository;
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
}