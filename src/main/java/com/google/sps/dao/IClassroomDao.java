package com.google.sps.dao;

import com.google.sps.models.Classroom;
import com.google.sps.models.IModel;
import com.google.sps.utils.Validation.ValidationResponse;

import java.util.Collection;
import java.util.List;

public interface IClassroomDao {
    ValidationResponse createClassroom(IModel classroom);
    List<Classroom> getAllClassrooms();
}
