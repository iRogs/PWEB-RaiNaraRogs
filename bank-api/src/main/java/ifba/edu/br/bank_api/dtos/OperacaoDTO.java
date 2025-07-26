package ifba.edu.br.bank_api.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class OperacaoDTO {

    @NotNull
    private Long IdConta;

    @NotNull
    @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero.")
    private BigDecimal valor;
    private String descricao;

    public Long getContaId() {
        return IdConta;
    }

    public void setContaId(Long IdConta) {
        this.IdConta = IdConta;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

}