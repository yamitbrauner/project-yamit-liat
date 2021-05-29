package com.openu.project.business.security;


public class SecurityUrls {
    public static final String LOGIN_URL = "/api/services/controller/user/login";

    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String ADMIN_URL = "/admin/";
    public static final String ADMIN_SECTION_URL_PREFIX = "admin";
    public static final int ADMIN_ROLE = 1;
    public static final int USER_ROLE = 2;
    public static final String USER_URL = "/user/";
    public static final int USER_SECTION_IDX = 2;
}
