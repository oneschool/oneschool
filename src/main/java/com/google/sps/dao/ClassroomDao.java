package com.google.sps.dao;

import com.google.appengine.api.datastore.*;
import com.google.sps.models.Classroom;
import com.google.sps.models.IModel;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;

import java.util.ArrayList;
import java.util.List;

public class ClassroomDao implements IClassroomDao {
    private DatastoreService datastoreService;

    public ClassroomDao() {
        datastoreService = DatastoreServiceFactory.getDatastoreService();
    }

    @Override
    public ValidationResponse createClassroom(IModel classroom) {
        ValidationResponse validationResponse = classroom.validate();

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        Entity classroomEntity = classroom.getAsEntity();
        datastoreService.put(classroomEntity);

        return validationResponse;
    }

    @Override
    public List<Classroom> getAllClassrooms() {
        Query query = new Query(Classroom.Keys.KIND);

        PreparedQuery results = datastoreService.prepare(query);

        List<Classroom> classrooms = new ArrayList<>();

        for (Entity entity: results.asIterable()) {
            classrooms.add(
                    Classroom.builder().build().createFromEntity(entity)
            );
        }
        return classrooms;
    }
}
