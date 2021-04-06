package com.openu.project.business.service;

import com.openu.project.data.entity.UserInformation;
import com.openu.project.data.repository.UserInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInformationService {
    @Autowired
    UserInformationRepository userInformationRepository;

    public Iterable<UserInformation> findAll() {
        return userInformationRepository.findAll();
    }
}