package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.sps.dao.IStudentDao;
import com.google.sps.dao.StudentDao;
import com.google.sps.models.Student;
import com.google.sps.utils.Validation.ServletUtils;
import com.google.sps.utils.Validation.ValidationResponse;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/v1/student")
public class StudentServlet extends HttpServlet {
    private Gson gson;
    private IStudentDao studentDao;

    public StudentServlet() {
        gson = new Gson();
        studentDao = new StudentDao();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long rollNum = Long.parseLong(req.getHeader("X-rollNum"));
        Student student = studentDao.getStudent(rollNum);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().println(gson.toJson(student));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Student student = Student.builder().build().createFromRequest(req);

        ValidationResponse validationResponse = studentDao.createStudent(student);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_ACCEPTED);
        resp.getWriter().println(gson.toJson(validationResponse));
    }
}
