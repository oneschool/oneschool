package com.google.sps.utils.Validation;

import javax.servlet.http.HttpServletRequest;

public class ServletUtils {
    public static String CONTENT_TYPE_JSON = "application/json";

    public static String getParameter(HttpServletRequest request, String name, String defaultValue) {
        String value = request.getParameter(name);
        if (value == null) {
            return defaultValue;
        }
        return value;
    }
}
