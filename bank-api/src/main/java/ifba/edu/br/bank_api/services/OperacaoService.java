package ifba.edu.br.bank_api.services;

import ifba.edu.br.bank_api.Client.EmailClient;
import ifba.edu.br.bank_api.Client.EmailDTO;
import ifba.edu.br.bank_api.dtos.OperacaoResponseDTO;
import ifba.edu.br.bank_api.entities.Conta;
import ifba.edu.br.bank_api.entities.Operacao;
import ifba.edu.br.bank_api.entities.TipoOperacao;
import ifba.edu.br.bank_api.repositories.ContaRepository;
import ifba.edu.br.bank_api.repositories.OperacaoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Service
public class OperacaoService {

    private final ContaRepository contaRepository;
    private final OperacaoRepository operacaoRepository;
    private final EmailClient emailService;

    public OperacaoService(ContaRepository contaRepository, OperacaoRepository operacaoRepository, EmailClient emailService) {
        this.contaRepository = contaRepository;
        this.operacaoRepository = operacaoRepository;
        this.emailService = emailService;
    }

    private void salvarOperacao(Conta conta, TipoOperacao tipo, BigDecimal valor, String descricao) {
        Operacao operacao = new Operacao();
        operacao.setConta(conta);
        operacao.setTipo(tipo);
        operacao.setValor(valor);
        operacao.setDescricao(descricao);
        operacao.setData(LocalDateTime.now());
        operacaoRepository.save(operacao);
    }

    public BigDecimal consultarSaldo(Long id) {
        Conta conta = findAccount(id);
        return conta.getSaldo();
    }

    public String depositar(Long accountId, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do depósito deve ser maior que zero.");
        }

        Conta conta = findAccount(accountId);
        conta.setSaldo(conta.getSaldo().add(amount));
        contaRepository.save(conta);

        salvarOperacao(conta, TipoOperacao.DEPOSITO, amount, "Depósito em conta");
        enviarEmail(conta, "Depósito", amount);

        return "Depósito realizado com sucesso. Novo saldo: R$ " + conta.getSaldo();
    }

    public String sacar(Long accountId, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do saque deve ser maior que zero.");
        }

        Conta conta = findAccount(accountId);
        if (conta.getSaldo().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente para saque.");
        }

        conta.setSaldo(conta.getSaldo().subtract(amount));
        contaRepository.save(conta);

        salvarOperacao(conta, TipoOperacao.SAQUE, amount, "Valor retirado da conta");
        enviarEmail(conta, "Saque", amount);

        return "Saque realizado com sucesso. Novo saldo: R$ " + conta.getSaldo();
    }

    public String pagar(Long contaId, BigDecimal valor, String descricao) {
    if (valor == null || valor.compareTo(BigDecimal.ZERO) <= 0) {
        throw new IllegalArgumentException("O valor do pagamento deve ser maior que zero.");
    }

    Conta conta = findAccount(contaId);

    if (conta.getSaldo().compareTo(valor) < 0) {
        throw new IllegalArgumentException("Saldo insuficiente para pagamento.");
    }

    conta.setSaldo(conta.getSaldo().subtract(valor));
    contaRepository.save(conta);

    salvarOperacao(conta, TipoOperacao.PAGAMENTO, valor, descricao);
    enviarEmail(conta, "Pagamento: " + descricao, valor);

    return "Pagamento '" + descricao + "' realizado com sucesso. Novo saldo: R$ " + conta.getSaldo();
    }

     public Page<OperacaoResponseDTO> extrato(Long accountId, TipoOperacao tipo, LocalDateTime inicio, LocalDateTime fim, Pageable pageable) {
        Conta conta = findAccount(accountId);
  
        Page<Operacao> operacoes;

        if (tipo != null) {
            operacoes = operacaoRepository.findByContaAndTipoAndDataBetween(conta, tipo, inicio, fim, pageable);
        } else {
            operacoes = operacaoRepository.findByContaAndDataBetween(conta, inicio, fim, pageable);
        }

        return operacoes.map(OperacaoResponseDTO::new);
    }


    private Conta findAccount(Long accountId) {
        return contaRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));
    }

    private void enviarEmail(Conta conta, String operacao, BigDecimal valor) {

        EmailDTO email = new EmailDTO("rbrodrigo3@gmail.com",
                conta.getEmail(),
                operacao + " Realizado com Sucesso",
                "Olá " + conta.getUserAccountName() + ",\n\n" +
                operacao + " de R$ " + valor + " realizado com sucesso.\n" +
                "Saldo atual: R$ " + conta.getSaldo());
        emailService.sendEmail(email);
    }

}