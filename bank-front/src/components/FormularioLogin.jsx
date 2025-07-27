import React from 'react';

export default function FormularioLogin() {

  return (
    <form className="login-form">
      <input type="text" placeholder="E-mail" />
      <div className="password-wrapper">
        <input type="password" placeholder="Senha" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
  
}
