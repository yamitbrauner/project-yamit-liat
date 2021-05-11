package com.openu.project.business.domain;

public class UpdateUserResponse {

    private boolean firstNameOk;
    private boolean lastNameOk;
    private boolean phoneOk;
    private  boolean addressOk;

    public boolean allOk()
    {
        if (firstNameOk && lastNameOk && phoneOk && addressOk) return true;
        return false;
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

    public boolean isPhoneOk() {
        return phoneOk;
    }

    public void setPhoneOk(boolean phoneOk) {
        this.phoneOk = phoneOk;
    }

    public boolean isAddressOk() {
        return addressOk;
    }

    public void setAddressOk(boolean addressOk) {
        this.addressOk = addressOk;
    }
}
