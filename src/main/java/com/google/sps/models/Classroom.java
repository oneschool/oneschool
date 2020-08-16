package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.utils.Validation.ServletUtils;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;
import com.google.sps.utils.Validation.ValidationUtils;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.servlet.http.HttpServletRequest;

@Builder
@Setter
@Getter
public class Classroom implements IModel {
    private long id;
    private String name;
    private String description;
    private long educatorId;
    @Builder.Default
    private long created = System.currentTimeMillis();
    @Builder.Default
    private long updated = System.currentTimeMillis();

    @Override
    public ValidationResponse validate() {
        ValidationResponse.Builder validationResponseBuilder = ValidationResponse.builder();
        validationResponseBuilder.status(ValidationErrors.STATUS_OK);
        validationResponseBuilder.message(ValidationErrors.MESSAGE_OK);

        if (ValidationUtils.isEmptyOrWhiteSpace(name)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.NAME)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(description)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(Keys.DESCRIPTION)
            );
        }

        // TODO: Add validation for educator. Check if educator id is not null and exists in db.

        return validationResponseBuilder.build();
    }

    @Override
    public Entity getAsEntity() {
        Entity classroomEntity = new Entity(Keys.KIND);

        classroomEntity.setProperty(Keys.NAME, this.name);
        classroomEntity.setProperty(Keys.DESCRIPTION, this.description);
        classroomEntity.setProperty(Keys.CREATED, this.created);
        classroomEntity.setProperty(Keys.UPDATED, this.updated);
        classroomEntity.setProperty(Keys.EDUCATOR_ID, this.educatorId);

        return classroomEntity;
    }


    @Override
    public Classroom createFromEntity(Entity entity) {
        return Classroom.builder()
                .id(entity.getKey().getId())
                .name((String) entity.getProperty(Keys.NAME))
                .description((String) entity.getProperty(Keys.DESCRIPTION))
                .educatorId((long) entity.getProperty(Keys.EDUCATOR_ID))
                .updated((long) entity.getProperty(Keys.UPDATED))
                .created((long) entity.getProperty(Keys.CREATED))
                .build();
    }

    @Override
    public Classroom createFromRequest(HttpServletRequest request) {
        return Classroom.builder()
                .name(ServletUtils.getParameter(request, Keys.NAME, ""))
                .description(ServletUtils.getParameter(request, Keys.DESCRIPTION, ""))
                .educatorId(
                        Integer.parseInt(ServletUtils.getParameter(request, Keys.EDUCATOR_ID, "0"))
                )
                .build();
    }

    public static class Keys {
        public static String KIND = "classroom";
        public static String NAME = "name";
        public static String DESCRIPTION = "description";
        public static String EDUCATOR_ID = "educatorId";
        public static String CREATED = "created";
        public static String UPDATED = "updated";

    }
}
