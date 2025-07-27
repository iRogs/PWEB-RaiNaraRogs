import React from "react";
import "../static/css/LoginPage.css";
import characterImg from "../assets/img/character.png";

export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-content">
        {/* Lado esquerdo */}
        <div className="login-left">
          <h1>Faça seu login</h1>
          <h2>Internet Banking Plataforma</h2>
          <p>
            Se ainda não tiver uma conta <br />
            Você pode se <a href="#">registrar aqui !</a>
          </p>
          <img src={characterImg} alt="Character" className="character-image" />
        </div>

        {/* Lado direito - formulário */}
        <div className="login-right">
          <h2>Login</h2>
          <form className="login-form">
            <input type="text" placeholder="Id da Conta" />
            <div className="password-wrapper">
              <input type="password" placeholder="Senha" />
              <span className="icon">🔒</span>
            </div>
            <div className="forgot-password">
              <a href="#">Esqueceu a senha?</a>
            </div>
            <button type="submit">Login</button>
            <div className="checkbox-group">
              <input type="checkbox" id="virtual-keyboard" />
              <label htmlFor="virtual-keyboard">Ativar meu teclado virtual</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}