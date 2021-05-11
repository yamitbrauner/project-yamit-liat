package com.openu.project.business.domain;

public class CreateNewUserResponse {
    private boolean mailOk;
    private boolean passwordOk;
    private boolean firstNameOk;
    private boolean lastNameOk;
//    private boolean phoneOk;
//    private boolean addressOk;


    public boolean isMailOk() {
        return mailOk;
    }

    public void setMailOk(boolean mailOk) {
        this.mailOk = mailOk;
    }

    public boolean isPasswordOk() {
        return passwordOk;
    }

    public void setPasswordOk(boolean passwordOk) {
        this.passwordOk = passwordOk;
    }

    public boolean isFirstNameOk() {
        return firstNameOk;
    }

    public void setFirstNameOk(boolean firstNameOk) {
        this.firstNameOk = firstNameOk;
    }

    public boolean isLastNameOk() {
        return lastNameOk;
    }

    public void setLastNameOk(boolean lastNameOk) {
        this.lastNameOk = lastNameOk;
    }

//    public boolean isPhoneOk() {
//        return phoneOk;
//    }
//
//    public void setPhoneOk(boolean phoneOk) {
//        this.phoneOk = phoneOk;
//    }
//
//    public boolean isAddressOk() {
//        return addressOk;
//    }
//
//    public void setAddressOk(boolean addressOk) {
//        this.addressOk = addressOk;
//    }
}
