package ifba.edu.br.bank_api.controllers;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import ifba.edu.br.bank_api.dtos.UsuarioDTO;
import ifba.edu.br.bank_api.dtos.UsuarioForm;
import ifba.edu.br.bank_api.services.UsuarioService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    private final UsuarioService usuarioService;
    
    public UsuarioController (UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<UsuarioDTO> cadastrar(@RequestBody UsuarioForm form, UriComponentsBuilder uriBuilder) {
        UsuarioDTO novoUsuario = usuarioService.cadastrar(form);
        URI uri = uriBuilder.path("/usuarios/{id}").buildAndExpand(novoUsuario.id()).toUri();
        return ResponseEntity.created(uri).body(novoUsuario);
        
    }

}