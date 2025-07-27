import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import { Login } from '../pages/Login';
import { Cadastro } from '../pages/Cadastro';
import { Painel } from '../pages/Painel';

export function AppRoutes() {
const { signed } = useContext(AuthContext);


return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={signed ? <Painel /> : <Login />} />
        <Route path="/cadastrar" element={<Cadastro />} />
        {                                                           }
        <Route path="*" element={signed ? <Painel /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}