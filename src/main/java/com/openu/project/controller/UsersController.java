package com.openu.project.controller;

import com.openu.project.business.domain.CreateNewUserDto;
import com.openu.project.business.domain.UpdateUserDto;
import com.openu.project.business.service.UsersService;
import com.openu.project.data.entity.Users;
import com.openu.project.exception.ApiGatewayException;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PutMapping("/user/{userId}/updateUserDetail")
    public void updateUser(@RequestBody UpdateUserDto user,
                                                         @PathVariable("userId") Integer userId) throws ApiGatewayException {
        userService.updateUser(user, userId);
    }


}