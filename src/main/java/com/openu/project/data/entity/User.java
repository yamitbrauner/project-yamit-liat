package com.openu.project.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @Column(name ="user_id")
    @SequenceGenerator(name="seq_user",sequenceName="SEQ_USER", allocationSize=1)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="seq_user")
    private int userId;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "role_id")
    private int roleId;

    @Column(name = "password")
    private String password;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
