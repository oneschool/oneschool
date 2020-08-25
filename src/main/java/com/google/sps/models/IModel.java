package com.google.sps.models;

import com.google.gson.Gson;
import com.google.sps.utils.validation.ValidationResponse;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

public interface IModel {
    ValidationResponse validate(boolean createCall);
    default IModel createFromJsonRequest(HttpServletRequest request) throws IOException {
        Gson gson = new Gson();
        BufferedReader bufferedReader = request.getReader();
        return gson.fromJson(bufferedReader, this.getClass());
    }
}
