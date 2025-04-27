import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home';
import RegistrarOrdenDeCompra from './views/RegistrarOrdenDeCompra';
import RegistrarProducto from './views/RegistrarProducto';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registrar-orden" element={<RegistrarOrdenDeCompra />} />
          <Route path="/registrar-producto" element={<RegistrarProducto />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
