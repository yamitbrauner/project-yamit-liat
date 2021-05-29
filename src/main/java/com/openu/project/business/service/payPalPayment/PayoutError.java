package com.openu.project.business.service.payPalPayment;

import com.paypal.http.annotations.Model;
import com.paypal.http.annotations.SerializedName;

import java.util.List;

@Model
public class PayoutError {
    // Required default constructor
    public PayoutError() {
    }

    /**
     * The PayPal internal ID. Used for correlation purposes.
     */
    @SerializedName("debug_id")
    private String debugId;

    public String debugId() {
        return debugId;
    }

    public PayoutError debugId(String debugId) {
        this.debugId = debugId;
        return this;
    }

    /**
     * An array of additional details for the error.
     */
    @SerializedName(value = "details", listClass = ErrorDetails.class)
    private List<ErrorDetails> details;

    public List<ErrorDetails> details() {
        return details;
    }

    public PayoutError details(List<ErrorDetails> details) {
        this.details = details;
        return this;
    }

    /**
     * REQUIRED
     * The URI to detailed information related to this error for the developer.
     */
    @SerializedName("information_link")
    private String informationLink;

    public String informationLink() {
        return informationLink;
    }

    public PayoutError informationLink(String informationLink) {
        this.informationLink = informationLink;
        return this;
    }

    /**
     * REQUIRED
     * The message that describes the error.
     */
    @SerializedName("message")
    private String message;

    public String message() {
        return message;
    }

    public PayoutError message(String message) {
        this.message = message;
        return this;
    }

    /**
     * REQUIRED
     * The human-readable, unique name of the error.
     */
    @SerializedName("name")
    private String name;

    public String name() {
        return name;
    }

    public PayoutError name(String name) {
        this.name = name;
        return this;
    }
}
