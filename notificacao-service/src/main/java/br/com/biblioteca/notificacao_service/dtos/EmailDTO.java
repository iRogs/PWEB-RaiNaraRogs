package br.com.biblioteca.notificacao_service.dtos;

public record EmailDTO(
    String mailFrom,
    String mailTo,
    String mailSubject,
    String mailText
) {
}