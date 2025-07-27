import React from "react";

export default function FormularioRegistro() {
    
  return (
    <form className="login-form">
        <input type="text" placeholder="CPF" />
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="E-mail" />
        <div className="password-wrapper">
            <input type="password" placeholder="Senha" />
        </div>
        <button type="submit">Registro</button>
    </form>
  );

}