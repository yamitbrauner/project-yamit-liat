package com.openu.project.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Data
@ResponseStatus
@RequiredArgsConstructor
@JsonIgnoreProperties(value = {"stackTrace", "suppressed","cause", "message","localizeMessage"})

public class ApiGatewayException extends RuntimeException {
@JsonIgnore
    private HttpStatus httpStatus;
    private final int messageCode;
    private final String MessageText;
  //  private ApiGatewayExceptionSeverityEnum severity = ApiGatewayExceptionSeverityEnum.ERROR;
  // private ApiGatewayExceptionAddressEnum address = ApiGatewayExceptionAddressEnum.ALL;

}


