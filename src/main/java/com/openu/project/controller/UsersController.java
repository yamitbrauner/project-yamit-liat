package com.openu.project.controller;

import com.openu.project.business.domain.CreateNewUserDto;
import com.openu.project.business.domain.UpdateUserDto;
import com.openu.project.business.domain.UpdateUserResponse;
import com.openu.project.business.service.UsersService;
import com.openu.project.data.entity.Users;
import com.openu.project.exception.UpdateTable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UsersController {
    @Autowired
    private UsersService userService;

    @GetMapping("/admin/getAllUsers")
    public Iterable<Users> getUser() {
        return this.userService.getUsers();
    }

    @PostMapping("/public/createNewUser")
    public void createUser(@RequestBody CreateNewUserDto newUser) {
        userService.createUser(newUser);
    }

    // TODO: Update per user control
    @PutMapping("/user/{userId}/updateUserDetail")
    public ResponseEntity<UpdateUserResponse> updateUser(@RequestBody UpdateUserDto user,
                                                         @PathVariable("userId") Integer userId) throws UpdateTable {
        return userService.updateUser(user, userId);
    }


}