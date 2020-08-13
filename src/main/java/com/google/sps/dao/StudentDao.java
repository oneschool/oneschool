package com.google.sps.dao;

import com.google.appengine.api.datastore.*;
import com.google.sps.models.IModel;
import com.google.sps.models.Student;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;

public class StudentDao implements IStudentDao{
    private DatastoreService datastoreService;

    public StudentDao() {
        datastoreService = DatastoreServiceFactory.getDatastoreService();
    }

    @Override
    public ValidationResponse createStudent(IModel student) {
        ValidationResponse validationResponse = student.validate();

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        Entity studentEntity = student.createEntity();
        datastoreService.put(studentEntity);

        return validationResponse;
    }

    @Override
    public Student getStudent(long rollNum) {
        Query.Filter studentFilter =
                new Query.FilterPredicate("rollNum", Query.FilterOperator.EQUAL, rollNum);

        Query query = new Query(Student.Keys.KIND).setFilter(studentFilter);

        PreparedQuery result = datastoreService.prepare(query);
        Entity studentEntity = result.asSingleEntity();

        return Student.builder().build().createFromEntity(studentEntity);
    }
}
