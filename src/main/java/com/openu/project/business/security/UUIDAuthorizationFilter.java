package com.openu.project.business.security;

import com.openu.project.business.service.UsersService;
import com.openu.project.data.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class UUIDAuthorizationFilter extends BasicAuthenticationFilter {

    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String ADMIN_URL = "/admin/";
    public static final String ADMIN_SECTION_NAME = "admin";
    public static final int ADMIN_ROLE = 1;
    public static final String USER_URL = "/user/";
    public static final int USER_SECTION_IDX = 2;

    private UsersService userService;

    @Autowired
    public UUIDAuthorizationFilter(AuthenticationManager authManager, UsersService userService) {
        super(authManager);
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(HEADER_STRING);

        String reqUrl = req.getRequestURI().toString();
        if (reqUrl.startsWith(USER_URL) || reqUrl.startsWith(ADMIN_URL) ) {
            if (header == null || !header.startsWith(TOKEN_PREFIX)) {
                chain.doFilter(req, res);
                return;
            }

            String userUrlSection = ADMIN_SECTION_NAME;
            if (reqUrl.startsWith(USER_URL)) {
                userUrlSection = reqUrl.split("/")[USER_SECTION_IDX];
            }

            UsernamePasswordAuthenticationToken authentication = getAuthentication(req, userUrlSection);

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(req, res);
    }

    // Generating Authentication Token only if:
    // Token owner is admin and trying to access admin zone
    // Token owner is trying to access his own user section
    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request, String userUrlSection) {
        String token = request.getHeader(HEADER_STRING);

        if (token != null) {
            Users userEntry = userService.getUserDetailsByToken(token.replace(TOKEN_PREFIX, ""));
            // If no user have this token.
            if (null == userEntry) return null;

            Integer tokenOwnerUserId = userEntry.getUserId();
            boolean isUserAdmin = userEntry.getRoleId() == ADMIN_ROLE;

            // Grant Authentication token if accessing user specific url and is the correct user
            // OR
            // Grant Authentication token if accessing admin url and user is admin
            if ((userUrlSection.equals(ADMIN_SECTION_NAME) && isUserAdmin) ||
                    tokenOwnerUserId.equals(Integer.parseInt(userUrlSection))) {
                return new UsernamePasswordAuthenticationToken(tokenOwnerUserId, null, new ArrayList<>());
            }

            return null;
        }

        return null;
    }
}