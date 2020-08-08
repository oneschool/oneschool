package com.google.sps.utils.Validation;

import lombok.Getter;

@Getter
public class ErrorMessage {
    private String field;
    private String message;

    public ErrorMessage(String field, String message) {
        this.field = field;
        this.message = message;
    }
}
