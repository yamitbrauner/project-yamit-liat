package com.openu.project.Controller;

import com.openu.project.business.service.UserService;
import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.User;
import com.openu.project.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
      private UserService userService;

    @GetMapping("/user")
    public Iterable<User> getUser() {
         return this.userService.getUsers();
     }

    @PostMapping("/user")
    public void createUser(@RequestBody User newUser) {
        userService.createUser(newUser);
    }
}