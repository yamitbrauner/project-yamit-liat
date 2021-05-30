package com.openu.project;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.jayway.jsonpath.JsonPath;

import com.openu.project.business.service.payPalPayment.PayoutError;
import com.openu.project.exception.ApiGatewayException;
import net.bytebuddy.utility.RandomString;
import org.apache.commons.lang3.RandomStringUtils;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.io.ByteArrayInputStream;
import java.nio.charset.StandardCharsets;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ReservationTests {

    @Autowired
    private MockMvc mvc;

    public loginResponseDto getUserToken(String username, String password) throws Exception {
        final String SIGN_IN_URL = "/api/services/controller/user/login";

        loginDto login = new loginDto();
        login.setMail(username);
        login.setPassword(password);

        Gson gson = new Gson();
        String loginJson = gson.toJson(login);

        MvcResult result = mvc.perform(get(SIGN_IN_URL)
                .contentType(MediaType.APPLICATION_JSON).content(loginJson))
                .andExpect(status().isOk()).andReturn();

        String response = result.getResponse().getContentAsString();
        //System.out.println(result.getResponse().getContentAsString());

        loginResponseDto loginResponse = new loginResponseDto();
        String userId = JsonPath.parse(response).read("userId").toString();
        String token = JsonPath.parse(response).read("token").toString();
        loginResponse.setToken(token);
        loginResponse.setUserId(userId);
        return loginResponse;

    }

    public Integer createNewReservation(String token, Integer userId, Float totalPrice) throws Exception
    {
        final String NEW_RESERVATION_URL = "/user/" + userId +"/createNewReservation";

        CreateNewReservationDto newReservation = new CreateNewReservationDto();
        newReservation.setUserId(userId);
        newReservation.setTotalPrice(totalPrice);
        newReservation.setReservationDate("2022-12-16T22:00:00.000+00:00");
        newReservation.setDeliveryDate("2022-12-16T22:00:00.000+00:00");


        Gson gson = new Gson();
        String reservationJson = gson.toJson(newReservation);

        // Sending reservation details as part of the body
        MvcResult result = mvc.perform(post(NEW_RESERVATION_URL)
                .contentType(MediaType.APPLICATION_JSON).content(reservationJson)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andReturn();

        String response = result.getResponse().getContentAsString();
        //System.out.println(result.getResponse().getContentAsString());

        return Integer.parseInt(JsonPath.parse(response).read("reservationId").toString());
    }


    private void CreateNewPurchase(String token, String userId, Integer reservationId) throws Exception{

        final String NEW_PURCHASE_URL = "/user/" + userId + "/createPurchase";
        Integer cakePrice = 95;
        Integer cakeQuantity = 2;
        Integer cakeProdId = 1;
        Integer categoryId = 1;

        CreateNewPurchaseDto createNewPurchase = new CreateNewPurchaseDto();
        createNewPurchase.setPurchaseId(0);
        createNewPurchase.setCategoryId(categoryId);
        createNewPurchase.setReservationId(reservationId);
        createNewPurchase.setQuantity(cakeQuantity);
        createNewPurchase.setProdId(cakeProdId);


        Gson gson = new Gson();
        String purchaseJson = gson.toJson(createNewPurchase);

        MvcResult result = mvc.perform(post(NEW_PURCHASE_URL)
                .contentType(MediaType.APPLICATION_JSON).content(purchaseJson)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk()).andReturn();
    }


    void confirmReservationWithPaymentOnDb(String token, String userId, Integer reservationId, String paymentId) throws Exception
    {
        final String CONFIRM_RESERVATION_URL = "/user/" + userId + "/confirmReservation" +
                "?reservationId=" + reservationId +
                "&paymentId="+paymentId;
        MvcResult resultConfirmReservation = mvc.perform(put(CONFIRM_RESERVATION_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isPaymentRequired()).andReturn();

        System.out.println(resultConfirmReservation.getResolvedException());
    }

    @Test
    public void createFullReservationWithAlreadyCapturedPayment() throws Exception {
        final String USERNAME = "matokli.matok@gmail.com";
        final String PASSWORD = "1234";
        Integer cakePrice = 95;
        Integer cakeQuantity = 2;
        Integer cakeId = 1;
        String alreadyInTablePaymentId = "79U68038JT782880L";

        loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);

        float totalSum = (float)(cakeQuantity * cakePrice);

        Integer reservationId =
                createNewReservation(loginResponse.token,Integer.parseInt(loginResponse.userId),totalSum);

        // Product id #1 cost 95
        CreateNewPurchase(loginResponse.token,loginResponse.userId, reservationId);
        // use 1
        confirmReservationWithPaymentOnDb(loginResponse.token, loginResponse.userId, reservationId, alreadyInTablePaymentId);

    }

    void confirmReservationWithPaymentNotInPaypal(String token, String userId, Integer reservationId, String paymentId) throws Exception
    {
        final String CONFIRM_RESERVATION_URL = "/user/" + userId + "/confirmReservation" +
                "?reservationId=" + reservationId +
                "&paymentId="+paymentId;
        MvcResult resultConfirmReservation = mvc.perform(put(CONFIRM_RESERVATION_URL)
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isPaymentRequired()).andReturn();

        System.out.println(resultConfirmReservation.getResolvedException());
    }

    @Test
    public void createFullReservationWithDosentExistPaymentId() throws Exception {
        final String USERNAME = "matokli.matok@gmail.com";
        final String PASSWORD = "1234";
        Integer cakePrice = 95;
        Integer cakeQuantity = 2;
        Integer cakeId = 1;

        loginResponseDto loginResponse = getUserToken(USERNAME, PASSWORD);

        float totalSum = (float)(cakeQuantity * cakePrice);

        Integer reservationId =
                createNewReservation(loginResponse.token,Integer.parseInt(loginResponse.userId),totalSum);

        // Product id #1 cost 95
        CreateNewPurchase(loginResponse.token,loginResponse.userId, reservationId);

        int length = 17;
        String generatedString = RandomString.make(length);

        confirmReservationWithPaymentOnDb(loginResponse.token, loginResponse.userId, reservationId, generatedString);

    }




}