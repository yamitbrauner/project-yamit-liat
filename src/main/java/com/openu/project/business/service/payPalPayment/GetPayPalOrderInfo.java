package com.openu.project.business.service.payPalPayment;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import com.paypal.http.HttpResponse;
import com.paypal.http.serializer.Json;
import com.paypal.http.Encoder;

import org.json.JSONObject;

import com.paypal.orders.Order;
import com.paypal.orders.OrdersGetRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetPayPalOrderInfo {
    @Autowired
    PayPalClient payPalClient;

    private static final Encoder encoder = new Encoder();

    public void getOrder(String orderId) throws IOException {
        OrdersGetRequest request = new OrdersGetRequest(orderId);
        //3. Call PayPal to get the transaction
        HttpResponse<Order> response = payPalClient.client().execute(request);
        //4. Save the transaction in your database. Implement logic to save transaction to your database for future reference.
        System.out.println("Full response body:");
        System.out.println(new JSONObject(new Json().serialize(response.result())).toString(4));
    }

    public ReservationStatusEnum getOrderStatus(String orderId, float reportedTotalPrice) throws IOException{
        OrdersGetRequest request = new OrdersGetRequest(orderId);

        HttpResponse<Order> response;
        try {
            response = payPalClient.client().execute(request);
        } catch (com.paypal.http.exceptions.HttpException e)
        {
            //return e.getMessage().equals("test");
            String error = e.getMessage();
            PayoutError payoutError =
                    encoder.deserializeResponse(new ByteArrayInputStream(error.getBytes(StandardCharsets.UTF_8)), PayoutError.class, e.headers());
            //if payoutError.name().equals("INVALID_RES");
            if (payoutError.name().equals("RESOURCE_NOT_FOUND")) {
                return ReservationStatusEnum.PAYMENT_ID_NOT_FOUND;
            }
            return ReservationStatusEnum.UNKNOWN;
        } catch (IOException e) {
            return ReservationStatusEnum.CONNECTION_ISSUE;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ReservationStatusEnum.UNKNOWN;
        }

        // CASE : We managed to get the transaction details
        JSONObject obj = new JSONObject(new Json().serialize(response.result()));
        System.out.println("Full response body:");
        System.out.println(new JSONObject(new Json().serialize(response.result())).toString(4));

        float totalPrice = Float.parseFloat(response.result().purchaseUnits().get(0).amountWithBreakdown().value());
        if (reportedTotalPrice != totalPrice)
        {
            return ReservationStatusEnum.CONFLICT_SUM;
        }

        String status = obj.getString("status");

        if (status.equalsIgnoreCase("COMPLETED")) {
            // CASE : If the transaction was completed.
            return ReservationStatusEnum.PAYMENT_APPROVED;
        }
        else
        {
            // CASE : If the transaction was not completed.
            return ReservationStatusEnum.ALREADY_CAPTURED;
        }
    }
}