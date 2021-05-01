package com.openu.project.Controller;

import com.openu.project.business.service.UsersService;
import com.openu.project.data.entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UsersController {
    @Autowired
      private UsersService userService;

    @GetMapping("/user")
    public Iterable<Users> getUser() {
         return this.userService.getUsers();
     }

    @PostMapping("/user")
    public void createUser(@RequestBody Users newUser) {
        userService.createUser(newUser);
    }


}