package com.openu.project.business.service.payPalPayment;

import com.paypal.core.PayPalEnvironment;
import com.paypal.core.PayPalHttpClient;

import org.springframework.stereotype.Service;

@Service
public class PayPalClient {

    private PayPalEnvironment environment = new PayPalEnvironment.Sandbox(
            System.getenv("PayPalClientId"),
            System.getenv("PayPalSecret"));

    PayPalHttpClient client = new PayPalHttpClient(environment);

    public PayPalHttpClient client() {
        return this.client;
    }
}