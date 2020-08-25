package com.google.sps.dao;

import com.google.api.core.ApiFuture;
import com.google.appengine.api.datastore.*;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.sps.models.*;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
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
}
