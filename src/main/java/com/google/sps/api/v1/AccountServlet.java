package com.google.sps.api.v1;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.sps.dao.AccountDao;
import com.google.sps.dao.IAccountDao;
import com.google.sps.models.Account;
import com.google.sps.utils.validation.ServletUtils;
import com.google.sps.utils.validation.ValidationErrors;
import com.google.sps.utils.validation.ValidationResponse;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Slf4j
@WebServlet("/api/v1/account")
public class AccountServlet extends HttpServlet {
    private Gson gson;
    private IAccountDao accountDao;

    public AccountServlet() {
        gson = new GsonBuilder().setPrettyPrinting().create();
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

        resp.setStatus(HttpServletResponse.SC_OK);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        out.print(gson.toJson(account));
        out.flush();
    }

    /**
     * Register for an account based on Roles
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Account account = new Account().createFromJsonRequest(req);

        String firebaseUid = req.getHeader("X-Firebase-Uid");
        account.setFirebaseUid(firebaseUid);
        log.info("Create Account Requested ..", firebaseUid);

        if (accountDao.getAccount(firebaseUid) != null) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            return;
        }

        ValidationResponse validationResponse = accountDao.createAccount(account);
        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);

        if (validationResponse.getStatus() == ValidationErrors.STATUS_OK) {
            resp.setStatus(HttpServletResponse.SC_CREATED);
        } else {
            resp.setStatus(ValidationErrors.STATUS_NOT_OK);
        }
        resp.getWriter().println(gson.toJson(validationResponse));
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Account account = new Account().createFromJsonRequest(req);

        String firebaseUid = req.getHeader("X-Firebase-Uid");
        account.setFirebaseUid(firebaseUid);
        log.info("Create Account Requested ..", firebaseUid);

        if (accountDao.getAccount(firebaseUid) == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        ValidationResponse validationResponse = accountDao.updateAccount(account);
        resp.setContentType(ServletUtils.CONTENT_TYPE_JSON);

        if (validationResponse.getStatus() == ValidationErrors.STATUS_OK) {
            resp.setStatus(HttpServletResponse.SC_OK);
        } else {
            resp.setStatus(ValidationErrors.STATUS_NOT_OK);
        }
        resp.getWriter().println(gson.toJson(validationResponse));
    }
}
