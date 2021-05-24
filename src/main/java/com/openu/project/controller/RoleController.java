package com.openu.project.controller;

import com.openu.project.business.service.RoleService;
import com.openu.project.business.service.payPalPayment.GetPayPalOrder;
import com.openu.project.data.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {
    @Autowired
    private RoleService roleService;
    @Autowired
    private GetPayPalOrder getPayPalOrder;

    @GetMapping("/role")
    public Iterable<Role> getRole() {
        try {
            this.getPayPalOrder.getOrder("5FJ16367U1292733B");
        }catch (Exception e)
        {
            System.out.println(e);
        }

        return this.roleService.getRole();
    }
}