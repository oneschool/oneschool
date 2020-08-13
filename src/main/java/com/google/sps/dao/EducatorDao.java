package com.google.sps.dao;

import com.google.appengine.api.datastore.*;
import com.google.sps.models.Educator;
import com.google.sps.models.IModel;
import com.google.sps.models.Student;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;

public class EducatorDao implements IEducatorDao{
    private DatastoreService datastoreService;

    public EducatorDao() {
        datastoreService = DatastoreServiceFactory.getDatastoreService();
    }

    @Override
    public ValidationResponse createEducator(IModel educator) {
        ValidationResponse validationResponse = educator.validate();

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        Entity studentEntity = educator.createEntity();
        datastoreService.put(studentEntity);

        return validationResponse;
    }

    @Override
    public Educator getEducator(long id) {
        Query.Filter educatorFilter =
                new Query.FilterPredicate("educatorId", Query.FilterOperator.EQUAL, id);

        Query query = new Query(Student.Keys.KIND).setFilter(educatorFilter);

        PreparedQuery result = datastoreService.prepare(query);
        Entity educatorEntity = result.asSingleEntity();

        return Educator.builder().build().createFromEntity(educatorEntity);
    }
}
