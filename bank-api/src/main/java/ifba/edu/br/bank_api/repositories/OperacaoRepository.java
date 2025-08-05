package ifba.edu.br.bank_api.repositories;

import java.time.LocalDateTime;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page; 
import org.springframework.data.domain.Pageable;
import ifba.edu.br.bank_api.entities.Conta;
import ifba.edu.br.bank_api.entities.Operacao;
import ifba.edu.br.bank_api.entities.TipoOperacao;

public interface OperacaoRepository extends JpaRepository<Operacao, Long> {
    Page<Operacao> findByContaAndTipoAndDataBetween(Conta conta, TipoOperacao tipo, LocalDateTime inicio, LocalDateTime fim, Pageable pageable);
    Page<Operacao> findByContaAndDataBetween(Conta conta, LocalDateTime inicio, LocalDateTime fim, Pageable pageable);
}
