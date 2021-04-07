package com.openu.project.business.service;

import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;
    public Iterable<Reservation> findAll() {
        return reservationRepository.findAll();
    }
}