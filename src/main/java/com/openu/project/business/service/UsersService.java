package com.openu.project.business.service;

import com.openu.project.data.entity.Users;
import com.openu.project.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;

    public UsersService() {
    }

    public void createUser(Users user){
         this.userRepository.save(user);
    }

    public Iterable<Users> getUsers() {
        return userRepository.findAll();
    }

    public void updateUserAutoKey(String email, String autoKey)
    {
        Iterable<Users> users = userRepository.findByMail(email);
        Users myUser = users.iterator().next();
        myUser.setTempHash(autoKey);
        userRepository.save(myUser);
    }
    public String getUserNameByToken(String token)
    {
        // Todo: Fix names as we actually look for email
        Iterable<Users> users = userRepository.findByTempHash(token);
        Users user = users.iterator().next();
        String temHash = user.getTempHash();
        String userName = user.getMail();
        if (temHash.equals(token)) {
            return userName;
        }
        else {
            return null;
        }
    }
}