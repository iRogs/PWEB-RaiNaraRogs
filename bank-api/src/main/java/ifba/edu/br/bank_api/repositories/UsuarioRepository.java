package ifba.edu.br.bank_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ifba.edu.br.bank_api.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    public Usuario findByEmail(String email);
    
}
