import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrarOrdenDeCompra from './views/RegistrarOrdenDeCompra';
import Home from './views/Home';
import RegistrarProducto from './views/RegistrarProducto';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RegistrarOrdenDeCompra />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registrar-producto" element={<RegistrarProducto />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App
