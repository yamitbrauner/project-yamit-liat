package com.openu.project.business.domain;

import java.util.ArrayList;

public class UserFullReservation {
    UpdateUserDto userDetails;
    ArrayList<FullReservation> userCart;

    public UpdateUserDto getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UpdateUserDto userDetails) {
        this.userDetails = userDetails;
    }

    public ArrayList<FullReservation> getUserCart() {
        return userCart;
    }

    public void setUserCart(ArrayList<FullReservation> userCart) {
        this.userCart = userCart;
    }
}