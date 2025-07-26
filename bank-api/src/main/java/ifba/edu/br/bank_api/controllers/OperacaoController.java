package ifba.edu.br.bank_api.controllers;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import ifba.edu.br.bank_api.dtos.OperacaoDTO;
import ifba.edu.br.bank_api.services.OperacaoService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/operacoes")
public class OperacaoController {

    private final OperacaoService operacaoService;

    public OperacaoController(OperacaoService operacaoService) {
        this.operacaoService = operacaoService;
    }

    @PostMapping("/depositar")
    public ResponseEntity<String> depositar(@RequestBody @Valid OperacaoDTO dto, UriComponentsBuilder uriBuilder) {
        String mensagem = operacaoService.depositar(dto.getContaId(), dto.getValor());
        URI uri = uriBuilder.path("/operacoes/depositar").build().toUri();
        return ResponseEntity.created(uri).body(mensagem);
    }

    @PostMapping("/sacar")
    public ResponseEntity<String> sacar(@RequestBody @Valid OperacaoDTO dto, UriComponentsBuilder uriBuilder) {
        String mensagem = operacaoService.sacar(dto.getContaId(), dto.getValor());
        URI uri = uriBuilder.path("/operacoes/sacar").build().toUri();
        return ResponseEntity.created(uri).body(mensagem);
    }

    @PostMapping("/pagar")
    public ResponseEntity<String> pagar(@RequestBody @Valid OperacaoDTO dto, UriComponentsBuilder uriBuilder) {
        String mensagem = operacaoService.pagar(dto.getContaId(), dto.getValor(), dto.getDescricao());
        URI uri = uriBuilder.path("/operacoes/pagar").build().toUri();
        return ResponseEntity.created(uri).body(mensagem);
    }
    
}