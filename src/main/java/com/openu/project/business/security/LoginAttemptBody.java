package com.openu.project.business.security;

public class LoginAttemptBody {
    private String mail;
    private String password;

    public LoginAttemptBody() {}

    public String getMail() { return mail; }
    public String getPassword() { return password; }
    public void setMail(String mail) { this.mail = mail; }
    public void setPassword(String password) { this.password = password; }
}
