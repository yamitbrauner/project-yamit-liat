package com.openu.project.data.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @Column(name = "reservation_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int reservation_id;

    @Column(name = "user_id")
    private int user_id;

    @Column(name = "total")
    private float total;

    @Column(name = "payment_details")
    private String payment_details;

    @Column(name = "payment_method")
    private String payment_method;

    @Column(name = "payment_id")
    private int payment_id;

    @Column(name = "payment_approved")
    private int payment_approved;

    @Column(name = "reservation_date")
    private Date reservation_date;

    @Column(name = "status")
    private String status;

    public int getReservation_id() {
        return reservation_id;
    }

    public void setReservation_id(int reservation_id) {
        this.reservation_id = reservation_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public float getTotal() {
        return total;
    }

    public void setTotal(float total) {
        this.total = total;
    }

    public String getPayment_details() {
        return payment_details;
    }

    public void setPayment_details(String payment_details) {
        this.payment_details = payment_details;
    }

    public String getPayment_method() {
        return payment_method;
    }

    public void setPayment_method(String payment_method) {
        this.payment_method = payment_method;
    }

    public int getPayment_id() {
        return payment_id;
    }

    public void setPayment_id(int payment_id) {
        this.payment_id = payment_id;
    }

    public int getPayment_approved() {
        return payment_approved;
    }

    public void setPayment_approved(int payment_approved) {
        this.payment_approved = payment_approved;
    }

    public Date getReservation_date() {
        return reservation_date;
    }

    public void setReservation_date(Date reservation_date) {
        this.reservation_date = reservation_date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
