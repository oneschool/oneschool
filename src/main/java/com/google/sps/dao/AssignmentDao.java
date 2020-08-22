package com.google.sps.dao;

import com.google.appengine.api.datastore.*;
import com.google.sps.models.Account;
import com.google.sps.models.Assignment;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;

import java.util.ArrayList;
import java.util.List;

public class AssignmentDao implements  IAssignmentDao{

    private DatastoreService datastoreService;

    public AssignmentDao() {
        datastoreService = DatastoreServiceFactory.getDatastoreService();
    }

    @Override
    public ValidationResponse createAssignment(IModel assignment) {
        ValidationResponse validationResponse = assignment.validate();

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        Entity assignmentEntity = assignment.getAsEntity();
        datastoreService.put(assignmentEntity);

        return validationResponse;
    }

    @Override
    public List<Assignment> getAllAssignmentsStudent(String studentId) {
        Query.Filter filter = new Query.FilterPredicate(Assignment.Keys.STUDENT_ID, Query.FilterOperator.EQUAL, studentId);
        Query query = new Query(Assignment.Keys.KIND).setFilter(filter);

        PreparedQuery results = datastoreService.prepare(query);

        List<Assignment> assignments = new ArrayList<>();

        for(Entity entity: results.asIterable()) {
            assignments.add(
              Assignment.builder().build().createFromEntity(entity)
            );
        }
        return assignments;
    }

    @Override
    public List<Assignment> getAllAssignmentsEducator(String educatorId) {
        Query.Filter filter = new Query.FilterPredicate(Assignment.Keys.EDUCATOR_ID, Query.FilterOperator.EQUAL, educatorId);
        Query query = new Query(Assignment.Keys.EDUCATOR_ID).setFilter(filter);

        PreparedQuery results = datastoreService.prepare(query);

        List<Assignment> assignments = new ArrayList<>();

        for(Entity entity: results.asIterable()) {
            assignments.add(
                    Assignment.builder().build().createFromEntity(entity)
            );
        }
        return assignments;
    }

    @Override
    public List<Assignment> getAllPendingAssignments() {
        Query query = new Query(Assignment.Keys.KIND);

        PreparedQuery results = datastoreService.prepare(query);

        List<Assignment> assignments = new ArrayList<>();

        for(Entity entity: results.asIterable()) {

            if(!((boolean)entity.getProperty(Assignment.Keys.SUBMITTED))) {
                assignments.add(
                        Assignment.builder().build().createFromEntity(entity)
                );
            }
        }
        return assignments;
    }

    @Override
    public List<Assignment> getAllSubmittedAssignments() {
        Query query = new Query(Assignment.Keys.KIND);

        PreparedQuery results = datastoreService.prepare(query);

        List<Assignment> assignments = new ArrayList<>();

        for(Entity entity: results.asIterable()) {

            if((boolean)entity.getProperty(Assignment.Keys.SUBMITTED)) {
                assignments.add(
                        Assignment.builder().build().createFromEntity(entity)
                );
            }
        }
        return assignments;
    }
}
