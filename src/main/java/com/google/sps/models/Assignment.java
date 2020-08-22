package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import com.google.sps.utils.validation.ServletUtils;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import com.google.sps.utils.validation.ValidationUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

@Builder
@Setter
@Getter
public class Assignment implements IModel {
    private long id;
    private long classroomId;
    private String name;
    private String description;
    private String studentId;
    private String educatorId;
    private long total_marks;
    private long scored_marks;
    private boolean submitted;
    private String solution;
    private long deadline;
    @Builder.Default
    private long created = System.currentTimeMillis();
    @Builder.Default
    private long updated = System.currentTimeMillis();

    @Override
    public ValidationResponse validate() {
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

        if (ValidationUtils.isEmptyOrWhiteSpace(studentId)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.STUDENT_ID)
            );
        }

        if (ValidationUtils.isZero(Keys.CLASSROOM_ID)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.CLASSROOM_ID)
            );
        }

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

    @Override
    public Entity getAsEntity() {
        Entity assignmentEntity = new Entity(Keys.KIND);

        assignmentEntity.setProperty(Keys.NAME, this.name);
        assignmentEntity.setProperty(Keys.DESCRIPTION, this.description);
        assignmentEntity.setProperty(Keys.CREATED, this.created);
        assignmentEntity.setProperty(Keys.UPDATED, this.updated);
        assignmentEntity.setProperty(Keys.STUDENT_ID, this.studentId);
        assignmentEntity.setProperty(Keys.CLASSROOM_ID, this.classroomId);
        assignmentEntity.setProperty(Keys.SCORED_MARKS, this.scored_marks);
        assignmentEntity.setProperty(Keys.SOLUTION, this.solution);
        assignmentEntity.setProperty(Keys.SUBMITTED, this.submitted);
        assignmentEntity.setProperty(Keys.SCORED_MARKS, this.scored_marks);
        assignmentEntity.setProperty(Keys.DEADLINE, this.deadline);
        assignmentEntity.setProperty(Keys.TOTAL_MARKS, this.total_marks);
        assignmentEntity.setProperty(Keys.EDUCATOR_ID, this.educatorId);

        return assignmentEntity;
    }

    @Override
    public Assignment createFromEntity(Entity entity) {
        return Assignment.builder()
                .id(entity.getKey().getId())
                .name((String) entity.getProperty(Keys.NAME))
                .description((String) entity.getProperty(Keys.DESCRIPTION))
                .studentId((String) entity.getProperty(Keys.STUDENT_ID))
                .updated((long) entity.getProperty(Keys.UPDATED))
                .created((long) entity.getProperty(Keys.CREATED))
                .classroomId((long) entity.getProperty(Keys.CLASSROOM_ID))
                .scored_marks((long) entity.getProperty(Keys.SCORED_MARKS))
                .total_marks((long) entity.getProperty(Keys.TOTAL_MARKS))
                .deadline((long) entity.getProperty(Keys.DEADLINE))
                .solution((String) entity.getProperty(Keys.SOLUTION))
                .submitted((boolean) entity.getProperty(Keys.SUBMITTED))
                .educatorId((String) entity.getProperty(Keys.EDUCATOR_ID))
                .build();
    }

    @Override
    public Assignment createFromRequest(HttpServletRequest request) {
        return Assignment.builder()
                .name(ServletUtils.getParameter(request, Keys.NAME, ""))
                .description(ServletUtils.getParameter(request, Keys.DESCRIPTION, ""))
                .studentId(ServletUtils.getParameter(request, Keys.STUDENT_ID, ""))
                .educatorId(ServletUtils.getParameter(request, Keys.EDUCATOR_ID, "0"))
                .classroomId(
                        Integer.parseInt(ServletUtils.getParameter(request, Keys.CLASSROOM_ID, "0"))
                )
                .scored_marks(
                        Integer.parseInt(ServletUtils.getParameter(request, Keys.SCORED_MARKS, "0"))
                )
                .total_marks(
                        Integer.parseInt(ServletUtils.getParameter(request, Keys.TOTAL_MARKS, "0"))
                )
                .deadline(
                        Integer.parseInt(ServletUtils.getParameter(request, Keys.DEADLINE, "0"))
                )
                .solution(ServletUtils.getParameter(request, Keys.SOLUTION, ""))
                .submitted(
                        Boolean.parseBoolean(ServletUtils.getParameter(request, Keys.SUBMITTED, "false"))
                )
                .build();
    }

    @Override
    public Assignment createFromJsonRequest(HttpServletRequest request) throws IOException {
        Gson gson = new Gson();
        BufferedReader bufferedReader = request.getReader();
        return gson.fromJson(bufferedReader, Assignment.class);
    }

    public static class Keys {
        public static String KIND = "assignment";
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