package com.google.sps.models;

import com.google.appengine.api.datastore.Entity;
import com.google.sps.utils.Validation.ValidationResponse;

import javax.servlet.http.HttpServletRequest;

public interface IModel {
    ValidationResponse validate();
    Entity createEntity();
    IModel createFromEntity(Entity entity);
    IModel createFromRequest(HttpServletRequest request);
}
