import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import loadingGif from '../assets/img/loading.gif';

export default function FormularioLogin() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loadingLocal, setLoadingLocal] = useState(false);
    const [showLoadingGif, setShowLoadingGif] = useState(false);

    const [mensagemToast, setMensagemToast] = useState(null);
    const [toastVisivel, setToastVisivel] = useState(false);

    const { signIn, mensagemToast: mensagemToastContext } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (mensagemToast) {
            setToastVisivel(true);
            const timer = setTimeout(() => {
                setToastVisivel(false);
                setMensagemToast(null);
            }, 5000);
          return () => clearTimeout(timer);
        }
    }, [mensagemToast]);

    async function handleLogin(e) {
        e.preventDefault();
        setMensagemToast(null);

        if (!email || !senha) {
            setMensagemToast({ texto: 'Preencha e-mail e senha.', tipo: 'error' });
            return;
        }

        setLoadingLocal(true);

        try {
            await signIn(email, senha);

            setMensagemToast({ texto: 'Login realizado com sucesso!', tipo: 'success' });
            setShowLoadingGif(true);

            setTimeout(() => {
                setShowLoadingGif(false);
                navigate('/home');
            }, 2000);

        } catch (error) {
        } finally {
              setLoadingLocal(false);
          }
    }

    return (
        <>
            <form
                className="login-form"
                onSubmit={handleLogin}
                style={{ opacity: loadingLocal ? 0.5 : 1 }}
          >
            <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loadingLocal}
            />
            <div className="password-wrapper">
              <input
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  disabled={loadingLocal}
              />
            </div>
            <button type="submit" disabled={loadingLocal}>Login</button>

            {/* Gif de loading abaixo do botão */}
            {showLoadingGif && (
              <div
                  className="loader-container"
                  style={{ marginTop: '15px', textAlign: 'center' }}
                  >
                  <img src={loadingGif} alt="Carregando..." />
              </div>
            )}
          </form>

          {/* Toast local para erros de validação e sucesso */}
          {mensagemToast && (
              <div
                className={`toast no-zoom ${toastVisivel ? "visible" : "hidden"} ${mensagemToast.tipo}`}
                role="alert"
              >
                {mensagemToast.texto}
              </div>
          )}

          {/* Toast global do contexto para erros do backend (já aparece fixo no canto) */}
        </>
    );

}