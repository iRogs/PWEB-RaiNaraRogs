// import React, { useContext } from 'react';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';
// import PaginaLogin from '../pages/PaginaLogin';
// import PaginaRegistro from '../pages/PaginaRegistro';
// import PaginaInicial from '../pages/PaginaInicial';

// export function AppRoutes() {
    
//     const { signed } = useContext(AuthContext);

//     return (
//         <BrowserRouter>
//         <Routes>
//             <Route path="/" element={<PaginaLogin />} />
//             <Route path="/login" element={<PaginaLogin />} />
//             <Route path="/home" element={<PaginaInicial />} />
//             <Route path="/cadastrar" element={<PaginaRegistro />} />
//         </Routes>
//         </BrowserRouter>
//       );

// }

import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import PaginaLogin from '../pages/PaginaLogin';
import PaginaRegistro from '../pages/PaginaRegistro';
import PaginaInicial from '../pages/PaginaInicial';


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

        {/* Rota Privada para o Painel */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <PaginaInicial />
            </PrivateRoute>
          } 
        />
      </Routes>
  );
}