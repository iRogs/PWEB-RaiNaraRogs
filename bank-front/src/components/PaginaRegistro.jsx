import React from "react";
import "../static/css/PaginaLoginRegistro.css";
import characterImg from "../assets/img/character-2.png";

export default function PaginaRegistro() {
  return (
    <div className="login-container">
      <div className="login-content">
        {/* Lado esquerdo */}
        <div className="login-left">
          <h1>Faça seu registro</h1>
          <h2>Internet Banking Plataforma</h2>
          <p>
            Se você já tem uma conta <br />
            Você pode fazer <a href="/">login aqui !</a>
          </p>
          <img src={characterImg} alt="Character" className="character-image" />
        </div>

        {/* Lado direito - formulário */}
        <div className="login-right">
          <h2>Cadastre-se</h2>
          <form className="login-form">
            <input type="text" placeholder="CPF" />
            <input type="text" placeholder="Nome" />
            <input type="text" placeholder="E-mail" />
            <div className="password-wrapper">
              <input type="password" placeholder="Senha" />
            </div>
            <button type="submit">Registro</button>
          </form>
        </div>
      </div>
    </div>
  );

}