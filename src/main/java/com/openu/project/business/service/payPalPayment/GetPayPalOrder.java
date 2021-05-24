package com.openu.project.business.service.payPalPayment;

import java.io.IOException;

import com.paypal.http.HttpResponse;
import com.paypal.http.serializer.Json;
import org.json.JSONObject;

import com.paypal.orders.Order;
import com.paypal.orders.OrdersGetRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetPayPalOrder{
    @Autowired
    PayPalClient payPalClient;

    public void getOrder(String orderId) throws IOException {
        OrdersGetRequest request = new OrdersGetRequest(orderId);
        //3. Call PayPal to get the transaction
        HttpResponse<Order> response = payPalClient.client().execute(request);
        //4. Save the transaction in your database. Implement logic to save transaction to your database for future reference.
        System.out.println("Full response body:");
        System.out.println(new JSONObject(new Json().serialize(response.result())).toString(4));
    }

}