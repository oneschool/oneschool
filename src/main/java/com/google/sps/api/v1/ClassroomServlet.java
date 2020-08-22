package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.sps.dao.ClassroomDao;
import com.google.sps.dao.IClassroomDao;
import com.google.sps.models.Classroom;
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

@WebServlet("/api/v1/classroom")
public class ClassroomServlet extends HttpServlet {
    private Gson gson;
    private IClassroomDao classroomDao;

    public ClassroomServlet() {
        gson = new GsonBuilder().setPrettyPrinting().create();
        classroomDao = new ClassroomDao();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Classroom> classrooms = classroomDao.getAllClassrooms();

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().println(gson.toJson(classrooms));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Classroom classroom = Classroom.builder().build().createFromRequest(req);

        ValidationResponse validationResponse = classroomDao.createClassroom(classroom);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        if (validationResponse.getStatus() == ValidationErrors.STATUS_OK) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            resp.setStatus(HttpServletResponse.SC_OK);
        }
        resp.getWriter().println(gson.toJson(validationResponse));
    }
}
