import React from 'react';
import "../static/css/PaginaInicial.css";

function PaginaInicial() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">Internet Banking Plataforma</div>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Statement</li>
            <li>My Loan</li>
            <li>Setting</li>
          </ul>
        </nav>
        <div className="bottom-menu">
          <p>Help</p>
          <p>Log out</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <input type="text" placeholder="Search loan or other..." />
          <div className="user-info">
            <span>Jyoti Pandey</span>
            <small>Priority account</small>
          </div>
        </header>

        <section className="welcome-message">
          <h3>Hello Jyoti Pandey, Welcome back!</h3>
        </section>

        <section className="cards-section">
          <div className="loan-cards">
            <div className="card personal-loan">
              <h4>Personal loan</h4>
              <p>XXXXXXXXXXXX9868</p>
              <p>@28.00%</p>
              <h3>$10,000.00</h3>
            </div>
            <div className="card vehicle-loan">
              <h4>Vehicle loan</h4>
              <p>XXXXXXXXXXXX4578</p>
              <p>@14.00%</p>
              <h3>$10,000.00</h3>
            </div>
          </div>

          <div className="summary-box">
            <h4>Total Account Balance</h4>
            <p>January 18, 2022</p>
            <h2>$76,000.00</h2>
            <span>Active balance</span>
          </div>

          <div className="calculator-box">
            <h4>Loan Calculator</h4>
            <button>Use Now</button>
            <p>[gráfico]</p>
          </div>
        </section>

        <section className="loan-statements">
          <h4>Loan Statements</h4>
          <div className="statement-box">$10,000.00</div>
        </section>
      </main>
    </div>
  );
}

export default PaginaInicial;