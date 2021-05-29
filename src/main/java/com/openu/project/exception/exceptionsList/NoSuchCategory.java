package com.openu.project.exception.exceptionsList;

import com.openu.project.exception.ApiGatewayException;
import com.openu.project.exception.ApiGatewayExceptionMassage;
import com.openu.project.exception.ApiGatewayExceptionMessageCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
@Getter
public class NoSuchCategory extends ApiGatewayException {
    public NoSuchCategory() {
        super(ApiGatewayExceptionMessageCode.noSuchCategory, ApiGatewayExceptionMassage.noSuchCategory);
    }
}