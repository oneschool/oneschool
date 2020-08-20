package com.google.sps.dao;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.sps.models.Account;
import com.google.sps.models.IModel;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;

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
    public Account getAccount(long id) {
        Query query = new Query(Account.Keys.KIND);




        return null;
    }
}
