package com.openu.project.business.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class MatokLiEmailService{
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    public SimpleMailMessage template;

    public void sendSimpleMessage(
            String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("motkli.matok@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }


    public void sendSimpleConfirmationMail(
                String to, Integer reservationId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("motkli.matok@gmail.com");
        message.setTo(to);

        String subject = "Your order @MatokLi has been confirmed";
        message.setSubject(subject);
        String text = String.format(template.getText(), reservationId);
        message.setText(text);
        emailSender.send(message);
    }

    @Bean
    public SimpleMailMessage templateReservation() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText(
                "Hi.\nYour reservation %s has been submitted successfully.\n" +
                        "For more details, please check your personal zone.\n");
        return message;
    }


    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername("matokli.matok@gmail.com");
        mailSender.setPassword("Aa12345678!");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

}
