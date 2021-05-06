package com.openu.project.data.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "reservation")
public class Reservation {
    @Id
    @Column(name = "reservation_id")
    @SequenceGenerator(name="seq_reservation",sequenceName="SEQ_RESERVATION", allocationSize=1)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="seq_reservation")
    private int reservationId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "total")
    private float total;

    @Column(name = "payment_id")
    private String paymentId;

    @Column(name = "reservation_date")
//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss.000")
    private Date reservationDate;

    @Column(name = "delivery_date")
//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss.000")
    private Date deliveryDate;

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

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss.000")
    public Date getReservationDate() {
        return reservationDate;
    }

//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss.000")
    public void setReservationDate(Date reservationDate) {
        this.reservationDate = reservationDate;
    }

//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss.000")
    public Date getDeliveryDate() {
        return deliveryDate;
    }

//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd@HH:mm:ss.000")
    public void setDeliveryDate(Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}