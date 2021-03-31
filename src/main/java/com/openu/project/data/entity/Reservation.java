package com.openu.project.data.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @Column(name = "reservation_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reservationId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "total")
    private float total;

    @Column(name = "payment_details")
    private String paymentDetails;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "payment_id")
    private int paymentId;

    @Column(name = "payment_approved")
    private int paymentApproved;

    @Column(name = "reservation_date")
    private Date reservationDate;

    @Column(name = "status")
    private String status;

    public int getReservationId() {
        return reservationId;
    }

    public void setReservationId(int reservationId) {
        this.reservationId = reservationId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(String paymentDetails) {
        this.paymentDetails = paymentDetails;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public int getPayment_id() {
        return paymentId;
    }

    public void setPayment_id(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getPaymentApproved() {
        return paymentApproved;
    }

    public void setPaymentApproved(int paymentApproved) {
        this.paymentApproved = paymentApproved;
    }

    public Date getReservationDate() {
        return reservationDate;
    }

    public void setReservation_date(Date reservationDate) {
        this.reservationDate = reservationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
