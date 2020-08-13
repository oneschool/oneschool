package com.google.sps.dao;

import com.google.appengine.api.datastore.*;
import com.google.sps.models.IModel;
import com.google.sps.models.TodoItem;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.CompositeFilter;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;

import java.util.ArrayList;
import java.util.List;

public class TodoItemDao implements ITodoItemDao{
    private DatastoreService datastoreService;

    public TodoItemDao() {
        datastoreService = DatastoreServiceFactory.getDatastoreService();
    }

    @Override
    public ValidationResponse createTodoItem(IModel todoItem) {
        ValidationResponse validationResponse = todoItem.validate();

        if (validationResponse.getStatus() == ValidationErrors.STATUS_NOT_OK) {
            return validationResponse;
        }

        Entity todoEntity = todoItem.createEntity();
        datastoreService.put(todoEntity);

        return validationResponse;
    }

    @Override
    public List<TodoItem> getAllTodoItems(long userId) {
        Filter userFilter =
                new FilterPredicate("userId", FilterOperator.EQUAL, userId);

        Query query = new Query(TodoItem.Keys.KIND).setFilter(userFilter)
                .addSort("updated", SortDirection.DESCENDING);


        List<TodoItem> todoItems = new ArrayList<>();
        PreparedQuery results = datastoreService.prepare(query);

        for (Entity todoEntity: results.asIterable()) {
            todoItems.add(
                    TodoItem.builder().build().createFromEntity(todoEntity)
            );
        }
        return todoItems;
    }

    @Override
    public List<TodoItem> getCompletedTodoItems(long userId) {
        Filter userFilter =
                new FilterPredicate("userId", FilterOperator.EQUAL, userId);
        Filter todoCompletedFilter =
                new FilterPredicate("isComplete", FilterOperator.EQUAL, true);
        CompositeFilter todoFilter =
                CompositeFilterOperator.and(userFilter, todoCompletedFilter);

        Query query = new Query(TodoItem.Keys.KIND).setFilter(todoFilter)
                .addSort("updated", SortDirection.DESCENDING);


        List<TodoItem> todoItems = new ArrayList<>();
        PreparedQuery results = datastoreService.prepare(query);

        for (Entity todoEntity: results.asIterable()) {
            todoItems.add(
                    TodoItem.builder().build().createFromEntity(todoEntity)
            );
        }
        return todoItems;
    }

    @Override
    public List<TodoItem> getIncompleteTodoItems(long userId) {
        Filter userFilter =
                new FilterPredicate("userId", FilterOperator.EQUAL, userId);
        Filter todoCompletedFilter =
                new FilterPredicate("isComplete", FilterOperator.EQUAL, false);
        CompositeFilter todoFilter =
                CompositeFilterOperator.and(userFilter, todoCompletedFilter);

        Query query = new Query(TodoItem.Keys.KIND).setFilter(todoFilter)
                .addSort("updated", SortDirection.DESCENDING);


        List<TodoItem> todoItems = new ArrayList<>();
        PreparedQuery results = datastoreService.prepare(query);

        for (Entity todoEntity: results.asIterable()) {
            todoItems.add(
                    TodoItem.builder().build().createFromEntity(todoEntity)
            );
        }
        return todoItems;
    }
}
