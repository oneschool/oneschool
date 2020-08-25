package com.google.sps.models;

import com.google.gson.Gson;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@Setter
@Getter
@NoArgsConstructor
public class Account implements IModel {
    private String id;
    private String firebaseUid;
    private String name;
    private String email;
    private String imageUrl;
    private String institute;
    private String role; // later change to enum educator, student
    private boolean isVerified;
    private long created;
    private long updated;

    @Override
    public ValidationResponse validate(boolean createCall) {
        ValidationResponse.Builder validationResponseBuilder = ValidationResponse.builder();
        validationResponseBuilder.status(ValidationErrors.STATUS_OK);
        validationResponseBuilder.message(ValidationErrors.MESSAGE_OK);

        // create call validators
        if (createCall) {
            this.setRole(this.getRole().toLowerCase());
            this.setEmail(this.getEmail().toLowerCase());
            if (!this.getRole().equals("educator") && !this.getRole().equals("student") && !this.getRole().equals("admin")) {
                validationResponseBuilder.message("Role not allowed");
                validationResponseBuilder.status(HttpServletResponse.SC_BAD_REQUEST);
            }
        }

        // update call validators
        if (!createCall) {
            if (this.getRole() != null) {
                // update to role is not allowed
                validationResponseBuilder.status(HttpServletResponse.SC_FORBIDDEN);
                validationResponseBuilder.message("Update to role not allowed");
            }
        }

        // TODO: all kinds of validators


        return validationResponseBuilder.build();
    }


    // will help in queries
    public static class Keys {
        public static String COLLECTION = "account";
        public static String NAME = "name";
        public static String EMAIL = "email";
        public static String FIREBASE_UID = "firebaseUid";
        public static String IMAGE_URL = "imageUrl";
        public static String INSTITUTE = "institute";
        public static String ROLE = "role";
        public static String IS_VERIFIED = "isVerified";
        public static String CREATED = "created";
        public static String UPDATED = "updated";
    }
}
