package com.google.sps.utils.Validation;

public class ValidationErrors {
    public static int STATUS_OK = 200;
    public static int STATUS_NOT_OK = 400;
    public static String MESSAGE_OK = "OK";
    public static String MESSAGE_NOT_OK = "Some error occurred";

    public static String IS_EMPTY_OR_WHITE_SPACE = "%s field cannot be empty";

    public static ErrorMessage isEmptyOrWhiteSpace(String field) {
        String errorMessage = String.format(IS_EMPTY_OR_WHITE_SPACE, field);
        return new ErrorMessage(field, errorMessage);
    }
}
