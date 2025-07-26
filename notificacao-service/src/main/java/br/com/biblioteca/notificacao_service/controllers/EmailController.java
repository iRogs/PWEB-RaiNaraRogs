package br.com.biblioteca.notificacao_service.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.biblioteca.notificacao_service.dtos.EmailDTO;
import br.com.biblioteca.notificacao_service.entities.Email;
import br.com.biblioteca.notificacao_service.services.EmailService;

@RestController
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send")
    public ResponseEntity<Email> sendEmail(@RequestBody EmailDTO emailDTO) {
        Email email = emailService.sendEmail(emailDTO);
        return new ResponseEntity<>(email, HttpStatus.CREATED);
    }
}