package com.openu.project.business.service.payPalPayment;

import com.paypal.http.annotations.Model;
import com.paypal.http.annotations.SerializedName;

/**
 * The error details. Required for client-side `4XX` errors.
 */
@Model
public class ErrorDetails {

    // Required default constructor
    public ErrorDetails() {
    }

    /**
     * REQUIRED
     * The name of the field that caused the error.
     */
    @SerializedName("field")
    private String field;

    public String field() {
        return field;
    }

    public ErrorDetails field(String field) {
        this.field = field;
        return this;
    }

    /**
     * REQUIRED
     * The reason for the error.
     */
    @SerializedName("issue")
    private String issue;

    public String issue() {
        return issue;
    }

    public ErrorDetails issue(String issue) {
        this.issue = issue;
        return this;
    }

    /**
     * REQUIRED
     * The location in request where error occurred.
     */
    @SerializedName("location")
    private String location;

    public String location() {
        return location;
    }

    public ErrorDetails location(String location) {
        this.location = location;
        return this;
    }
}