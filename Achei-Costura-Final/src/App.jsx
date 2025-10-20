import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // 1. IMPORTE O BROWSER ROUTER AQUI
import AppRoutes from './Routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    // 2. ENVOLVA TODO O SEU APLICATIVO COM O <BrowserRouter>
    <BrowserRouter>
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;