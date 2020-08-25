package com.google.sps.dao;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.models.Account;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ValidationResponse;

import java.util.Map;
import java.util.concurrent.ExecutionException;

public interface IAccountDao {
    ValidationResponse createAccount(Account account);
    ValidationResponse updateAccount(Account account);
    Account getAccount(String firebaseUid);
}
