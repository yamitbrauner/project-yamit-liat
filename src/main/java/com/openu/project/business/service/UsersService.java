package com.openu.project.business.service;

import com.openu.project.business.domain.CreateNewUserDto;
import com.openu.project.business.domain.UpdateUserDto;
import com.openu.project.data.entity.Users;
import com.openu.project.data.repository.UserRepository;
import com.openu.project.exception.ApiGatewayException;
import com.openu.project.exception.exceptionsList.*;

import org.springframework.beans.factory.annotation.Autowired;
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
            throw new BadFirstName();
        }

        // check lastname not null
        if(newUserDto.getLastName().length()  <= 0)
        {
            throw new BadLastName();
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

    public Iterable<Users> getUsers() { return userRepository.findAll(); }

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

    public String getMailByUserId(Integer userId) throws ApiGatewayException
    {
        Users user =  userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUser());
        return user.getMail();
    }

    public String getFirstNameByUserId(Integer userId) throws ApiGatewayException
    {
        Users user =  userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUser());
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

    public void updateUser(UpdateUserDto user, Integer userId) throws ApiGatewayException {
        Users userOld = userRepository.findByUserId(userId);
        if (userOld == null) throw new NoSuchUser();
        fillNewUserToOld(userOld, user);
        userRepository.save(userOld);
    }

    private void fillNewUserToOld(Users userOld, UpdateUserDto userNew) throws ApiGatewayException {

        if(userNew.getFirstName().length()  <= 0)
        {
            throw new BadFirstName();
        }

        if(userNew.getLastName().length()  <= 0)
        {
            throw new BadLastName();
        }

        if(userNew.getPhone().length()  <= 0)
        {
            throw new BadPhoneNumber();
        }


        if(userNew.getAddress().length()  <= 0)
        {
            throw new BadAddress();
        }

        userOld.setFirstName(userNew.getFirstName());
        userOld.setLastName(userNew.getLastName());
        userOld.setPhone(userNew.getPhone());
        userOld.setAddress(userNew.getAddress());
    }
}