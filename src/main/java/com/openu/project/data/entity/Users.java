package com.openu.project.data.entity;

import javax.persistence.*;

@Entity
@Table(name = "Users")
public class Users {
    @Id
    @Column(name ="userId")
    @SequenceGenerator(name="seq_users",sequenceName="SEQ_USERS", allocationSize=1)
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator="seq_users")
    private int userId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "mail")
    private String mail;

    @Column(name = "hashedPassword")
    private int hashedPassword;

    @Column(name = "tempHash")
    private int tempHash;

    @Column(name = "roleId")
    private int roleId;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public int getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(int hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public int getTempHash() {
        return tempHash;
    }

    public void setTempHash(int tempHash) {
        this.tempHash = tempHash;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }
}