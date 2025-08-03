package com.shouldibunk.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Async
    public void sendPasswordResetEmail(String toEmail, String token) {
        String frontendUrl = System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:5173");
        String resetUrl = frontendUrl + "/reset-password/" + token;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("contact.kishanraj@gmail.com");
        message.setTo(toEmail);
        message.setSubject("Password Reset Request for 'Should I Bunk?'");
        message.setText("To reset your password, please click the link below:\n\n"
                        + resetUrl + "\n\n"
                        + "If you did not request this, please ignore this email.");

        mailSender.send(message);
    }
}
