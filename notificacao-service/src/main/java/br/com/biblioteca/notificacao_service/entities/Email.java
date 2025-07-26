package br.com.biblioteca.notificacao_service.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "emails")
public class Email {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mailFrom;
    private String mailTo;
    private String mailSubject;
    @Column(columnDefinition = "TEXT")
    private String mailText;
    private LocalDateTime sendDateEmail;
    @Enumerated(EnumType.STRING)
    private EmailStatus status;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getMailFrom() {
        return mailFrom;
    }
    public void setMailFrom(String mailFrom) {
        this.mailFrom = mailFrom;
    }
    public String getMailTo() {
        return mailTo;
    }
    public void setMailTo(String mailTo) {
        this.mailTo = mailTo;
    }
    public String getMailSubject() {
        return mailSubject;
    }
    public void setMailSubject(String mailSubject) {
        this.mailSubject = mailSubject;
    }
    public String getMailText() {
        return mailText;
    }
    public void setMailText(String mailText) {
        this.mailText = mailText;
    }
    public LocalDateTime getSendDateEmail() {
        return sendDateEmail;
    }
    public void setSendDateEmail(LocalDateTime sendDateEmail) {
        this.sendDateEmail = sendDateEmail;
    }
    public EmailStatus getStatus() {
        return status;
    }
    public void setStatus(EmailStatus status) {
        this.status = status;
    }

    
    
}