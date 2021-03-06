package com.openu.project.exception;

public class ApiGatewayExceptionMessageCode
{
    public static final int emailAlreadyExist = 100;

    public static final int userMailAlreadyExist = 120;
    public static final int  wrongMailFormat = 121;
    public static final int  wrongPasswordFormat = 122;
    public static final int  BadFirstName = 123;
    public static final int  BadLastName = 124;
    public static final int  BadPhoneNumber = 125;
    public static final int  BadAddress = 126;

    public static final int badProductName = 130;

    public static final int NoSuchUser = 140;
    public static final int NoSuchProduct = 141;

    public static final int noSuchCategory = 150;

    public static final int reservationConfirmError = 170;

    public static final int fileAlreadyExists = 180;


    public static final int paymentAlreadyCaptured = 200;
    public static final int paymentIdDosentExist = 201;
    public static final int paymentConflictSum = 202;

    public static final int productDosentExistOrInUse = 210;

}
