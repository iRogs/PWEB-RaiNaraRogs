package ifba.edu.br.bank_api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ifba.edu.br.bank_api.models.Operacao;

public interface OperacaoRepository extends JpaRepository<Operacao, Long> {
    
}
