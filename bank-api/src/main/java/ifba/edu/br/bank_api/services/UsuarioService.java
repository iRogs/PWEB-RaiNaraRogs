package ifba.edu.br.bank_api.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ifba.edu.br.bank_api.Client.EmailDTO;
import ifba.edu.br.bank_api.Client.EmailClient;
import ifba.edu.br.bank_api.dtos.UsuarioDTO;
import ifba.edu.br.bank_api.dtos.UsuarioForm;
import ifba.edu.br.bank_api.entities.Conta;
import ifba.edu.br.bank_api.entities.Usuario;
import ifba.edu.br.bank_api.repositories.ContaRepository;
import ifba.edu.br.bank_api.repositories.UsuarioRepository;
import jakarta.transaction.Transactional;

@Service
public class UsuarioService implements UserDetailsService{
    private final UsuarioRepository usuarioRepository;
    private final ContaRepository contaRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailClient emailService;

    public UsuarioService(
        UsuarioRepository usuarioRepository,
        ContaRepository contaRepository,
        PasswordEncoder passwordEncoder,
        EmailClient emailService) {

        this.usuarioRepository = usuarioRepository;
        this.contaRepository = contaRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    @Transactional
    public UsuarioDTO cadastrar(UsuarioForm form){
        String senhaHash = passwordEncoder.encode(form.senha());
        Conta conta = new Conta();
        conta.setAgencia("0001");
        conta.setSaldo(BigDecimal.ZERO);
        contaRepository.save(conta);
        Usuario novoUsuario = new Usuario(form.nome(), form.email(), form.cpf(), senhaHash, conta, LocalDateTime.now());
        conta.setUsuario(novoUsuario); 
        usuarioRepository.save(novoUsuario);

        enviarEmailBoasVindas(novoUsuario);

        return new UsuarioDTO(novoUsuario);
    }

    private void enviarEmailBoasVindas(Usuario usuario) {
        EmailDTO email = new EmailDTO(
            "no-reply@bank.com",
            usuario.getEmail(),
            "Bem-vindo ao nosso banco!",
            "Olá " + usuario.getNome() + ",\n\n" +
            "Sua conta foi criada com sucesso!\n" +
            "Número da conta: " + usuario.getConta() + "\n" +
            "Agência: " + usuario.getConta().getAgencia() + "\n\n" +
            "Obrigado por se cadastrar."
        );

        emailService.sendEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = usuarioRepository.findByEmail(username);
        if (user == null) {
            // Esta exceção é exigida pelo contrato do Spring Security
            throw new UsernameNotFoundException("Dados de login inválidos!");
        }
        return user;
    }

}