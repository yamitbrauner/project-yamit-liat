package com.openu.project.business.domain;

import com.openu.project.data.entity.Reservation;

import java.util.ArrayList;

public class FullReservationDto {
    Reservation reservation;
    ArrayList<ProductsForCartDto> productIterable;

    public Reservation getReservation() {
        return reservation;
    }

    public void setReservation(Reservation reservation) {
        this.reservation = reservation;
    }

    public ArrayList<ProductsForCartDto> getProductIterable() {
        return productIterable;
    }

    public void setProductIterable(ArrayList<ProductsForCartDto> productIterable) {
        this.productIterable = productIterable;
    }
}
