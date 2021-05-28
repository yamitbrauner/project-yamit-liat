package com.openu.project.business.service;

import com.openu.project.business.domain.ProductsForCart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.thymeleaf.templateresolver.ITemplateResolver;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Properties;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender emailSender;
    @Autowired
    public SimpleMailMessage template;
    @Autowired
    private SpringTemplateEngine springTemplateEngine;

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

    public void sendConfirmationMailMime(String to, String text, Integer reservationId) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper =
                new MimeMessageHelper(message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

        helper.setFrom("motkli.matok@gmail.com");
        helper.setTo(to);

        String subject = "Your order #" + reservationId + " @MatokLi has been confirmed";
        helper.setSubject(subject);
        helper.setText(text, true);
        emailSender.send(message);
    }

    //template
    @Bean
    public SimpleMailMessage templateReservation() {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setText(
                "Hi.\nYour reservation number %s has been submitted successfully.\n" +
                        "For more details, please check your personal zone.\n");
        return message;
    }

    //emailSender
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);

        mailSender.setUsername(System.getenv("USERNAME_MATOKLI"));
        mailSender.setPassword(System.getenv("PASS_MATOKLI"));

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }

    public void sendMessageUsingThymeleafTemplate(
            String to, ArrayList<ProductsForCart> products, String firstName, Integer reservationId)
            throws MessagingException {

        HashMap<String, Object> templateModel = new HashMap<String, Object>();

        templateModel.put("recipientName",firstName);
        templateModel.put("products", products);

        Context thymeleafContext = new Context();
        thymeleafContext.setVariables(templateModel);
        String htmlBody = springTemplateEngine.process("ReservationConfirmMailTemplate", thymeleafContext);

        sendConfirmationMailMime(to, htmlBody, reservationId);
    }

}