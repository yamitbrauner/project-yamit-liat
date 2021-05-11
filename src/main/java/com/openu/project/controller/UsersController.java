package com.openu.project.controller;

import com.openu.project.business.service.UsersService;
import com.openu.project.data.entity.Users;
import com.openu.project.exception.UpdateTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsersController {
    @Autowired
      private UsersService userService;

    @GetMapping("/users")
    public Iterable<Users> getUser() {
         return this.userService.getUsers();
     }

    @PostMapping("/createUser")
    public void createUser(@RequestBody Users newUser) {
        userService.createUser(newUser);
    }

        @PutMapping("/users/{userId}")
        public void updateUser(@RequestBody Users users,
                @PathVariable("userId") Integer userId) throws UpdateTable {
            userService.updateUser(users, userId);
        }


}