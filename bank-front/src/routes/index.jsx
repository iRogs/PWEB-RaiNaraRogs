import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import PaginaLogin from '../pages/PaginaLogin';
import PaginaRegistro from '../pages/PaginaRegistro';
import PaginaInicial from '../pages/PaginaInicial';
import { Pagar } from '../pages/Pagar'; 
import { Sacar } from '../pages/Sacar'; 
import { Depositar } from '../pages/Depositar'; 


function PrivateRoute({ children }) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>A carregar...</div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}

export function AppRoutes() {
  return (
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/cadastrar" element={<PaginaRegistro />} />

        {/* Rotas Privadas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <PaginaInicial />
            </PrivateRoute>
          }
        />
        <Route
          path="/pagar"
          element={
            <PrivateRoute>
              <Pagar />
            </PrivateRoute>
          }
        />
        <Route
          path="/sacar"
          element={
            <PrivateRoute>
              <Sacar />
            </PrivateRoute>
          }
        />
        <Route
          path="/depositar"
          element={
            <PrivateRoute>
              <Depositar />
            </PrivateRoute>
          }
        />
      </Routes>
  );
}