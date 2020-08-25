package com.google.sps.dao;

import com.google.sps.models.Classroom;
import com.google.sps.models.ClassroomStudent;
import com.google.sps.utils.validation.ValidationResponse;

import java.util.List;

public interface IClassroomStudentDao {
    ValidationResponse addStudentsToClassroom(List<ClassroomStudent> classroomStudents);
    List<ClassroomStudent> getClassroomsForStudent(String studentId);
}
