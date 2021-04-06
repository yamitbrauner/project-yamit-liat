package com.openu.project.Controller;

import com.openu.project.business.service.RoleService;
import com.openu.project.data.entity.Role;
import com.openu.project.data.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {
    @Autowired
      private RoleService roleService;

    @GetMapping("/role")
    public Iterable<Role> getRole() {
         return this.roleService.findAll();
    }
}
