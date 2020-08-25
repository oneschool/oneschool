package com.google.sps.dao;

import com.google.sps.models.Classroom;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ValidationResponse;

import java.util.List;

public interface IClassroomDao {
    ValidationResponse createClassroom(Classroom classroom);
    List<Classroom> getAllClassroomsEducator();
}
