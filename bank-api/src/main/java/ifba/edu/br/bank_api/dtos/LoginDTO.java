package ifba.edu.br.bank_api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record LoginDTO(
    @Email(message = "Por favor informe um email válido")
    String email,

    @NotNull(message = "A senha não pode ser nula")
    String senha) {
}