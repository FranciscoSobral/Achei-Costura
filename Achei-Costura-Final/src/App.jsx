import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import AppRoutes from './Routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
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