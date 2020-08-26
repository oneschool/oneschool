package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.sps.dao.AccountDao;
import com.google.sps.dao.ClassroomStudentDao;
import com.google.sps.dao.IClassroomStudentDao;
import com.google.sps.models.Account;
import com.google.sps.models.ClassroomStudent;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ServletUtils;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@WebServlet("/api/v1/classroom/addStudents")
public class ClassroomStudentServlet extends HttpServlet {
    private Gson gson;
    private IClassroomStudentDao classroomStudentDao;

    public ClassroomStudentServlet() {
        gson = new Gson();
        classroomStudentDao = new ClassroomStudentDao();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String firebaseUid = req.getHeader("X-Firebase-Uid");

        if (firebaseUid == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        Account account = new AccountDao().getAccount(firebaseUid);
        if (account == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        if (!account.getRole().equals("educator")) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        BufferedReader bufferedReader = req.getReader();

        ClassroomStudentList classroomStudentList = gson.fromJson(bufferedReader, ClassroomStudentList.class);
        List<ClassroomStudent> classroomStudents = new ArrayList<>();
        if (classroomStudentList != null) {
            classroomStudents = classroomStudentList.getClassroomStudents();
        }

        ValidationResponse validationResponse = classroomStudentDao.addStudentsToClassroom(classroomStudents);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        if (validationResponse.getStatus() == ValidationErrors.STATUS_OK) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            resp.setStatus(HttpServletResponse.SC_OK);
        }
        resp.getWriter().println(gson.toJson(validationResponse));
    }

    @Getter
    @NoArgsConstructor
    public class ClassroomStudentList {
        private List<ClassroomStudent> classroomStudents;
    }
}
