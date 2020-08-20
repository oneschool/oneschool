package com.google.sps.dao;

import com.google.sps.models.Account;
import com.google.sps.models.IModel;
import com.google.sps.utils.Validation.ValidationResponse;

public interface IAccountDao {
    ValidationResponse createAccount(IModel account);
    Account getAccount(long id);
}
