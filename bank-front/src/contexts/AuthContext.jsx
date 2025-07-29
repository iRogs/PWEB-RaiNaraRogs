import axios from 'axios';
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState(null);

  async function signIn(email, senha) {
    try {
      setLoading(true);
      const response = await axios.post('http://192.168.100.31:8082/banking-api/usuarios/login', {
        email,
        senha,
      });

      console.log('Login realizado:', response.data);
      setUsuario(response.data.usuario);
      setSigned(true);
    } catch (err) {
      console.error('Erro no login:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setUsuario(null);
    setSigned(false);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
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
