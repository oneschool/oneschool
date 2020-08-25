package com.google.sps.models;

import com.google.sps.utils.validation.ValidationResponse;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface IModel {
    ValidationResponse validate(boolean createCall);
    IModel createFromJsonRequest(HttpServletRequest request) throws IOException;
}
