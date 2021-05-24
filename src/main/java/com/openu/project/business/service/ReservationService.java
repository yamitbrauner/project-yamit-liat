package com.openu.project.business.service;

import com.openu.project.business.domain.*;
import com.openu.project.business.service.payPalPayment.GetPayPalOrderInfo;
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
    @Autowired
    private GetPayPalOrderInfo getPayPalOrderStatus;


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

        // TODO: Need to add to crone
        reservation.setStatus("Pending");
        try {
            if (this.reservationRepository.findByPaymentId(paymentId).size() != 0)
            {
                // Payment already exist on DB
                reservation.setStatus("Rejected");
                //TODO: Exception here
            }
            if (this.getPayPalOrderStatus.isCaptured(paymentId))
            {
                // Completed
                reservation.setStatus("Approved");
            }
        }catch (Exception e)
        {
            // TODO: Handle exception
            System.out.println(e);
        }

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

    public ArrayList<FullReservation> getFullReservationDetails(Iterator<Reservation> reservationIterator)
    {
        ArrayList<FullReservation> fullReservationArrayList = new ArrayList<>();
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

    public ArrayList<FullReservation> getFullReservation(Integer userId)
    {
        Iterable<Reservation> userReservation = getReservationByUserId(userId);
        Iterator<Reservation> reservationIterator = userReservation.iterator();
        return getFullReservationDetails(reservationIterator);

    }

    public ArrayList<UserFullReservation> getAllUsersFullReservation() {

        ArrayList<UserFullReservation> allUserFullReservation = new ArrayList<>();
        Iterable<Users> usersIterable = this.userRepository.findAll();
        Iterator<Users> usersIterator = usersIterable.iterator();

        while (usersIterator.hasNext())
        {
            UserFullReservation userFullReservation = new UserFullReservation();

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
            ArrayList<FullReservation> fullReservations =
                    getFullReservationDetails(reservations.iterator());
            userFullReservation.setUserCart(fullReservations);

            allUserFullReservation.add(userFullReservation);
        }

        return allUserFullReservation;
    }
}