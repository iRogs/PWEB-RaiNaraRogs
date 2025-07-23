package ifba.edu.br.bank_api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import ifba.edu.br.bank_api.dtos.UsuarioDTO;
import ifba.edu.br.bank_api.dtos.UsuarioForm;
import ifba.edu.br.bank_api.models.Conta;
import ifba.edu.br.bank_api.models.Usuario;
import ifba.edu.br.bank_api.repositories.ContaRepository;
import ifba.edu.br.bank_api.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    @Autowired
    private static UsuarioRepository usuarioRepository;
    @Autowired
    private static ContaRepository contaRepository;

    public UsuarioDTO cadastrar(UsuarioForm form){
        String senhaHash =  new BCryptPasswordEncoder().encode(form.senha());
        Conta conta = new Conta();
        Usuario novoUsuario = new Usuario(form.nome(), form.email(), form.cpf(), senhaHash, conta);
        usuarioRepository.save(novoUsuario);
        contaRepository.save(conta);
        return new UsuarioDTO(novoUsuario);
    }
}
