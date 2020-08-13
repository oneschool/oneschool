package com.google.sps.dao;

import com.google.sps.models.IModel;
import com.google.sps.models.TodoItem;
import com.google.sps.utils.Validation.ValidationResponse;

import java.util.List;

public interface ITodoItemDao {
    ValidationResponse createTodoItem(IModel todoItem);
    List<TodoItem> getAllTodoItems(long userId);
    List<TodoItem> getCompletedTodoItems(long userId);
    List<TodoItem> getIncompleteTodoItems(long userId);
}
