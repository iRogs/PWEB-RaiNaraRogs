package ifba.edu.br.bank_api.services;

import java.math.BigDecimal;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ifba.edu.br.bank_api.dtos.UsuarioDTO;
import ifba.edu.br.bank_api.dtos.UsuarioForm;
import ifba.edu.br.bank_api.models.Conta;
import ifba.edu.br.bank_api.models.Usuario;
import ifba.edu.br.bank_api.repositories.ContaRepository;
import ifba.edu.br.bank_api.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final ContaRepository contaRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, ContaRepository contaRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.contaRepository = contaRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioDTO cadastrar(UsuarioForm form){
        String senhaHash =  new BCryptPasswordEncoder().encode(form.senha());
        Conta conta = new Conta();
        conta.setAgencia("0001");
        conta.setSaldo(BigDecimal.ZERO);
        contaRepository.save(conta);

        Usuario novoUsuario = new Usuario(form.nome(), form.email(), form.cpf(), senhaHash, conta);
        usuarioRepository.save(novoUsuario);
        //noticifacaoClient.sendEmail(email de boas vindas)
        return new UsuarioDTO(novoUsuario);
    }


}
