package ifba.edu.br.bank_api.dtos;

import ifba.edu.br.bank_api.entities.Usuario;

public record UsuarioDTO(Long id, String nome, String email) {

    public UsuarioDTO(Usuario usuario){
        this(usuario.getId(), usuario.getNome(), usuario.getEmail());
    }
    
}