package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.utils.Validation.ServletUtils;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;
import com.google.sps.utils.Validation.ValidationUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@Setter
@Getter
public class Educator implements IModel{
    private long id;

    private String firstName;
    private String lastName;
    private String address;
    private LocalDate DOB;
    private char gender;

    private long educatorId;
    private String emailId;
    private String department;
    private String designation;
    private String degree;
    private int joiningYear;
    private List<Long> classroomList;

    @Builder.Default
    private long created = System.currentTimeMillis();
    @Builder.Default
    private long updated = System.currentTimeMillis();

    @Override
    public ValidationResponse validate() {
        ValidationResponse.Builder validationResponseBuilder = ValidationResponse.builder();
        validationResponseBuilder.status(ValidationErrors.STATUS_OK);
        validationResponseBuilder.message(ValidationErrors.MESSAGE_OK);

        if (ValidationUtils.isEmptyOrWhiteSpace(firstName)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.FIRST_NAME)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(lastName)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.LAST_NAME)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(address)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.ADDRESS)
            );
        }

        if(gender != 'F' && gender != 'M'){
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.GENDER)
            );
        }

        if(educatorId <= 0){
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.EDUCATOR_ID)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(emailId) || emailId.indexOf('@') == -1 || emailId.indexOf('.') == -1) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.EMAIL_ID)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(degree)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.DEGREE)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(department)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.DEPARTMENT)
            );
        }

        if(classroomList == null || classroomList.size() == 0){
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.CLASSROOMS)
            );
        }

        return validationResponseBuilder.build();
    }

    @Override
    public Entity getAsEntity() {
        Entity educatorEntity = new Entity(Keys.KIND);

        educatorEntity.setProperty(Keys.FIRST_NAME, this.firstName);
        educatorEntity.setProperty(Keys.LAST_NAME, this.lastName);
        educatorEntity.setProperty(Keys.ADDRESS, this.address);
        educatorEntity.setProperty(Keys.DEGREE, this.degree);
        educatorEntity.setProperty(Keys.DEPARTMENT, this.department);
        educatorEntity.setProperty(Keys.DOB, this.DOB);
        educatorEntity.setProperty(Keys.EMAIL_ID, this.emailId);
        educatorEntity.setProperty(Keys.JOINING_YEAR, this.joiningYear);
        educatorEntity.setProperty(Keys.GENDER, this.gender);
        educatorEntity.setProperty(Keys.CLASSROOMS, this.classroomList);
        educatorEntity.setProperty(Keys.EDUCATOR_ID, this.educatorId);
        educatorEntity.setProperty(Keys.CREATED, this.created);
        educatorEntity.setProperty(Keys.UPDATED, this.updated);

        return educatorEntity;
    }


    @Override
    public Educator createFromEntity(Entity entity) {
        return Educator.builder()
                .id(entity.getKey().getId())
                .firstName((String) entity.getProperty(Keys.FIRST_NAME))
                .lastName((String) entity.getProperty(Keys.LAST_NAME))
                .address((String) entity.getProperty(Keys.ADDRESS))
                .DOB((LocalDate) entity.getProperty(Keys.DOB))
                .gender((char) entity.getProperty(Keys.GENDER))
                .educatorId((long) entity.getProperty(Keys.EDUCATOR_ID))
                .emailId((String) entity.getProperty(Keys.EMAIL_ID))
                .degree((String) entity.getProperty(Keys.DEGREE))
                .department((String) entity.getProperty(Keys.DEPARTMENT))
                .joiningYear((int) entity.getProperty(Keys.JOINING_YEAR))
                .classroomList((List<Long>) entity.getProperty(Keys.CLASSROOMS))
                .updated((long) entity.getProperty(Keys.UPDATED))
                .created((long) entity.getProperty(Keys.CREATED))
                .build();
    }

    @Override
    public Educator createFromRequest(HttpServletRequest request) {

        List<Long> classIds = new ArrayList<>();

        for(String classId : request.getParameter(Keys.CLASSROOMS).split("\\S+")){
            classIds.add(Long.parseLong(classId));
        }

        return Educator.builder()
                .firstName(ServletUtils.getParameter(request, Keys.FIRST_NAME, ""))
                .lastName(ServletUtils.getParameter(request, Keys.LAST_NAME, ""))
                .address(ServletUtils.getParameter(request, Keys.ADDRESS, ""))
                .DOB(LocalDate.parse(ServletUtils.getParameter(request, Keys.DOB, "00/00/0000")))
                .gender((ServletUtils.getParameter(request, Keys.GENDER, "")).charAt(0))
                .educatorId(Long.parseLong(ServletUtils.getParameter(request, Keys.EDUCATOR_ID, "0")))
                .emailId(ServletUtils.getParameter(request, Keys.EMAIL_ID, ""))
                .degree(ServletUtils.getParameter(request, Keys.DEGREE, ""))
                .department(ServletUtils.getParameter(request, Keys.DEPARTMENT, ""))
                .joiningYear(Integer.parseInt(ServletUtils.getParameter(request, Keys.JOINING_YEAR, "0")))
                .classroomList(classIds)
                .build();
    }

    public static class Keys {
        public static String KIND = "educator";
        public static String FIRST_NAME = "firstName";
        public static String LAST_NAME = "lastName";
        public static String ADDRESS = "address";
        public static String GENDER = "gender";
        public static String DOB = "dob";
        public static String EDUCATOR_ID = "educatorId";
        public static String EMAIL_ID = "emailId";
        public static String JOINING_YEAR = "joiningYear";
        public static String DEPARTMENT = "department";
        public static String DEGREE = "degree";
        public static String CLASSROOMS = "classrooms";
        public static String CREATED = "created";
        public static String UPDATED = "updated";
    }
}
