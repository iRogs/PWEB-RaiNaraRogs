package ifba.edu.br.bank_api.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ifba.edu.br.bank_api.models.Conta;
import ifba.edu.br.bank_api.models.Operacao;
import ifba.edu.br.bank_api.models.TipoOperacao;

public interface OperacaoRepository extends JpaRepository<Operacao, Long> {
    List<Operacao> findByContaAndTipoAndDataBetween(Conta conta, TipoOperacao tipo, LocalDateTime inicio, LocalDateTime fim);
    List<Operacao> findByContaAndDataBetween(Conta conta, LocalDateTime inicio, LocalDateTime fim);
}
