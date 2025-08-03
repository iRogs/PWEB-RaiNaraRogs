import React, { useEffect } from 'react';
import "../static/css/PaginaLoginRegistro.css";
import characterImg from "../assets/img/character.png";
import FormularioLogin from "../components/FormularioLogin";

export default function PaginaLogin() {

    useEffect(() => {
        document.title = 'Internet Banking Login';
    }, []);

    useEffect(() => {
      document.body.classList.add('zoom-110');
      return () => {
        document.body.classList.remove('zoom-110');
      };
    }, []);

    return (
      <div className="login-container">
        <div className="login-content">

          {/* Lado esquerdo */}
          <div className="login-left animate-slide-in">
            <h1>FaÃ§a seu login</h1>
            <h2>Internet Banking Plataforma</h2>
            <p>
              Se ainda nÃ£o tiver uma conta <br />
              VocÃª pode se <a href="/cadastrar">registrar aqui !</a>
            </p>
            <img src={characterImg} alt="Character" className="character-image" />
          </div>

          {/* Lado direito - formulÃ¡rio */}
          <div className="login-right animate-slide-in">
            <h2>Acesse sua conta</h2>
            <FormularioLogin />
            
          </div>
          
        </div>
      </div>
    );

}