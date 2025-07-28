import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function FormularioLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagemToast, setMensagemToast] = useState(null);

  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMensagemToast(null);

    if (!email || !senha) {
      setMensagemToast({ texto: 'Preencha e-mail e senha.', tipo: 'error' });
      return;
    }

    setLoading(true);

    try {
      await signIn(email, senha);

      setMensagemToast({ texto: 'Login realizado com sucesso!', tipo: 'success' });

      setTimeout(() => {
        navigate('/home');
      }, 1000); // tempo reduzido
    } catch (error) {
      setMensagemToast({
        texto: 'Erro ao tentar logar. Verifique seu email e senha.',
        tipo: 'error',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form className="login-form" onSubmit={handleLogin} style={{ opacity: loading ? 0.5 : 1 }}>
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div className="password-wrapper">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>Login</button>
      </form>

      {mensagemToast && (
        <div className={`toast ${mensagemToast.tipo}`}>
          {mensagemToast.texto}
        </div>
      )}
    </>
  );
  
}