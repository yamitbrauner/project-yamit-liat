package com.openu.project.data.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "delivery")
public class Delivery {
    @Id
    @Column(name = "delivery_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int delivery_id;

    @Column(name = "type_of_delivery")
    private String type_of_delivery;

    @Column(name = "delivery_date")
    private Date delivery_date;

    public int getDelivery_id() {
        return delivery_id;
    }

    public void setDelivery_id(int delivery_id) {
        this.delivery_id = delivery_id;
    }

    public String getType_of_delivery() {
        return type_of_delivery;
    }

    public void setType_of_delivery(String type_of_delivery) {
        this.type_of_delivery = type_of_delivery;
    }

    public Date getDelivery_date() {
        return delivery_date;
    }

    public void setDelivery_date(Date delivery_date) {
        this.delivery_date = delivery_date;
    }
}
