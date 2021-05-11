package com.openu.project.business.service;

import com.openu.project.business.domain.CreateNewUserDto;
import com.openu.project.business.domain.CreateNewUserResponse;
import com.openu.project.data.entity.Product;
import com.openu.project.data.entity.Users;
import com.openu.project.data.repository.UserRepository;
import com.openu.project.exception.ResourceNotFoundException;
import com.openu.project.exception.UpdateTable;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.util.Iterator;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsersService() {
    }

    public ResponseEntity<CreateNewUserResponse> createUser(CreateNewUserDto newUserDto){

        CreateNewUserResponse bodyResponse = new CreateNewUserResponse();
        boolean fail = false;

        // Check if mail is in use
        bodyResponse.setMailOk(true);
        Iterator<Users> usersIterator = this.userRepository.findByMail(newUserDto.getMail()).iterator();
        if (usersIterator.hasNext())
        {
            bodyResponse.setMailOk(false);
            fail = true;
        }

        // Check if mail format is crrect
        try {
            InternetAddress emailAddr = new InternetAddress(newUserDto.getMail());
            emailAddr.validate();
        } catch (AddressException ex) {
            fail = true;
            bodyResponse.setMailOk(false);
        }

        // check Password isnt empty and at least 4 char
        bodyResponse.setPasswordOk(true);
        if(newUserDto.getPassword().length() < 4)
        {
            fail = true;
            bodyResponse.setPasswordOk(false);
        }

        // check firstname not null
        bodyResponse.setFirstNameOk(true);
        if(newUserDto.getFirstName().length() <= 0)
        {
            fail = true;
            bodyResponse.setFirstNameOk(false);
        }

        // check lastname not null
        bodyResponse.setLastNameOk(true);
        if(newUserDto.getLastName().length()  <= 0)
        {
            fail = true;
            bodyResponse.setLastNameOk(false);
        }


        if(fail) return ResponseEntity.badRequest().body(bodyResponse);

        Users newUser = new Users();
        newUser.setFirstName(newUserDto.getFirstName());
        newUser.setLastName(newUserDto.getLastName());
        newUser.setMail(newUserDto.getMail());
        newUser.setPhone(newUserDto.getPhone());
        newUser.setAddress(newUserDto.getAddress());
        newUser.setRoleId(2);

        String hashedPassword = passwordEncoder.encode(newUserDto.getPassword());
        newUser.setHashedPassword(hashedPassword);
        newUser.setToken("");
            this.userRepository.save(newUser);
        return ResponseEntity.ok().body(bodyResponse);
    }

    public Iterable<Users> getUsers() {         return userRepository.findAll();
    }

    public void updateUserAutoKey(String email, String autoKey)
    {
        Iterable<Users> users = userRepository.findByMail(email);
        Users myUser = users.iterator().next();
        myUser.setToken(autoKey);
        userRepository.save(myUser);
    }

    public Users getUserByMail(String mail)
    {
        return userRepository.findByMail(mail).iterator().next();
    }

    public String getMailByUserId(Integer userId)
    {
        Users user =  userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException());
        return user.getMail();
    }

    public String getUserNameByToken(String token)
    {
        // Todo: Fix names as we actually look for email
        Iterable<Users> users = userRepository.findByToken(token);
        Users user = users.iterator().next();
        String tempToken = user.getToken();
        String userName = user.getMail();
        if (tempToken.equals(token)) {
            return userName;
        }
        else {
            return null;
        }
    }

    public void updateUser(Users users, Integer userId) throws UpdateTable {
        Users userOld = userRepository.findByUserId(userId);
        if (userOld == null) throw new UpdateTable();
        fillNewUserToOld(userOld, users);
        userRepository.save(userOld);
    }

    private void fillNewUserToOld(Users userOld, Users userNew) {

        userOld.setFirstName(userNew.getFirstName());
        userOld.setLastName(userNew.getLastName());
        userOld.setPhone(userNew.getPhone());
        userOld.setAddress(userNew.getAddress());
    }
}