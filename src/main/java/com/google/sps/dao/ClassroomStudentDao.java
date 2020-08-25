package com.google.sps.dao;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.sps.models.Classroom;
import com.google.sps.models.ClassroomStudent;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
public class ClassroomStudentDao implements IClassroomStudentDao {
    private Firestore db;

    public ClassroomStudentDao() {
        db = FirestoreClient.getFirestore();
    }

    private ValidationResponse validateClassroomStudents(List<ClassroomStudent> classroomStudents) {
        for (ClassroomStudent classroomStudent: classroomStudents) {
            ValidationResponse currentValidationResponse = classroomStudent.validate(true);
            if (currentValidationResponse.getStatus() != ValidationErrors.STATUS_OK) {
                return currentValidationResponse;
            }
        }
        return ValidationResponse.builder()
                .status(ValidationErrors.STATUS_OK)
                .message(ValidationErrors.MESSAGE_OK)
                .build();
    }

    @SneakyThrows
    private void addStudent(ClassroomStudent classroomStudent) {
        String id = UUID.randomUUID().toString();
        classroomStudent.setId(id);

        ApiFuture<WriteResult> future = db.collection(ClassroomStudent.Keys.COLLECTION)
                .document(classroomStudent.getId())
                .set(classroomStudent);

        log.info(String.format(
                "Student %s added to classroom %s.\nResult: %s",
                classroomStudent.getStudentId(),
                classroomStudent.getClassroomId(),
                future.get().toString()
            )
        );
    }

    @Override
    @SneakyThrows
    public ValidationResponse addStudentsToClassroom(List<ClassroomStudent> classroomStudents) {
        ValidationResponse validationResponse = validateClassroomStudents(classroomStudents);

        if (validationResponse.getStatus() != ValidationErrors.STATUS_OK) {
            return validationResponse;
        }

        for (ClassroomStudent classroomStudent: classroomStudents) {
            addStudent(classroomStudent);
        }

        return validationResponse;
    }

    @Override
    @SneakyThrows
    public List<ClassroomStudent> getClassroomsForStudent(String studentId) {
        ApiFuture<QuerySnapshot> future = db.collection(ClassroomStudent.Keys.COLLECTION)
                .whereEqualTo(ClassroomStudent.Keys.STUDENT_ID, studentId).get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        List<ClassroomStudent> classrooms = new ArrayList<>();

        for (DocumentSnapshot document: documents) {
            ClassroomStudent currentClassroom = document.toObject(ClassroomStudent.class);
            currentClassroom.setId(document.getId());
            classrooms.add(currentClassroom);
        }
        return classrooms;
    }
}
