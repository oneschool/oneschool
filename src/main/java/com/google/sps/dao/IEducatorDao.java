package com.google.sps.dao;

import com.google.sps.models.Educator;
import com.google.sps.models.IModel;
import com.google.sps.utils.Validation.ValidationResponse;

public interface IEducatorDao {
    ValidationResponse createEducator(IModel educator);
    Educator getEducator(long id);
}
