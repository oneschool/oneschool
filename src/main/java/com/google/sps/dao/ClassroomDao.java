package com.google.sps.dao;

import com.google.api.core.ApiFuture;
import com.google.appengine.api.datastore.*;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.sps.models.Account;
import com.google.sps.models.Classroom;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
public class ClassroomDao implements IClassroomDao {
    private Firestore db;

    public ClassroomDao() {
        db = FirestoreClient.getFirestore();
    }

    @Override
    @SneakyThrows
    public ValidationResponse createClassroom(Classroom classroom) {
        ValidationResponse validationResponse = classroom.validate(true);

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        String id = UUID.randomUUID().toString();
        classroom.setId(id);

        classroom.setCreated(System.currentTimeMillis());
        classroom.setUpdated(System.currentTimeMillis());

        ApiFuture<WriteResult> future = db.collection(Classroom.Keys.COLLECTION)
                .document(classroom.getId())
                .set(classroom);

        log.info("Classroom created: ", future.get().toString());
        return validationResponse;
    }

    @Override
    @SneakyThrows
    public List<Classroom> getAllClassroomsEducator() {
        ApiFuture<QuerySnapshot> future = db.collection(Classroom.Keys.COLLECTION).get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();


        List<Classroom> classrooms = new ArrayList<>();

        for (DocumentSnapshot document: documents) {
            Classroom currentClassroom = document.toObject(Classroom.class);
            currentClassroom.setId(document.getId());
            classrooms.add(currentClassroom);
        }
        return classrooms;
    }
}
