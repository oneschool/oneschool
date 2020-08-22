package com.google.sps.utils.validation;

public final class ValidationUtils {
    public static boolean isEmptyOrWhiteSpace(String text) {
        return text == null || text.trim().isEmpty();
    }
    public static boolean isNull(Object obj) {
        return obj == null;
    }
}
