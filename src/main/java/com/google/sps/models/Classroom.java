package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
import com.google.firebase.database.utilities.Validation;
import com.google.gson.Gson;
import com.google.sps.utils.validation.ServletUtils;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import com.google.sps.utils.validation.ValidationUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

@Setter
@Getter
@NoArgsConstructor
public class Classroom implements IModel {
    private String id;
    private String name;
    private String description;
    private String educatorId;
    private long created;
    private long updated;

    @Override
    public ValidationResponse validate(boolean createCall) {
        if (createCall) {
            ValidationResponse.Builder validationResponseBuilder = ValidationResponse.builder();
            validationResponseBuilder.status(ValidationErrors.STATUS_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_OK);

            if (ValidationUtils.isEmptyOrWhiteSpace(name)) {
                validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
                validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

                validationResponseBuilder.error(
                        ValidationErrors.isEmptyOrWhiteSpace(Keys.NAME)
                );
            }

            if (ValidationUtils.isEmptyOrWhiteSpace(description)) {
                validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
                validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

                validationResponseBuilder.error(
                        ValidationErrors.isEmptyOrWhiteSpace(Keys.DESCRIPTION)
                );
            }

            if (ValidationUtils.isEmptyOrWhiteSpace(educatorId)) {
                validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
                validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

                validationResponseBuilder.error(
                        ValidationErrors.isEmptyOrWhiteSpace(Keys.EDUCATOR_ID)
                );
            }

            return validationResponseBuilder.build();
        }

        return ValidationResponse.builder()
                .status(ValidationErrors.STATUS_OK)
                .message(ValidationErrors.MESSAGE_OK)
                .build();
    }

    @Override
    public String toString() {
        return "Classroom{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", educatorId='" + educatorId + '\'' +
                ", created=" + created +
                ", updated=" + updated +
                '}';
    }

    public static class Keys {
        public static String COLLECTION = "classroom";
        public static String NAME = "name";
        public static String DESCRIPTION = "description";
        public static String EDUCATOR_ID = "educatorId";
        public static String CREATED = "created";
        public static String UPDATED = "updated";

    }
}
