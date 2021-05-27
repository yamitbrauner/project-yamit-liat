package com.openu.project.controller;

import com.openu.project.business.service.RoleService;
import com.openu.project.data.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {
    @Autowired
    private RoleService roleService;

    @GetMapping("/admin/getAllRoles")
    public Iterable<Role> getRole() {
        return this.roleService.getRole();
    }
}