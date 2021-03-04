package com.openu.project.Controller;

import com.openu.project.data.entity.User;
import com.openu.project.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
      private UserRepository userRepository;

    @GetMapping("/user")
    public Iterable<User> getUser() {
         return this.userRepository.findAll();
     }
}
