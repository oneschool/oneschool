package com.google.sps.utils.validation;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Singular;

import java.util.List;

@Setter
@Getter
@Builder(builderClassName = "Builder")
public class ValidationResponse {
    int status;
    String message;
    @Singular
    List<ErrorMessage> errors;
}
