package com.google.sps.dao;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.sps.models.Account;
import com.google.sps.models.ClassroomStudent;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
public class AccountDao implements IAccountDao {

    private Firestore db;

    public AccountDao() {
        db = FirestoreClient.getFirestore();
    }

    @Override
    @SneakyThrows // no time
    public ValidationResponse createAccount(Account account) {
        ValidationResponse validationResponse = account.validate(true);

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        // new id
        String id = UUID.randomUUID().toString();
        account.setId(id);

        // time
        account.setCreated(System.currentTimeMillis());
        account.setUpdated(account.getCreated());

        // async call
        ApiFuture<WriteResult> future = db.collection(Account.Keys.COLLECTION).document(account.getId()).set(account);

        // to make it async comment the following line
        // not catching an exception here, no time
        log.info("Account creation result: " + future.get().toString());
        return validationResponse;
    }

    @Override
    @SneakyThrows // no time
    public ValidationResponse updateAccount(Account newAccount) {
        ValidationResponse validationResponse = newAccount.validate(false);

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        Account oldAccount = getAccount(newAccount.getFirebaseUid());

        newAccount.setId(oldAccount.getId());
        // since we are supporting partial updates do this
        // as if certain field is left null Firestore will remove that value from db
        newAccount.setRole(oldAccount.getRole());
        newAccount.setUpdated(System.currentTimeMillis());

        // weird not null is zero but
        if (newAccount.getCreated() == 0) {
            newAccount.setCreated(oldAccount.getCreated());
        }

        if (newAccount.getName() == null) {
            newAccount.setName(oldAccount.getName());
        }

        if (newAccount.getEmail() == null) {
            newAccount.setEmail(oldAccount.getEmail());
        }

        if (newAccount.getImageUrl() == null) {
            newAccount.setImageUrl(oldAccount.getImageUrl());
        }

        // weird this sets to false and not null
        if (!newAccount.isVerified()) {
            newAccount.setVerified(oldAccount.isVerified());
        }

        if (newAccount.getInstitute() == null) {
            newAccount.setInstitute(oldAccount.getInstitute());
        }

        // set options merge did not work due to class thing
        // https://firebase.google.com/docs/reference/android/com/google/firebase/firestore/SetOptions#merge()
        ApiFuture<WriteResult> writeResult = db.collection(Account.Keys.COLLECTION)
                .document(newAccount.getId()).set(newAccount);

        log.info("Update account called: " + writeResult.get().toString());
        return validationResponse;
    }

    @Override
    @SneakyThrows
    public Account getAccount(String firebaseUid) {
        ApiFuture<QuerySnapshot> future = db.collection(Account.Keys.COLLECTION)
                .whereEqualTo(Account.Keys.FIREBASE_UID, firebaseUid).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        Account account = null;
        for (DocumentSnapshot document : documents) {
            account = document.toObject(Account.class);
            account.setId(document.getId());
            log.info(account.toString());
            return account;
        }
        return null;
    }

    @Override
    @SneakyThrows
    public Account getAccountById(String id) {
        ApiFuture<QuerySnapshot> future = db.collection(Account.Keys.COLLECTION)
                .whereEqualTo(Account.Keys.ID, id).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        Account account = null;
        for (DocumentSnapshot document : documents) {
            account = document.toObject(Account.class);
            account.setId(document.getId());
            log.info(account.toString());
            return account;
        }
        return null;
    }

    @Override
    public List<Account> getAllStudentsInClassroom(String classroomId) {
        List<ClassroomStudent> classroomStudents = new ClassroomStudentDao().getStudentsForClassroom(classroomId);

        List<Account> students = new ArrayList<>();

        for (ClassroomStudent classroomStudent: classroomStudents) {
            String studentId = classroomStudent.getStudentId();
            students.add(getAccountById(studentId));
        }
        return students;
    }
}
