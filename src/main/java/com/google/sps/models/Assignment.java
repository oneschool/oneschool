package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
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
public class Assignment implements IModel {
    private String id;
    private String classroomId;
    private String name;
    private String description;
    private String studentId;
    private String educatorId;
    private long total_marks;
    private long scored_marks;
    private boolean submitted;
    private String solution;
    private long deadline;
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

            if (ValidationUtils.isEmptyOrWhiteSpace(classroomId)) {
                validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
                validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

                validationResponseBuilder.error(
                        ValidationErrors.isEmptyOrWhiteSpace(Keys.CLASSROOM_ID)
                );
            }

//            if (ValidationUtils.isZero(Keys.CLASSROOM_ID)) {
//                validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
//                validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);
//
//                validationResponseBuilder.error(
//                        ValidationErrors.isEmptyOrWhiteSpace(Keys.CLASSROOM_ID)
//                );
//            }

            //        if (ValidationUtils.isEmptyOrWhiteSpace(educatorId)) {
            //            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            //            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);
            //
            //            validationResponseBuilder.error(
            //                    ValidationErrors.isEmptyOrWhiteSpace(Keys.EDUCATOR_ID)
            //            );
            //        }

            // ToDo: to validate student and educator separately

            return validationResponseBuilder.build();
        }
        return ValidationResponse.builder()
                .status(ValidationErrors.STATUS_OK)
                .message(ValidationErrors.MESSAGE_OK)
                .build();
    }

    public static class Keys {
        public static String COLLECTION = "assignment";
        public static String NAME = "name";
        public static String DESCRIPTION = "description";
        public static String STUDENT_ID = "studentId";
        public static String CREATED = "created";
        public static String UPDATED = "updated";
        public static String SCORED_MARKS = "scored_marks";
        public static String SUBMITTED = "submitted";
        public static String SOLUTION = "solution";
        public static String DEADLINE =  "deadline";
        public static String CLASSROOM_ID = "classroomId";
        public static String TOTAL_MARKS = "total_marks";
        public static String EDUCATOR_ID = "educatorId";
    }
}