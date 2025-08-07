package ifba.edu.br.bank_api.dtos;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PagamentoDTO(
    @NotNull
    Long idContaTo, 

    @NotNull
    @DecimalMin(value = "0.01", message = "O valor deve ser maior que zero.")
    BigDecimal valor, 

    @NotBlank
    String descricao ) {}