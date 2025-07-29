import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../static/css/PaginaInicial.css';
import pagarIcon from '../assets/img/pagar.png';
import depositarIcon from '../assets/img/depositar.png';
import sacarIcon from '../assets/img/sacar.png';
import cofreIcon from '../assets/img/cofrinho.png';

export default function PaginaInicial() {
  const { usuario, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!usuario) {
    return <div>A carregar informaÃ§Ãµes do utilizador...</div>;
  }

  const conta = {
    numero: 'XXXX-XXXX-9868',
    agencia: '0001',
    saldo: usuario.saldoReal ?? 0,  
  };

  const movimentacoes = [
    { data: '24 de Julho', tipo: 'Pagamento realizado', descricao: 'Seguro de Vida', valor: -12.22 },
    { data: '19 de Julho', tipo: 'Compra no dÃ©bito', descricao: 'Antonio de Souza Salvador Bra', valor: -8.82 },
    { data: '19 de Julho', tipo: 'Pix recebido', descricao: 'Iainara Cerqueira dos Santos - PICPAY SERVIÃ‡OES LTDA', valor: 24.52 },
    { data: '17 de Julho', tipo: 'Pix enviado', descricao: '*********', valor: -7.70 },
  ];

  function handleSignOut() {
    signOut();
    navigate('/login');
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Internet Banking</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active"><a>Painel</a></li>
            <li><a>TransaÃ§Ãµes</a></li>
            <li><a>Carteira</a></li>
            <li><a>ConfiguraÃ§Ãµes</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a onClick={handleSignOut} style={{ cursor: 'pointer' }}>Sair</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <div className="welcome-message">OlÃ¡ {usuario.nome}!</div>
          <div className="user-profile">
            <div className="user-avatar"></div>
            <div className="user-details">
              <span>{usuario.nome}</span>
              <small>Editar perfil</small>
            </div>
          </div>
        </header>

        <section className="account-overview">
          <div className="account-card">
            <div className="card-header">
              <span>Conta</span>
              <a href="#">Ver Extrato &gt;</a>
            </div>
            <div className="card-body">
              <span className="account-number">@{conta.numero}</span>
              <span className="agency">AgÃªncia {conta.agencia}</span>
            </div>
            <div className="card-footer">
              <span>Saldo em conta</span>
              <span className="balance">
                {conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>
        </section>

  {/* 4. Operações Rápidas */}
<section className="quick-operations">
  <h4>Operações Rápidas</h4>
  <div className="operations-grid">
    
    {/* Botão Pagar */}
    <div className="operation-card">
      <div className="icon-container">
        {/* Substitua pelo caminho da sua imagem */}
        <img src={pagarIcon} alt="Pagar" />
      </div>
      <span>Pagar</span>
    </div>

    {/* Botão Depositar */}
    <div className="operation-card">
      <div className="icon-container">
        <img src={depositarIcon} alt="Depositar" />
      </div>
      <span>Depositar</span>
    </div>

    {/* Botão Sacar */}
    <div className="operation-card">
      <div className="icon-container">
        <img src={sacarIcon}  alt="Sacar" />
      </div>
      <span>Sacar</span>
    </div>
    
    {/* Botão Cofre */}
    <div className="operation-card">
      <div className="icon-container">
        <img src={cofreIcon} alt="Cofre" />
      </div>
      <span>Cofre</span>
    </div>

  </div>
</section>

        <section className="latest-transactions">
          <h4>Ãšltimas movimentaÃ§Ãµes</h4>
          {movimentacoes.map((mov, index) => (
            <div key={index} className="movimentacao-item">
              <div className="movimentacao-data">{mov.data}</div>
              <div className="movimentacao-info">
                {mov.tipo}
                <p>{mov.descricao}</p>
              </div>
                <div className={`movimentacao-valor ${mov.valor > 0 ? 'positivo' : 'negativo'}`}>
                  {mov.valor > 0
                    ? `+${mov.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
                    : `â€“${Math.abs(mov.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );

}