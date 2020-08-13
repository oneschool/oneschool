package com.google.sps.dao;

import com.google.sps.models.IModel;
import com.google.sps.models.Student;
import com.google.sps.utils.Validation.ValidationResponse;

public interface IStudentDao {
    ValidationResponse createStudent(IModel student);
    Student getStudent(long id);
}
