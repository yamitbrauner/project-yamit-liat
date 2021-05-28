package com.openu.project.business.service;

import com.openu.project.business.domain.CreateNewUserDto;
import com.openu.project.business.domain.UpdateUserDto;
import com.openu.project.business.domain.UpdateUserResponse;
import com.openu.project.data.entity.Users;
import com.openu.project.data.repository.UserRepository;
import com.openu.project.exception.ResourceNotFoundException;
import com.openu.project.exception.UpdateTable;
import com.openu.project.exception.exceptionsList.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import java.util.Iterator;

@Service
public class UsersService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsersService() {
    }

    public void createUser(CreateNewUserDto newUserDto){

        // Check if mail is in use
        Iterator<Users> usersIterator = this.userRepository.findByMail(newUserDto.getMail()).iterator();
        if (usersIterator.hasNext())
        {
            throw new UserMailAlreadyExist();
        }

        // Check if mail format is crrect
        try {
            InternetAddress emailAddr = new InternetAddress(newUserDto.getMail());
            emailAddr.validate();
        } catch (AddressException ex) {
            throw new WrongMailFormat();
        }

        // check Password isnt empty and at least 4 char
        if(newUserDto.getPassword().length() < 4)
        {
            throw new WrongPasswordFormat();
        }

        // check firstname not null
        if(newUserDto.getFirstName().length() <= 0)
        {
            throw new EmptyFirstName();
        }

        // check lastname not null
        if(newUserDto.getLastName().length()  <= 0)
        {
            throw new EmptyLastName();
        }

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

    public String getFirstNameByUserId(Integer userId)
    {
        Users user =  userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException());
        return user.getFirstName();
    }

    public Users getUserDetailsByToken(String token)
    {
        // Todo: Fix names as we actually look for email
        Iterable<Users> users = userRepository.findByToken(token);
        if(!users.iterator().hasNext()) return null;
        Users user = users.iterator().next();
        return user;
    }

    public ResponseEntity<UpdateUserResponse> updateUser(UpdateUserDto user, Integer userId) throws UpdateTable {
        Users userOld = userRepository.findByUserId(userId);
        UpdateUserResponse response = new UpdateUserResponse();
        if (userOld == null) throw new UpdateTable();
        fillNewUserToOld(userOld, user, response);

        if (!response.allOk()) return ResponseEntity.badRequest().body(response);


        // TODO: Add try catch
        userRepository.save(userOld);
        return ResponseEntity.ok().body(response);

    }

    private void fillNewUserToOld(Users userOld, UpdateUserDto userNew, UpdateUserResponse resBody) {

        resBody.setFirstNameOk(true);
        if(userNew.getFirstName().length()  <= 0)
        {
            resBody.setFirstNameOk(false);
        }

        resBody.setLastNameOk(true);
        if(userNew.getLastName().length()  <= 0)
        {
            resBody.setLastNameOk(false);
        }

        resBody.setPhoneOk(true);
        if(userNew.getPhone().length()  <= 0)
        {
            resBody.setPhoneOk(false);
        }

        resBody.setAddressOk(true);
        if(userNew.getAddress().length()  <= 0)
        {
            resBody.setAddressOk(false);
        }

        userOld.setFirstName(userNew.getFirstName());
        userOld.setLastName(userNew.getLastName());
        userOld.setPhone(userNew.getPhone());
        userOld.setAddress(userNew.getAddress());
    }
}