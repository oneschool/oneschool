package com.google.sps.dao;

import com.google.api.core.ApiFuture;
import com.google.appengine.api.datastore.*;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.sps.models.*;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import com.google.sps.utils.validation.ValidationUtils;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
public class AssignmentDao implements  IAssignmentDao {

    private Firestore db;

    public AssignmentDao() {
        db = FirestoreClient.getFirestore();
    }

    @Override
    @SneakyThrows
    public ValidationResponse createAssignment(Assignment assignment) {
        ValidationResponse validationResponse = assignment.validate(true);

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        List<ClassroomStudent> students = new ClassroomStudentDao().getStudentsForClassroom(assignment.getClassroomId());
        Classroom classroom = new ClassroomDao().getClassroomById(assignment.getClassroomId());
        assignment.setEducatorId(classroom.getEducatorId());

        String assignmentId = UUID.randomUUID().toString();
        assignment.setAssignmentId(assignmentId);

        for (ClassroomStudent classroomStudent: students) {
            String id = UUID.randomUUID().toString();
            assignment.setId(id);

            assignment.setCreated(System.currentTimeMillis());
            assignment.setUpdated(System.currentTimeMillis());

            String studentId = classroomStudent.getStudentId();
            assignment.setStudentId(studentId);

            ApiFuture<WriteResult> future = db.collection(Assignment.Keys.COLLECTION)
                    .document(assignment.getId())
                    .set(assignment);
            log.info("Assignment created: ", future.get().toString());
        }

        return validationResponse;
    }

    @Override
    @SneakyThrows
    public List<Assignment> getAllAssignmentsStudent(String studentId) {
        ApiFuture<QuerySnapshot> future = db.collection(Assignment.Keys.COLLECTION)
                .whereEqualTo(Assignment.Keys.STUDENT_ID, studentId).get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<Assignment> assignments = new ArrayList<>();

        for (DocumentSnapshot document: documents) {
            Assignment assignment = document.toObject(Assignment.class);
            assignment.setId(document.getId());
            assignments.add(assignment);
        }
        return assignments;
    }

    @Override
    @SneakyThrows
    public List<Assignment> getAllAssignmentsEducator(String educatorId) {
        ApiFuture<QuerySnapshot> future = db.collection(Assignment.Keys.COLLECTION)
                .whereEqualTo(Assignment.Keys.EDUCATOR_ID, educatorId).get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<Assignment> assignments = new ArrayList<>();

        for (DocumentSnapshot document: documents) {
            Assignment assignment = document.toObject(Assignment.class);
            assignment.setId(document.getId());
            assignments.add(assignment);
        }
        return assignments;
    }

    @Override
    @SneakyThrows
    public ValidationResponse updateAssignmentForStudent(Assignment newAssignment) {

        ValidationResponse.Builder validationResponseBuilder = null;

        Assignment oldAssignment = getAssignmentById(newAssignment.getId());
        newAssignment.setId(oldAssignment.getId());
        newAssignment.setUpdated(System.currentTimeMillis());

        if (ValidationUtils.isEmptyOrWhiteSpace(newAssignment.getSolution())) {
            validationResponseBuilder = ValidationResponse.builder();
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Assignment.Keys.SOLUTION)
            );
        }

        //do not set scored_marks attribute
        //solution attribute is set from the request
        newAssignment.setCreated(oldAssignment.getCreated());
        newAssignment.setAssignmentId(oldAssignment.getAssignmentId());
        newAssignment.setClassroomId(oldAssignment.getClassroomId());
        newAssignment.setEducatorId(oldAssignment.getEducatorId());
        newAssignment.setDeadline(oldAssignment.getDeadline());
        newAssignment.setTotal_marks(oldAssignment.getTotal_marks());
        newAssignment.setName(oldAssignment.getName());
        newAssignment.setDescription(oldAssignment.getDescription());

        //Set attribute submitted to true
        newAssignment.setSubmitted(true);

        ApiFuture<WriteResult> writeResult = db.collection(Assignment.Keys.COLLECTION)
                .document(newAssignment.getId()).set(newAssignment);

        log.info("Update assignment called: " + writeResult.get().toString());

        return ValidationResponse.builder()
                .status(ValidationErrors.STATUS_OK)
                .message(ValidationErrors.MESSAGE_OK)
                .build();

    }

    @Override
    @SneakyThrows
    public ValidationResponse updateAssignmentForEducator(Assignment newAssignment) {

        ValidationResponse.Builder validationResponseBuilder = null;

        Assignment oldAssignment = getAssignmentById(newAssignment.getId());
        newAssignment.setId(oldAssignment.getId());
        newAssignment.setUpdated(System.currentTimeMillis());

        if(newAssignment.getScored_marks() < 0 || newAssignment.getScored_marks() > oldAssignment.getTotal_marks()){
            validationResponseBuilder = ValidationResponse.builder();
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);
            return validationResponseBuilder.build();
        }

        //scored_marks attribute is set from the request
        newAssignment.setCreated(oldAssignment.getCreated());
        newAssignment.setAssignmentId(oldAssignment.getAssignmentId());
        newAssignment.setClassroomId(oldAssignment.getClassroomId());
        newAssignment.setEducatorId(oldAssignment.getEducatorId());
        newAssignment.setDeadline(oldAssignment.getDeadline());
        newAssignment.setTotal_marks(oldAssignment.getTotal_marks());
        newAssignment.setName(oldAssignment.getName());
        newAssignment.setDescription(oldAssignment.getDescription());
        //Solution is submitted
        newAssignment.setSolution(oldAssignment.getSolution());
        newAssignment.setSubmitted(oldAssignment.isSubmitted());

        //Set attribute checked to true
        newAssignment.setChecked(true);

        ApiFuture<WriteResult> writeResult = db.collection(Assignment.Keys.COLLECTION)
                .document(newAssignment.getId()).set(newAssignment);

        log.info("Update assignment called: " + writeResult.get().toString());

        return ValidationResponse.builder()
                .status(ValidationErrors.STATUS_OK)
                .message(ValidationErrors.MESSAGE_OK)
                .build();
    }

    @Override
    @SneakyThrows
    public Assignment getAssignmentById(String id) {
        DocumentReference documentReference = db.collection(Assignment.Keys.COLLECTION)
                .document(id);

        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot documentSnapshot = future.get();

        if (documentSnapshot.exists()) {
            Assignment assignment = documentSnapshot.toObject(Assignment.class);
            assignment.setId(documentSnapshot.getId());
            return assignment;
        }
        return null;
    }
}
