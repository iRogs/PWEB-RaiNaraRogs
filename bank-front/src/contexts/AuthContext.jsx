import api from '../services/api';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true); 

    const [mensagemToast, setMensagemToast] = useState(null);
    const [toastVisivel, setToastVisivel] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      async function loadStorageData() {
        const storedUser = localStorage.getItem('usuarioLogado');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          setUsuario(JSON.parse(storedUser));
        }
        setLoading(false);
      }
      loadStorageData();
    }, []);

    // Controla o tempo de exibição do toast de erro
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

    async function signIn(email, senha) {

        setLoading(true);
        try {
          const response = await api.post(
            '/banking-api/usuarios/login',
            { email, senha },
            { auth: false }
          );

          const { token, usuario: userData } = response.data;

          localStorage.setItem('token', token);
          localStorage.setItem('usuarioLogado', JSON.stringify(userData));

          setUsuario(userData);

        } catch (err) {
          console.error('Erro no login:', err);

        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 400 || err.response.status === 403)
        ) {
          setMensagemToast({ texto: "E-mail ou senha inválido(s).", tipo: 'error' });
        } else {
          setMensagemToast({ texto: "Erro ao tentar logar. Tente novamente.", tipo: 'error' });
        }

          throw err;
        } finally {
          setLoading(false);
        }
      
    }

    function signOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('usuarioLogado');
      setUsuario(null);
      navigate('/login');
    }

    return (
      <>
        <AuthContext.Provider
          value={{
            signed: !!usuario,
            loading,
            signIn,
            signOut,
            usuario,
            mensagemToast,   // opcional: para usar se quiser mostrar toast global do contexto
            toastVisivel,    // opcional
            setMensagemToast // opcional
          }}
        >
          {children}
        </AuthContext.Provider>

        {/* Toast fixo no canto da tela para mensagens de erro do contexto */}
        {mensagemToast && (
          <div
            className={`toast ${toastVisivel ? "visible" : "hidden"} ${mensagemToast.tipo}`}
            role="alert"
          >
            {mensagemToast.texto}
          </div>
        )}
      </>
    );
  
}