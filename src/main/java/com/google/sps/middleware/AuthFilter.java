package com.google.sps.middleware;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.sps.utils.middleware.MutableHttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

@Slf4j
@WebFilter(filterName = "authFilter", urlPatterns = "/api/v1/*")
public class AuthFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

        try{
            FileInputStream serviceAccount =
              new FileInputStream("WEB-INF/summer20-sps-76-firebase-adminsdk.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
              .setCredentials(GoogleCredentials.fromStream(serviceAccount))
              .setDatabaseUrl("https://summer20-sps-76.firebaseio.com")
              .build();

            FirebaseApp.initializeApp(options);

            log.info("Authentication enabled");
        } catch(FileNotFoundException e) {
            e.printStackTrace();
            log.warn("Danger!!! Firebase auth disabled.");
            return;
        } catch (IOException e) {
            e.printStackTrace();
            log.warn("Danger!!! Firebase auth disabled.");
            return;
        } catch (Exception e) {
            e.printStackTrace();
            log.warn("No clue what broke");
            return;
        }
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        // Uncomment the following line when doing local testing and add X-Firebase-Uid in the Headers
//        filterChain.doFilter(request, response);
//        return;

        String token = request.getHeader("X-Token");
        FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();

        MutableHttpServletRequest mutableRequest = new MutableHttpServletRequest(request);

        try {
            FirebaseToken firebaseToken = firebaseAuth.verifyIdToken(token);
            mutableRequest.putHeader("X-Firebase-Uid", firebaseToken.getUid());
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            log.warn("ID token validation failed" + e.getMessage());
            return;
        }
        filterChain.doFilter(mutableRequest, servletResponse);
    }
}
