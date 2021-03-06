package com.openu.project.exception.exceptionsList;

        import com.openu.project.exception.ApiGatewayException;
        import com.openu.project.exception.ApiGatewayExceptionMassage;
        import com.openu.project.exception.ApiGatewayExceptionMessageCode;
        import lombok.Getter;
        import org.springframework.http.HttpStatus;
        import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
@Getter
public class BadLastName extends ApiGatewayException {
    public BadLastName() {
        super(ApiGatewayExceptionMessageCode.BadLastName, ApiGatewayExceptionMassage.BadLastName);
    }
}