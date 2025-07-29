import api from '../services/api';
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); 
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

  async function signIn(email, senha) {
    setLoading(true);
    try {
<<<<<<< HEAD
      setLoading(true);
      const response = await axios.post('http://192.168.100.31:8082/banking-api/usuarios/login', {
        email,
        senha,
      });
=======
      const response = await api.post('/banking-api/usuarios/login', { email, senha });
      const { token, usuario: userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuarioLogado', JSON.stringify(userData));

      setUsuario(userData);
      navigate('/home');
>>>>>>> 12308bff5001998808f2cb70bfab0f9423e83aae

    } catch (err) {
      console.error('Erro no login:', err);
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
    <AuthContext.Provider
      value={{
        signed: !!usuario, 
        loading,
        signIn,
        signOut,
        usuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}