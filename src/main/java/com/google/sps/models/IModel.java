package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.utils.validation.ValidationResponse;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public interface IModel {
    ValidationResponse validate();
    Entity getAsEntity();
    IModel createFromEntity(Entity entity);
    IModel createFromRequest(HttpServletRequest request);
    IModel createFromJsonRequest(HttpServletRequest request) throws IOException;
    void setCreated();
    void setUpdated();
    default void setCreatedAndUpdated() {
        this.setCreated();
        this.setUpdated();
    };
}
