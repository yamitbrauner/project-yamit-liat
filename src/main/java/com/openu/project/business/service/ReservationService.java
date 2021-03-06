package com.openu.project.business.service;

import com.openu.project.business.domain.*;
import com.openu.project.business.service.payPalPayment.GetPayPalOrderInfo;
import com.openu.project.business.service.payPalPayment.ReservationStatusEnum;
import com.openu.project.data.entity.Reservation;
import com.openu.project.data.repository.ReservationRepository;
import com.openu.project.data.repository.UserRepository;
import com.openu.project.exception.ApiGatewayException;
import com.openu.project.exception.exceptionsList.PaymentAlreadyCaptured;

import com.openu.project.exception.exceptionsList.PaymentConflictSum;
import com.openu.project.exception.exceptionsList.PaymentIdDosentExist;
import com.openu.project.exception.exceptionsList.ReservationConfirmError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.openu.project.data.entity.Users;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PurchaseService purchaseService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private UsersService usersService;
    @Autowired
    private GetPayPalOrderInfo getPayPalOrderStatus;




    public Iterable<Reservation> getReservation() {
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
        reservationOld.setTotal(reservation.getTotal());
        reservationOld.setPaymentId(reservation.getPaymentId());
        reservationOld.setReservationDate(reservation.getReservationDate());
        reservationOld.setDeliveryDate(reservation.getDeliveryDate());
        reservationOld.setStatus(reservation.getStatus());
    }

    public Reservation createReservation(CreateNewReservationDto newReservation) {

        Reservation dbReservation = new Reservation();
        dbReservation.setTotal(newReservation.getTotalPrice());
        dbReservation.setReservationDate(newReservation.getReservationDate());
        dbReservation.setDeliveryDate(newReservation.getDeliveryDate());
        dbReservation.setUserId(newReservation.getUserId());
        this.reservationRepository.save(dbReservation);
        return dbReservation;
    }

    public Reservation confirmReservation(int reservationId, String paymentId) throws ApiGatewayException {

        Reservation reservation = this.reservationRepository.findByReservationId(reservationId);
        reservation.setPaymentId(paymentId);

        float totalReservationSum =  this.purchaseService.getProductsSumByReservationId(reservationId);
        if (totalReservationSum != reservation.getTotal()) throw new ReservationConfirmError();

        reservation.setStatus(ReservationStatusEnum.PENDING.getMessage());
        // Check if payment is a new payment.
        if (this.reservationRepository.findByPaymentId(paymentId).size() != 0)
        {
            // Payment already exist on DB
            reservation.setStatus(ReservationStatusEnum.ALREADY_CAPTURED.getMessage());
            this.reservationRepository.save(reservation);
            throw new PaymentAlreadyCaptured();
        }

        try
        {
            ReservationStatusEnum reservationStatusEnum = this.getPayPalOrderStatus.getOrderStatus(paymentId, totalReservationSum);
            reservation.setStatus(reservationStatusEnum.getMessage());

            this.reservationRepository.save(reservation);

            // Fail when:
            // 1. If we know for sure that there is a problem with the payment
            // Dont fail:
            // Connection issue from our side, leave pending.
            if (!reservationStatusEnum.isApprove()) {
                if (reservationStatusEnum.equals(ReservationStatusEnum.ALREADY_CAPTURED)) {
                    throw new PaymentAlreadyCaptured();
                }

                if (reservationStatusEnum.equals(ReservationStatusEnum.PAYMENT_ID_NOT_FOUND)) {
                    throw new PaymentIdDosentExist();
                }

                if (reservationStatusEnum.equals(ReservationStatusEnum.CONFLICT_SUM)) {
                    throw new PaymentConflictSum();
                }
            }
        } catch (IOException e)
        {
            System.out.println(e.getMessage());
            // Still in pending
            return reservation;
        }

        this.purchaseService.updatePurchasedProductsInStock(reservationId);

        return reservation;
    }

    public ArrayList<FullReservationDto> getFullReservationDetails(Iterator<Reservation> reservationIterator)
    {
        ArrayList<FullReservationDto> fullReservationArrayList = new ArrayList<>();
        while (reservationIterator.hasNext())
        {
            Reservation reservation = reservationIterator.next();
            ArrayList<ProductsForCartDto>  productsForCartArrayList =
                    this.purchaseService.getProductsByReservation(reservation.getReservationId());

            FullReservationDto fullReservation = new FullReservationDto();
            fullReservation.setReservation(reservation);
            fullReservation.setProductIterable(productsForCartArrayList);
            fullReservationArrayList.add(fullReservation);
        }
        return fullReservationArrayList;
    }

    public ArrayList<FullReservationDto> getFullReservation(Integer userId)
    {
        Iterable<Reservation> userReservation = getReservationByUserId(userId);
        Iterator<Reservation> reservationIterator = userReservation.iterator();
        return getFullReservationDetails(reservationIterator);

    }

    public ArrayList<UserFullReservationDto> getAllUsersFullReservation() {

        ArrayList<UserFullReservationDto> allUserFullReservation = new ArrayList<>();
        Iterable<Users> usersIterable = this.userRepository.findAll();
        Iterator<Users> usersIterator = usersIterable.iterator();

        while (usersIterator.hasNext())
        {
            UserFullReservationDto userFullReservation = new UserFullReservationDto();

            Users user = usersIterator.next();
            // Set user details
            UpdateUserDto userDetails = new UpdateUserDto();
            userDetails.setFirstName(user.getFirstName());
            userDetails.setLastName(user.getLastName());
            userDetails.setAddress(user.getAddress());
            userDetails.setPhone(user.getPhone());
            userFullReservation.setUserDetails(userDetails);

            // Set user cart
            Iterable<Reservation> reservations =
                    this.reservationRepository.findByUserId(user.getUserId());
            ArrayList<FullReservationDto> fullReservations =
                    getFullReservationDetails(reservations.iterator());
            userFullReservation.setUserCart(fullReservations);

            allUserFullReservation.add(userFullReservation);
        }
        return allUserFullReservation;
    }

    public void sendMailToApprovedOrder()
    {

        ArrayList<Reservation> reservations =
                this.reservationRepository.findByStatus(ReservationStatusEnum.PAYMENT_APPROVED.getMessage());

        Iterator<Reservation> reservationIterator = reservations.iterator();
        while (reservationIterator.hasNext())
        {
            Reservation reservation = reservationIterator.next();
            String userMail = this.usersService.getMailByUserId(reservation.getUserId());
            String firstName = this.usersService.getFirstNameByUserId(reservation.getUserId());

            ArrayList<ProductsForCartDto> purchases = this.purchaseService.getProductsByReservation(reservation.getReservationId());

            try{
                emailService.sendMessageUsingThymeleafTemplate(userMail, purchases, firstName,reservation.getReservationId());
                reservation.setStatus(ReservationStatusEnum.PROCESSING_ORDER.getMessage());
                this.reservationRepository.save(reservation);
            } catch (Exception e)
            {
                System.out.println(e.getMessage());
            }
        }

    }
}