package com.openu.project.business.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.openu.project.business.service.UsersService;
import com.openu.project.data.entity.Users;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

import java.util.UUID;

public class UUIDAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private UsersService userService;

    static class LoginAttempt {
        private String username;
        private String password;
        public LoginAttempt() {}
        public String getUsername() { return username; }
        public String getPassword() { return password; }
        public void setUsername(String username) { this.username = username; }
        public void setPassword(String password) { this.password = password; }
    }

    static class authenticateResponse {
        private String token;
        private String expireIn;

        public authenticateResponse(String token, String expireIn) {
            this.token = token;
            this.expireIn = expireIn;
        }
    }


    private AuthenticationManager authenticationManager;
    public static final long EXPIRATION_TIME = 900_000;

    public UUIDAuthenticationFilter(AuthenticationManager authenticationManager, UsersService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        setFilterProcessesUrl("/api/services/controller/user/login");
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {

            LoginAttempt creds = new ObjectMapper()
                    .readValue(req.getInputStream(), LoginAttempt.class);

            //AuthRequest req = this.getCredentials(request);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>())
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException {

        MyUserDetails userDetails = (MyUserDetails) auth.getPrincipal();
        final String uuid = UUID.randomUUID().toString();

        String username = userDetails.getUsername();
        //String username =userDetails.getUsername();
        //String username = creds.getUsername();
        //String body = ((User) auth.getPrincipal()).getUsername() + " " + uuid;
        //String body = "test";
        // TODO: Add expire token date to user
        //new Date(System.currentTimeMillis() + EXPIRATION_TIME);


        // TODO: SAVE User details to database
//        final User user = User
//                .builder()
//                .set(uuid)
//                .username(username)
//                .password(password)
//                .build();

        // ADD here token service.
        // TODO: UPDATE EXPIRE DATE
        userService.updateUserAutoKey(username,uuid);

        Users user = userService.getUserByMail(username);
        //authenticateResponse resBody = new authenticateResponse(uuid,"2022-12-16T22:00:00.000+00:00");
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        //res.getWriter().write(new Gson().toJson(resBody));
        res.getWriter().write(new Gson().toJson(user));
        res.getWriter().flush();
    }
}