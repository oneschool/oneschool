package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.sps.dao.AssignmentDao;
import com.google.sps.dao.IAssignmentDao;
import com.google.sps.models.Assignment;
import com.google.sps.utils.validation.ServletUtils;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/v1/assignment")
public class AssignmentServlet extends HttpServlet {
    private Gson gson;
    private IAssignmentDao assignmentDao;

    public AssignmentServlet() {
        gson = new Gson();
        assignmentDao = new AssignmentDao();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Assignment> assignments = assignmentDao.getAllAssignments();

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().println(gson.toJson(assignments));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Assignment assignment = Assignment.builder().build().createFromRequest(req);

        ValidationResponse validationResponse = assignmentDao.createAssignment(assignment);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        if (validationResponse.getStatus() == ValidationErrors.STATUS_OK) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            resp.setStatus(HttpServletResponse.SC_OK);
        }
        resp.getWriter().println(gson.toJson(validationResponse));
    }

}