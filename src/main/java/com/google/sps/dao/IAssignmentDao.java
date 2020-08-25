package com.google.sps.dao;

import com.google.sps.models.Assignment;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ValidationResponse;

import java.util.List;

public interface IAssignmentDao {
    ValidationResponse createAssignment(IModel assignment);
    List<Assignment> getAllAssignmentsStudent(String studentId);
    List<Assignment> getAllAssignmentsEducator(String educatorId);
    List<Assignment> getAllPendingAssignments();
    List<Assignment> getAllSubmittedAssignments();
}
