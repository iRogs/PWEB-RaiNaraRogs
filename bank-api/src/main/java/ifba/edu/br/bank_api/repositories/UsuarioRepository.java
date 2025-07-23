package ifba.edu.br.bank_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ifba.edu.br.bank_api.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
