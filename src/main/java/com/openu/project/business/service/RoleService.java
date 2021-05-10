package com.openu.project.business.service;

import com.openu.project.data.entity.Role;
import com.openu.project.data.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    RoleRepository roleRepository;

        public Iterable<Role> getRole() { return roleRepository.findAll();
    }
}