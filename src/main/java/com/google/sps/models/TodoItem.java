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
public class TodoItem implements IModel{
    private long id;
    private long userId;
    private String name;
    private String description;
    private boolean isComplete;

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
                    ValidationErrors.isEmptyOrWhiteSpace(TodoItem.Keys.NAME)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(description)) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(TodoItem.Keys.DESCRIPTION)
            );
        }

        if (ValidationUtils.isEmptyOrWhiteSpace(String.valueOf(isComplete))) {
            validationResponseBuilder.status(ValidationErrors.STATUS_NOT_OK);
            validationResponseBuilder.message(ValidationErrors.MESSAGE_NOT_OK);

            validationResponseBuilder.error(
                    ValidationErrors.isEmptyOrWhiteSpace(TodoItem.Keys.IS_COMPLETE)
            );
        }

        // TODO: Add validation for user. Check if user id is not null and exists in db.

        return validationResponseBuilder.build();
    }

    @Override
    public Entity getAsEntity() {
        Entity todoEntity = new Entity(TodoItem.Keys.KIND);

        todoEntity.setProperty(TodoItem.Keys.NAME, this.name);
        todoEntity.setProperty(TodoItem.Keys.DESCRIPTION, this.description);
        todoEntity.setProperty(TodoItem.Keys.CREATED, this.created);
        todoEntity.setProperty(TodoItem.Keys.UPDATED, this.updated);
        todoEntity.setProperty(TodoItem.Keys.USER_ID, this.userId);
        todoEntity.setProperty(TodoItem.Keys.IS_COMPLETE, this.isComplete);

        return todoEntity;
    }


    @Override
    public TodoItem createFromEntity(Entity entity) {
        return TodoItem.builder()
                .id(entity.getKey().getId())
                .name((String) entity.getProperty(TodoItem.Keys.NAME))
                .description((String) entity.getProperty(TodoItem.Keys.DESCRIPTION))
                .userId((long) entity.getProperty(TodoItem.Keys.USER_ID))
                .updated((long) entity.getProperty(TodoItem.Keys.UPDATED))
                .created((long) entity.getProperty(TodoItem.Keys.CREATED))
                .isComplete((boolean) entity.getProperty(TodoItem.Keys.IS_COMPLETE))
                .build();
    }

    @Override
    public TodoItem createFromRequest(HttpServletRequest request) {
        return TodoItem.builder()
                .name(ServletUtils.getParameter(request, Keys.NAME, ""))
                .description(ServletUtils.getParameter(request, Keys.DESCRIPTION, ""))
                .userId(Long.parseLong(ServletUtils.getParameter(request, Keys.USER_ID, "0")))
                .isComplete(Boolean.parseBoolean(ServletUtils.getParameter(request, Keys.IS_COMPLETE, "false")))
                .build();
    }

    public static class Keys {
        public static String KIND = "todo";
        public static String NAME = "name";
        public static String DESCRIPTION = "description";
        public static String USER_ID = "userId";
        public static String CREATED = "created";
        public static String UPDATED = "updated";
        public static String IS_COMPLETE = "isComplete";
    }

}
