import React, { useContext } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import PaginaLogin from '../pages/PaginaLogin';
import PaginaRegistro from '../pages/PaginaRegistro';
import PaginaInicial from '../pages/PaginaInicial';

export function AppRoutes() {
    
    const { signed } = useContext(AuthContext);

    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaLogin />} />
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="/home" element={<PaginaInicial />} />
            <Route path="/cadastrar" element={<PaginaRegistro />} />
        </Routes>
        </BrowserRouter>
      );

}