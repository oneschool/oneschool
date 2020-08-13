package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.sps.dao.EducatorDao;
import com.google.sps.dao.IEducatorDao;
import com.google.sps.models.Educator;
import com.google.sps.utils.Validation.ServletUtils;
import com.google.sps.utils.Validation.ValidationResponse;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/api/v1/educator")
public class EducatorServlet extends HttpServlet {
    private Gson gson;
    private IEducatorDao educatorDao;

    public EducatorServlet() {
        gson = new Gson();
        educatorDao = new EducatorDao();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        long educatorId = Long.parseLong(req.getHeader("X-educatorId"));
        Educator educator = educatorDao.getEducator(educatorId);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.getWriter().println(gson.toJson(educator));
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Educator educator = Educator.builder().build().createFromRequest(req);

        ValidationResponse validationResponse = educatorDao.createEducator(educator);

        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);
        resp.setStatus(HttpServletResponse.SC_ACCEPTED);
        resp.getWriter().println(gson.toJson(validationResponse));
    }

}
