package com.openu.project.business.domain;

import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Reservation;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.Date;

public class FullReservation {
    Reservation reservation;
    ArrayList<ProductsForCart> productIterable;

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public ArrayList<ProductsForCart> getProductIterable() {
        return productIterable;
    }

    public void setProductIterable(ArrayList<ProductsForCart> productIterable) {
        this.productIterable = productIterable;
    }
}
