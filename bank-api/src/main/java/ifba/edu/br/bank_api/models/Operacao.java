package ifba.edu.br.bank_api.models;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "operações")
public class Operacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    TipoOperacao tipo;
    Date data;
    Float valor;
    @ManyToOne
    Conta conta;

}
