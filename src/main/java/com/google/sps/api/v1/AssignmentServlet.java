package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.sps.dao.AccountDao;
import com.google.sps.dao.AssignmentDao;
import com.google.sps.dao.IAccountDao;
import com.google.sps.dao.IAssignmentDao;
import com.google.sps.models.Account;
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
    private IAccountDao accountDao;

    public AssignmentServlet() {
        gson = new Gson();
        assignmentDao = new AssignmentDao();
        accountDao = new AccountDao();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String firebaseUid = req.getHeader("X-Firebase-Uid");
        if (firebaseUid == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        Account account = accountDao.getAccount(firebaseUid);

        if (account == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        List<Assignment> assignments;
        if(account.getRole().equals("student")) {
            assignments = assignmentDao.getAllAssignmentsStudent(account.getFirebaseUid());
        }
        else {assignments = assignmentDao.getAllAssignmentsEducator(account.getFirebaseUid());

        }

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().println(gson.toJson(assignments));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Assignment assignment = Assignment.builder().build().createFromJsonRequest(req);

        String firebaseUid = req.getHeader("X-Firebase-Uid");

        if (firebaseUid == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        Account account = accountDao.getAccount(firebaseUid);

        if (account == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        // create an assignment (for educator) or upload an assignment (for student)
        // the functionality for both is same so taking the function as createAssignment only

        ValidationResponse validationResponse = assignmentDao.createAssignment(assignment);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        if (validationResponse.getStatus() == ValidationErrors.STATUS_OK) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            resp.setStatus(HttpServletResponse.SC_OK);
        }
        resp.getWriter().println(gson.toJson(validationResponse));
    }

    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String firebaseUid = req.getHeader("X-Firebase-Uid");
        if (firebaseUid == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        Account account = accountDao.getAccount(firebaseUid);

        if (account == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        Long assignmentId = Long.parseLong(req.getParameter("id"));
        Assignment assignment = assignmentDao.getAssignmentById(assignmentId);

        if(account.getRole().equals("student")) {
            String solution = ServletUtils.getParameter(req, "solution", "");
            assignment.setSolution(solution);
            assignment.setSubmitted(true);
            assignment.setUpdated(System.currentTimeMillis());
        }
        else {
            long scoredMarks = Long.parseLong(req.getParameter("scored_marks"));
            assignment.setScored_marks(scoredMarks);
            assignment.setUpdated(System.currentTimeMillis());
        }

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