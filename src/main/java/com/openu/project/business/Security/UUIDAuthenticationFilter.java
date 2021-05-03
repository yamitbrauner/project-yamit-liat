package com.openu.project.business.Security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.openu.project.business.service.UsersService;
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
        userService.updateUserAutoKey(username,uuid);
        res.getWriter().write(uuid);
        res.getWriter().flush();
    }
}