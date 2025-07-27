import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storagedToken = localStorage.getItem('@InternetBanking:token');
    const storagedUser = localStorage.getItem('@InternetBanking:user');

    if (storagedToken && storagedUser) {
      api.defaults.headers.common['Authorization'] = Bearer ${storagedToken};
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  async function signIn(email, senha) {
    try {
      
      const response = await api.post('/bank-api/usuarios/login', { email, senha });
      const { token, usuario } = response.data; 

      localStorage.setItem('@InternetBanking:token', token);
      localStorage.setItem('@InternetBanking:user', JSON.stringify(usuario));
      
      api.defaults.headers.common['Authorization'] = Bearer ${token};
      setUser(usuario);
    } catch (error) {
      console.error("Falha no login:", error);
      alert("Email ou senha inválidos.");
    }
  }

  function signOut() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );

}