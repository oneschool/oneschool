package com.google.sps.dao;

import com.google.appengine.api.datastore.*;
import com.google.sps.models.Account;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;

public class AccountDao implements IAccountDao {

    private DatastoreService datastoreService;

    public AccountDao() {
        datastoreService = DatastoreServiceFactory.getDatastoreService();
    }

    @Override
    public ValidationResponse createAccount(IModel account) {
        ValidationResponse validationResponse = account.validate();

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        Entity accountEntity = account.getAsEntity();
        datastoreService.put(accountEntity);

        return validationResponse;
    }

    @Override
    public ValidationResponse updateAccount(Account account) {
        ValidationResponse validationResponse = account.validate();

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }
        Entity accountEntity = getAccountEntity(account.getFirebaseUid());
        accountEntity = account.setEntityAttributes(accountEntity, true);

        datastoreService.put(accountEntity);

        return validationResponse;
    }

    @Override
    public Account getAccount(String firebaseUid) {
        Entity accountEntity = getAccountEntity(firebaseUid);
        if (accountEntity == null) return null;
        return Account.builder().build().createFromEntity(accountEntity);
    }

    @Override
    public Entity getAccountEntity(String firebaseUid) {
        Query.Filter filter = new Query.FilterPredicate(Account.Keys.FIREBASE_UID, Query.FilterOperator.EQUAL, firebaseUid);
        Query query = new Query(Account.Keys.KIND).setFilter(filter);

        PreparedQuery results = datastoreService.prepare(query);
        try {
            return results.asSingleEntity();
        } catch (Exception e) {
            return null;
        }
    }

}
