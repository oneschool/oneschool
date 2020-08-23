package com.google.sps.dao;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.models.Account;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ValidationResponse;

public interface IAccountDao {
    ValidationResponse createAccount(IModel account);
    ValidationResponse updateAccount(Account account);
    Account getAccount(String firebaseUid);
    Entity getAccountEntity(String firebaseUid);

}
