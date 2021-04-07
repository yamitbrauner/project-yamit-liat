package com.openu.project.business.service;

import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.User;
import com.openu.project.data.repository.CategoryRepository;
import com.openu.project.data.repository.ProductRepository;
import com.openu.project.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService() {
    }

    public void createUser(User user){
         this.userRepository.save(user);
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }
}