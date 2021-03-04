package com.openu.project.Controller;

import com.openu.project.data.entity.UserInformation;
import com.openu.project.data.repository.UserInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInformationController {
    @Autowired
      private UserInformationRepository userInformationRepository;

    @GetMapping("/userInformation")
    public Iterable<UserInformation> getUserInformation() {
        return this.userInformationRepository.findAll();
    }
}
