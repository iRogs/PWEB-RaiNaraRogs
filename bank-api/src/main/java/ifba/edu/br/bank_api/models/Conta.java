package ifba.edu.br.bank_api.models;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "contas")
public class Conta {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    private String agencia;
    private BigDecimal saldo;
    @OneToMany(mappedBy = "conta")
    private List<Operacao> operacoes = new ArrayList<>();

    @OneToOne(mappedBy = "conta")
    private Usuario usuario;

    public Conta(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAgencia() {
        return agencia;
    }

    public void setAgencia(String agencia) {
        this.agencia = agencia;
    }

    public BigDecimal getSaldo() {
        return saldo;
    }

    public void setSaldo(BigDecimal saldo) {
        this.saldo = saldo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }    

    public String getEmail() {
        return (usuario != null) ? usuario.getEmail() : null;
    }

    public String getUserAccountName() {
        return (usuario != null) ? usuario.getNome() : null;
    }
    //

}