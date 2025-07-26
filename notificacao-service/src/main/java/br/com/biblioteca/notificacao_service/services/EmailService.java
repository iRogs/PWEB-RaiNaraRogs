package br.com.biblioteca.notificacao_service.services;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import br.com.biblioteca.notificacao_service.dtos.EmailDTO;
import br.com.biblioteca.notificacao_service.entities.Email;
import br.com.biblioteca.notificacao_service.entities.EmailStatus;
import br.com.biblioteca.notificacao_service.repositories.EmailRepository;

import java.time.LocalDateTime;

@Service
public class EmailService {

    private final EmailRepository emailRepository;
    private final JavaMailSender emailSender;

    public EmailService(EmailRepository emailRepository, JavaMailSender emailSender) {
        this.emailRepository = emailRepository;
        this.emailSender = emailSender;
    }

    public Email sendEmail(EmailDTO emailDTO) {
        Email email = new Email();
        // ... (copie os dados do DTO para a entidade)
        email.setSendDateEmail(LocalDateTime.now());
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(emailDTO.mailFrom());
            message.setTo(emailDTO.mailTo());
            message.setSubject(emailDTO.mailSubject());
            message.setText(emailDTO.mailText());
            emailSender.send(message);
            email.setStatus(EmailStatus.SENT);
        } catch (Exception e) {
            email.setStatus(EmailStatus.ERROR);
        } finally {
            emailRepository.save(email);
        }
        return email;
    }
}