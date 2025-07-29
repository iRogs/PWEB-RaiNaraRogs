import React, { useEffect } from 'react';
import "../static/css/PaginaLoginRegistro.css";
import characterImg from "../assets/img/character-2.png";
import FormularioRegistro from "../components/FormularioRegistro";

export default function PaginaRegistro() {

    useEffect(() => {
        document.title = 'Internet Banking Cadastro';
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
            <h1>Faça seu cadastro</h1>
            <h2>Internet Banking Plataforma</h2>
            <p>
              Se você já tem uma conta <br />
              Você pode fazer <a href="/">login aqui !</a>
            </p>
            <img src={characterImg} alt="Character" className="character-image" />
          </div>

          {/* Lado direito - formulário */}
          <div className="login-right animate-slide-in">
            <h2>Insira suas informações</h2>
            <FormularioRegistro />
          </div>

        </div>
      </div>
    );

}