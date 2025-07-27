package ifba.edu.br.bank_api.controllers;

import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import ifba.edu.br.bank_api.dtos.LoginDTO;
import ifba.edu.br.bank_api.dtos.UsuarioDTO;
import ifba.edu.br.bank_api.dtos.UsuarioForm;
import ifba.edu.br.bank_api.dtos.LoginResponseDTO; 
import ifba.edu.br.bank_api.entities.Usuario;
import ifba.edu.br.bank_api.services.JWTokenService;
import ifba.edu.br.bank_api.services.UsuarioService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final JWTokenService tokenService;
    
    public UsuarioController (UsuarioService usuarioService, AuthenticationManager authenticationManager, JWTokenService tokenService){
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDTO> cadastrar(@RequestBody UsuarioForm form, UriComponentsBuilder uriBuilder) {
        UsuarioDTO novoUsuario = usuarioService.cadastrar(form);
        URI uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(novoUsuario.id()).toUri();
        return ResponseEntity.created(uri).body(novoUsuario);
    }

    
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginDTO dto){
        var authenticationToken = new UsernamePasswordAuthenticationToken(dto.email(), dto.senha());
        var authentication = authenticationManager.authenticate(authenticationToken);
        var usuarioAutenticado = (Usuario) authentication.getPrincipal();
        var tokenJWT = tokenService.gerarToken(usuarioAutenticado);
        var usuarioDTO = new UsuarioDTO(usuarioAutenticado);
        return ResponseEntity.ok(new LoginResponseDTO(tokenJWT, usuarioDTO));
    }
}