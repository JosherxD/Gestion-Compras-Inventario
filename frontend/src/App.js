<<<<<<< HEAD
import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  background: #1d1f27;
`

const Intro = styled.p`
  font-size: 2.5vw;
  color: #ffff;
`
=======
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
>>>>>>> develop
