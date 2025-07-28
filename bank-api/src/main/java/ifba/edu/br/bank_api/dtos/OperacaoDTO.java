package ifba.edu.br.bank_api.dtos;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record OperacaoDTO(

    @NotNull
    @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero.")
    BigDecimal valor,

    String descricao
    ){}