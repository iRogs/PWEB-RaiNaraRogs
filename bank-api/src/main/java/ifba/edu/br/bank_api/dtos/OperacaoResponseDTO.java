package ifba.edu.br.bank_api.dtos;

import ifba.edu.br.bank_api.entities.Operacao;
import ifba.edu.br.bank_api.entities.TipoOperacao;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OperacaoResponseDTO(
    Long id,
    TipoOperacao tipo,
    BigDecimal valor,
    LocalDateTime data,
    String descricao
) {
    public OperacaoResponseDTO(Operacao operacao) {
        this(
            operacao.getId(),
            operacao.getTipo(),
            operacao.getValor(),
            operacao.getData(),
            operacao.getDescricao()
        );
    }
}