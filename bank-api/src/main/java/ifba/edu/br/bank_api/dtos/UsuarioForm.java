package ifba.edu.br.bank_api.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UsuarioForm( Long id,
@NotBlank(message = "O nome não pode estar em branco.")
String nome,
@Email 
String email,
@NotBlank(message = "O CPF não pode estar em branco.")
String cpf, 
@NotBlank(message = "A senha não pode estar em branco.")
String senha
    ){
    
}