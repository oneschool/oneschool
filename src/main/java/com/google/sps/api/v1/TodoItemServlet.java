package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.sps.dao.ITodoItemDao;
import com.google.sps.dao.TodoItemDao;
import com.google.sps.models.TodoItem;
import com.google.sps.utils.Validation.ServletUtils;
import com.google.sps.utils.Validation.ValidationErrors;
import com.google.sps.utils.Validation.ValidationResponse;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/v1/todo")
public class TodoItemServlet extends HttpServlet {
    private Gson gson;
    private ITodoItemDao todoItemDao;

    public TodoItemServlet() {
        gson = new Gson();
        todoItemDao = new TodoItemDao();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long userId = Long.parseLong(req.getHeader("X-userId"));

        //Completion filter: user can filter TODOs based on completion status
        //To be decided: Use request body OR request header
        String completionFilter = req.getHeader("X-isComplete");

        List<TodoItem> todoItems = null;

        if(completionFilter != null){
            boolean isComplete = Boolean.parseBoolean(completionFilter);

            if(isComplete) todoItems = todoItemDao.getCompletedTodoItems(userId);
            else todoItems = todoItemDao.getIncompleteTodoItems(userId);
        }

        else{
            todoItems = todoItemDao.getAllTodoItems(userId);
        }

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().println(gson.toJson(todoItems));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        TodoItem todoItem = TodoItem.builder().build().createFromRequest(req);

        ValidationResponse validationResponse = todoItemDao.createTodoItem(todoItem);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        if (validationResponse.getStatus() == ValidationErrors.STATUS_OK) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            resp.setStatus(HttpServletResponse.SC_OK);
        }
        resp.getWriter().println(gson.toJson(validationResponse));
    }
}
