package com.google.sps.models;

import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import com.google.sps.utils.validation.ValidationUtils;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ClassroomStudent implements IModel {
    private String id;
    private String classroomId;
    private String studentId;

    @Override
    public ValidationResponse validate(boolean createCall) {
        if (createCall) {
            ValidationResponse.Builder validationResponseBuilder = ValidationResponse.builder();
            validationResponseBuilder.status(ValidationErrors.STATUS_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_OK);

            if (ValidationUtils.isEmptyOrWhiteSpace(studentId)) {
                validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
                validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

                validationResponseBuilder.error(
                        ValidationErrors.isEmptyOrWhiteSpace(Keys.STUDENT_ID)
                );
            }

            if (ValidationUtils.isEmptyOrWhiteSpace(classroomId)) {
                validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
                validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

                validationResponseBuilder.error(
                        ValidationErrors.isEmptyOrWhiteSpace(Keys.CLASSROOM_ID)
                );
            }

            return validationResponseBuilder.build();
        }

        return ValidationResponse.builder()
                .status(ValidationErrors.STATUS_OK)
                .message(ValidationErrors.MESSAGE_OK)
                .build();
    }

    public static class Keys {
        public static String COLLECTION = "classroomStudent";
        public static String STUDENT_ID = "studentId";
        public static String CLASSROOM_ID = "classroomId";
        public static String ID = "id";
    }
}
