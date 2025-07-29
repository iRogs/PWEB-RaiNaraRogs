import React, { useEffect } from 'react';
import "../static/css/PaginaLoginRegistro.css";
import characterImg from "../assets/img/character.png";
import FormularioLogin from "../components/FormularioLogin";

export default function PaginaLogin() {

    useEffect(() => {
        document.title = 'Internet Banking Login';
    }, []);

    return (
      <div className="login-container">
        <div className="login-content">

          {/* Lado esquerdo */}
          <div className="login-left">
            <h1>Faça seu login</h1>
            <h2>Internet Banking Plataforma</h2>
            <p>
              Se ainda não tiver uma conta <br />
              Você pode se <a href="/cadastrar">registrar aqui !</a>
            </p>
            <img src={characterImg} alt="Character" className="character-image" />
          </div>

          {/* Lado direito - formulário */}
          <div className="login-right">
            <h2>Login</h2>
            <FormularioLogin />
            
          </div>
          
        </div>
      </div>
    );

}