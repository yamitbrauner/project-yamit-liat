package com.openu.project.business.service.payPalPayment;

public enum ReservationStatusEnum {
    ALREADY_CAPTURED(false, "REJECTED_CAPTURED"),
    PAYMENT_ID_NOT_FOUND(false, "REJECTED_NOT_FOUND"),
    REJECTED(false, "REJECTED"),
    CONNECTION_ISSUE(false, "PENDING"),
    PENDING(false, "PENDING"),
    UNKNOWN(false, "PENDING"),
    PAYMENT_APPROVED(true, "PAYMENT_APPROVED"),
    PROCESSING_ORDER(true, "PROCESSING_ORDER");



    private final boolean approve;
    private final String message;
    ReservationStatusEnum(boolean approve, String message) {
        this.approve = approve;
        this.message = message;
    }

    public boolean isApprove() {
        return approve;
    }

    public String getMessage() {
        return message;
    }
}
