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
public class Student implements IModel{
    private long id;

    private String firstName;
    private String lastName;
    private String address;
    private LocalDate DOB;
    private char gender;

    private long rollNum;
    private String emailId;
    private String degree;
    private String department;
    private int admissionYear;
    private int gradYear;
    private List<Long> classroomList;
    private double CGPA;

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

        if(rollNum <= 0){
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.ROLL_NUM)
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

        if(CGPA <= 0.0 || CGPA > 10.0){
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.CGPA)
            );
        }

        return validationResponseBuilder.build();
    }

    @Override
    public Entity getAsEntity() {
        Entity studentEntity = new Entity(Keys.KIND);

        studentEntity.setProperty(Keys.FIRST_NAME, this.firstName);
        studentEntity.setProperty(Keys.LAST_NAME, this.lastName);
        studentEntity.setProperty(Keys.ADDRESS, this.address);
        studentEntity.setProperty(Keys.DEGREE, this.degree);
        studentEntity.setProperty(Keys.DEPARTMENT, this.department);
        studentEntity.setProperty(Keys.DOB, this.DOB);
        studentEntity.setProperty(Keys.EMAIL_ID, this.emailId);
        studentEntity.setProperty(Keys.GRAD_YEAR, this.gradYear);
        studentEntity.setProperty(Keys.ADMISSION_YEAR, this.admissionYear);
        studentEntity.setProperty(Keys.GENDER, this.gender);
        studentEntity.setProperty(Keys.CLASSROOMS, this.classroomList);
        studentEntity.setProperty(Keys.CGPA, this.CGPA);
        studentEntity.setProperty(Keys.ROLL_NUM, this.rollNum);
        studentEntity.setProperty(Keys.CREATED, this.created);
        studentEntity.setProperty(Keys.UPDATED, this.updated);

        return studentEntity;
    }


    @Override
    public Student createFromEntity(Entity entity) {
        return Student.builder()
                .id(entity.getKey().getId())
                .firstName((String) entity.getProperty(Keys.FIRST_NAME))
                .lastName((String) entity.getProperty(Keys.LAST_NAME))
                .address((String) entity.getProperty(Keys.ADDRESS))
                .DOB((LocalDate) entity.getProperty(Keys.DOB))
                .gender((char) entity.getProperty(Keys.GENDER))
                .rollNum((long) entity.getProperty(Keys.ROLL_NUM))
                .emailId((String) entity.getProperty(Keys.EMAIL_ID))
                .degree((String) entity.getProperty(Keys.DEGREE))
                .department((String) entity.getProperty(Keys.DEPARTMENT))
                .admissionYear((int) entity.getProperty(Keys.ADMISSION_YEAR))
                .gradYear((int) entity.getProperty(Keys.GRAD_YEAR))
                .classroomList((List<Long>) entity.getProperty(Keys.CLASSROOMS))
                .CGPA((double) entity.getProperty(Keys.CGPA))
                .updated((long) entity.getProperty(Keys.UPDATED))
                .created((long) entity.getProperty(Keys.CREATED))
                .build();
    }

    @Override
    public Student createFromRequest(HttpServletRequest request) {

        List<Long> classIds = new ArrayList<>();

        for(String classId : request.getParameter(Keys.CLASSROOMS).split("\\S+")){
            classIds.add(Long.parseLong(classId));
        }

        return Student.builder()
                .firstName(ServletUtils.getParameter(request, Keys.FIRST_NAME, ""))
                .lastName(ServletUtils.getParameter(request, Keys.LAST_NAME, ""))
                .address(ServletUtils.getParameter(request, Keys.ADDRESS, ""))
                .DOB(LocalDate.parse(ServletUtils.getParameter(request, Keys.DOB, "00/00/0000")))
                .gender((ServletUtils.getParameter(request, Keys.GENDER, "")).charAt(0))
                .rollNum(Long.parseLong(ServletUtils.getParameter(request, Keys.ROLL_NUM, "0")))
                .emailId(ServletUtils.getParameter(request, Keys.EMAIL_ID, ""))
                .degree(ServletUtils.getParameter(request, Keys.DEGREE, ""))
                .department(ServletUtils.getParameter(request, Keys.DEPARTMENT, ""))
                .admissionYear(Integer.parseInt(ServletUtils.getParameter(request, Keys.ADMISSION_YEAR, "0")))
                .gradYear(Integer.parseInt(ServletUtils.getParameter(request, Keys.GRAD_YEAR, "0")))
                .classroomList(classIds)
                .CGPA(Double.parseDouble(ServletUtils.getParameter(request, Keys.CGPA, "0.0")))
                .build();
    }

    public static class Keys {
        public static String KIND = "student";
        public static String FIRST_NAME = "firstName";
        public static String LAST_NAME = "lastName";
        public static String ADDRESS = "address";
        public static String GENDER = "gender";
        public static String DOB = "dob";
        public static String ROLL_NUM = "rollNum";
        public static String EMAIL_ID = "emailId";
        public static String ADMISSION_YEAR = "admissionYear";
        public static String GRAD_YEAR = "gradYear";
        public static String DEPARTMENT = "department";
        public static String DEGREE = "degree";
        public static String CGPA = "cgpa";
        public static String CLASSROOMS = "classrooms";
        public static String CREATED = "created";
        public static String UPDATED = "updated";
    }
}
