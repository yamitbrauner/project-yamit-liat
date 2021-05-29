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

    private AuthenticationManager authenticationManager;

    public UUIDAuthenticationFilter(AuthenticationManager authenticationManager, UsersService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        setFilterProcessesUrl(SecurityUrls.LOGIN_URL);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req,
                                                HttpServletResponse res) throws AuthenticationException {
        try {

            LoginAttemptBody creds = new ObjectMapper()
                    .readValue(req.getInputStream(), LoginAttemptBody.class);

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getMail(),
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

        // ADD here token service.
        // TODO: UPDATE EXPIRE DATE
        userService.updateUserAutoKey(username,uuid);

        Users user = userService.getUserByMail(username);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");

        res.getWriter().write(new Gson().toJson(user));
        res.getWriter().flush();
    }
}