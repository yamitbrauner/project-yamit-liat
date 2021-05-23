package com.openu.project.business.service;

import com.openu.project.business.domain.CreateNewReservation;
import com.openu.project.business.domain.ProductsForCart;
import com.openu.project.business.domain.FullReservation;
import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import com.openu.project.data.repository.UserRepository;
import com.openu.project.exception.ReservationConfirmError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.openu.project.data.entity.Users;

import java.util.ArrayList;
import java.util.Iterator;

@Service
public class ReservationService {
    @Autowired
    ReservationRepository reservationRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PurchaseService purchaseService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UsersService usersService;


    public Iterable<Reservation> getReservation() {         return reservationRepository.findAll();
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
        String userMail = this.usersService.getMailByUserId(reservation.getUserId());
        String firstName = this.usersService.getFirstNameByUserId(reservation.getUserId());

        ArrayList<ProductsForCart> purchases = this.purchaseService.getProductsByReservation(reservationId);

        try{
            emailService.sendMessageUsingThymeleafTemplate(userMail, purchases, firstName,reservationId);
        } catch (Exception e)
        {
            // TODO: Fix mailing!
            System.out.println("what??");
        }

        return reservation;
    }
    
    public ArrayList<FullReservation> getFullReservation(Integer userId)
    {
        ArrayList<FullReservation> fullReservationArrayList = new ArrayList<>();
        Iterable<Reservation> userReservation = getReservationByUserId(userId);
        Iterator<Reservation> reservationIterator = userReservation.iterator();

        while (reservationIterator.hasNext())
        {
            Reservation reservation = reservationIterator.next();
            ArrayList<ProductsForCart>  productsForCartArrayList =
                    this.purchaseService.getProductsByReservation(reservation.getReservationId());

            FullReservation fullReservation = new FullReservation();
            fullReservation.setReservation(reservation);
            fullReservation.setProductIterable(productsForCartArrayList);
            fullReservationArrayList.add(fullReservation);
        }

        return fullReservationArrayList;
    }

}