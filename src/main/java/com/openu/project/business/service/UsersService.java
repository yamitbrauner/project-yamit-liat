package com.openu.project.business.service;

import com.openu.project.data.entity.Users;
import com.openu.project.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;

    public UsersService() {
    }

    public void createUser(Users user){
         this.userRepository.save(user);
    }

    public Iterable<Users> getUsers() {
        return userRepository.findAll();
    }
}