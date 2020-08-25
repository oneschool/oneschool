package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.sps.dao.AccountDao;
import com.google.sps.models.Account;
import com.google.sps.models.Classroom;
import com.google.sps.models.IModel;
import com.google.sps.utils.validation.ServletUtils;
import com.google.sps.utils.validation.ValidationResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/v1/classroom/students")
public class StudentServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
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
        ClassroomId classroomId = new Gson().fromJson(bufferedReader, ClassroomId.class);

        if (classroomId == null || classroomId.getClassroomId() == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        List<Account> students = new AccountDao().getAllStudentsInClassroom(classroomId.getClassroomId());

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().println(new Gson().toJson(students));
    }

    @Getter
    @NoArgsConstructor
    private class ClassroomId {
        private String classroomId;
    }
}
