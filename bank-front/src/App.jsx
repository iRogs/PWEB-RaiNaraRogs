// import React from 'react';
// import PaginaLogin from './components/PaginaLogin';

// function App() {
//   return <PaginaLogin />;
// }

// export default App;


import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes /> {/* Apenas o roteador deve estar aqui */}
    </AuthProvider>
  );
}

export default App;