package ifba.edu.br.bank_api.Client;

public record EmailDTO(
    String mailFrom,
    String mailTo,
    String mailSubject,
    String mailText) {
    
}
