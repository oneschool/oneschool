package com.google.sps.utils.validation;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

import java.util.List;

@Getter
@Builder(builderClassName = "Builder")
public class ValidationResponse {
    int status;
    String message;
    @Singular
    List<ErrorMessage> errors;
}
