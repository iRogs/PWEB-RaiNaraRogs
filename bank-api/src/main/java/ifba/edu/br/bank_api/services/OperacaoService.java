package ifba.edu.br.bank_api.services;

import ifba.edu.br.bank_api.models.Conta;
import ifba.edu.br.bank_api.models.Operacao;
import ifba.edu.br.bank_api.models.TipoOperacao;
import ifba.edu.br.bank_api.repositories.ContaRepository;
import ifba.edu.br.bank_api.repositories.OperacaoRepository;
import ifba.edu.br.bank_api.services.email.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OperacaoService {

    private final ContaRepository contaRepository;
    private final OperacaoRepository operacaoRepository;
    private final EmailService emailService;
    

   

    public OperacaoService(ContaRepository contaRepository, OperacaoRepository operacaoRepository) {
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

    public String depositar(Long accountId, BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do depósito deve ser maior que zero.");
        }

        Conta conta = findAccount(accountId);
        conta.setSaldo(conta.getSaldo().add(amount));
        contaRepository.save(conta);

        salvarOperacao(conta, TipoOperacao.DEPOSITO, amount, "Depósito");
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

        salvarOperacao(conta, TipoOperacao.SAQUE, amount, "Saque");
        enviarEmail(conta, "Saque", amount);

        return "Saque realizado com sucesso. Novo saldo: R$ " + conta.getSaldo();
    }

    public String pagar(Long accountId, BigDecimal amount, String descricao) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do pagamento deve ser maior que zero.");
        }

        Conta conta = findAccount(accountId);

        if (conta.getSaldo().compareTo(amount) < 0) {
            throw new IllegalArgumentException("Saldo insuficiente para pagamento.");
        }

        conta.setSaldo(conta.getSaldo().subtract(amount));
        contaRepository.save(conta);
        salvarOperacao(conta, TipoOperacao.PAGAMENTO, amount, descricao);
        enviarEmail(conta, "Pagamento: " + descricao, amount);

        return "Pagamento realizado com sucesso. Novo saldo: R$ " + conta.getSaldo();
    }

    public List<Operacao> extrato(Long accountId, TipoOperacao tipo, LocalDateTime inicio, LocalDateTime fim) {
        Conta conta = findAccount(accountId);

        if (tipo != null) {
            return operacaoRepository.findByContaAndTipoAndDataBetween(conta, tipo, inicio, fim);
        } else {
            return operacaoRepository.findByContaAndDataBetween(conta, inicio, fim);
        }
    }

    private Conta findAccount(Long accountId) {
        return contaRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Conta não encontrada."));
    }

    private void enviarEmail(Conta conta, String operacao, BigDecimal valor) {
        emailService.sendEmail(
                conta.getEmail(),
                operacao + " Realizado com Sucesso",
                "Olá " + conta.getUserAccountName() + ",\n\n" +
                operacao + " de R$ " + valor + " realizado com sucesso.\n" +
                "Saldo atual: R$ " + conta.getSaldo()
        );
    }

}