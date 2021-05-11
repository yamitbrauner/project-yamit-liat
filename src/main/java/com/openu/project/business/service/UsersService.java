package com.openu.project.business.service;

import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Users;
import com.openu.project.data.repository.UserRepository;
import com.openu.project.exception.ResourceNotFoundException;
import com.openu.project.exception.UpdateTable;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;

    public UsersService() {
    }

    public void createUser(Users user){
        //TODO: if mail already exist return exception

        this.userRepository.save(user);
    }

    public Iterable<Users> getUsers() {         return userRepository.findAll();
    }

    public void updateUserAutoKey(String email, String autoKey)
    {
        Iterable<Users> users = userRepository.findByMail(email);
        Users myUser = users.iterator().next();
        myUser.setToken(autoKey);
        userRepository.save(myUser);
    }

    public Users getUserByMail(String mail)
    {
        return userRepository.findByMail(mail).iterator().next();
    }

    public String getMailByUserId(Integer userId)
    {
        Users user =  userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException());
        return user.getMail();
    }

    public String getUserNameByToken(String token)
    {
        // Todo: Fix names as we actually look for email
        Iterable<Users> users = userRepository.findByToken(token);
        Users user = users.iterator().next();
        String tempToken = user.getToken();
        String userName = user.getMail();
        if (tempToken.equals(token)) {
            return userName;
        }
        else {
            return null;
        }
    }

    public void updateUser(Users users, Integer userId) throws UpdateTable {
        Users userOld = userRepository.findByUserId(userId);
        if (userOld == null) throw new UpdateTable();
        fillNewUserToOld(userOld, users);
        userRepository.save(userOld);
    }

    private void fillNewUserToOld(Users userOld, Users userNew) {

        userOld.setFirstName(userNew.getFirstName());
        userOld.setLastName(userNew.getLastName());
        userOld.setPhone(userNew.getPhone());
        userOld.setAddress(userNew.getAddress());
    }
}