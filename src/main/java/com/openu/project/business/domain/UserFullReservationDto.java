package com.openu.project.business.domain;

import java.util.ArrayList;

public class UserFullReservationDto {
    UpdateUserDto userDetails;
    ArrayList<FullReservationDto> userCart;

    public UpdateUserDto getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UpdateUserDto userDetails) {
        this.userDetails = userDetails;
    }

    public ArrayList<FullReservationDto> getUserCart() {
        return userCart;
    }

    public void setUserCart(ArrayList<FullReservationDto> userCart) {
        this.userCart = userCart;
    }
}