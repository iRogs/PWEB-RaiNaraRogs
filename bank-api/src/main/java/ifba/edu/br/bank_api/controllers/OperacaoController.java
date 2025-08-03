package ifba.edu.br.bank_api.controllers;

import java.math.BigDecimal;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import ifba.edu.br.bank_api.dtos.OperacaoDTO;
import ifba.edu.br.bank_api.dtos.OperacaoResponseDTO;
import ifba.edu.br.bank_api.entities.Operacao;
import ifba.edu.br.bank_api.entities.TipoOperacao;
import ifba.edu.br.bank_api.entities.Usuario;
import ifba.edu.br.bank_api.services.JWTokenService;
import ifba.edu.br.bank_api.services.OperacaoService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/operacoes")
public class OperacaoController {

    private final OperacaoService operacaoService;

    public OperacaoController(OperacaoService operacaoService, JWTokenService tokenService) {
        this.operacaoService = operacaoService;
    }

    private Usuario getUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Usuario) authentication.getPrincipal();
    }


    @PostMapping("/depositar")
    public ResponseEntity<String> depositar(@RequestBody @Valid OperacaoDTO dto, UriComponentsBuilder uriBuilder) {
        Usuario usuario = getUsuarioLogado();
        String mensagem = operacaoService.depositar(usuario.getConta().getId(), dto.valor());
        URI uri = uriBuilder.path("/operacoes/depositar").build().toUri();
        return ResponseEntity.created(uri).body(mensagem);
    }

    @PostMapping("/sacar")
    public ResponseEntity<String> sacar(@RequestBody @Valid OperacaoDTO dto, UriComponentsBuilder uriBuilder) {
        Usuario usuario = getUsuarioLogado();
        String mensagem = operacaoService.sacar(usuario.getConta().getId(), dto.valor());
        URI uri = uriBuilder.path("/operacoes/sacar").build().toUri();
        return ResponseEntity.created(uri).body(mensagem);
    }

    @GetMapping("/saldo")
    public ResponseEntity<BigDecimal> consultarSaldo() {
        Usuario usuarioLogado = getUsuarioLogado();
        BigDecimal saldo = operacaoService.consultarSaldo(usuarioLogado.getConta().getId());
        return ResponseEntity.ok(saldo);
    }

    @PostMapping("/pagar")
    public ResponseEntity<String> pagar(@RequestBody @Valid OperacaoDTO dto, UriComponentsBuilder uriBuilder) {
        Usuario usuario = getUsuarioLogado();
        String mensagem = operacaoService.pagar(usuario.getConta().getId(), dto.valor(), dto.descricao());
        URI uri = uriBuilder.path("/operacoes/pagar").build().toUri();
        return ResponseEntity.created(uri).body(mensagem);
    }


    @GetMapping("/extrato")
public ResponseEntity<List<OperacaoResponseDTO>> consultarExtrato(
    @RequestParam(required = false) TipoOperacao tipo,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime inicio,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fim
) {
    Usuario usuarioLogado = getUsuarioLogado(); 
    Long contaId = usuarioLogado.getConta().getId(); 

    List<OperacaoResponseDTO> extrato = operacaoService.extrato(contaId, tipo, inicio, fim);
    return ResponseEntity.ok(extrato);
}

}