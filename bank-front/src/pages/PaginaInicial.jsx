import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import '../static/css/PaginaInicial.css'; 

export default function PaginaInicial() {
  const { user, signOut } = useContext(AuthContext);

  
  const conta = {
    numero: 'XXXX-XXXX-9868',
    agencia: '0001',
    saldo: 10000.00
  };

  return (
    <div className="dashboard-container">
      {/* 1. Barra Lateral (Sidebar) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Internet Banking</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active"><a>Painel</a></li>
            <li><a>Transações</a></li>
            <li><a>Carteira</a></li>
            <li><a>Configurações</a></li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <a onClick={signOut}>Sair</a>
        </div>
      </aside>

      {/* 2. Conteúdo Principal */}
      <main className="main-content">
        <header className="main-header">
          <div className="welcome-message">
            Olá {user ? user.nome : '@Usuário'}! Seja bem-vindo!
          </div>
          <div className="user-profile">
            <div className="user-avatar"></div>
            <div className="user-details">
              <span>{user ? user.nome : 'Usuário'}</span>
              <small>Priority account</small>
            </div>
          </div>
        </header>

        <section className="account-overview">
          {/* 3. Cartão da Conta */}
          <div className="account-card">
            <div className="card-header">
              <span>Conta</span>
              <a href="#">Ver Extrato &gt;</a>
            </div>
            <div className="card-body">
              <span className="account-number">@{conta.numero}</span>
              <span className="agency">Agência {conta.agencia}</span>
            </div>
            <div className="card-footer">
              <span>Saldo em conta</span>
              <span className="balance">R$ {conta.saldo.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* 4. Operações Rápidas */}
        <section className="quick-operations">
          <h4>Operações Rápidas</h4>
          <div className="operations-grid">
            <button className="operation-btn">Pagar</button>
            <button className="operation-btn">Depositar</button>
            <button className="operation-btn">Sacar</button>
            <button className="operation-btn">Cofre</button>
          </div>
        </section>
      </main>
    </div>
  );
}