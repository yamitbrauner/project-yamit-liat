package com.openu.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Reservation price dont equal product price")
public class ReservationConfirmError extends RuntimeException {
}
