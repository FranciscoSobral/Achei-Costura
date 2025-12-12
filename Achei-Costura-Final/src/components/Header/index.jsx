import React, { useState } from 'react'; // Adicionei useState para o menu mobile se precisar
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search } from 'react-bootstrap-icons'; // 1. Importar o ícone de Lupa
import './style.css';
import logoAcheiCostura from '../../assets/logo.png';
import coinsImg from '../../assets/coins.png';

function Header() {
  const { isLoggedIn, user } = useAuth();
  // Se você tiver a lógica do menu mobile (hambúrguer) de antes, mantenha aqui.
  // Vou focar apenas na barra de pesquisa conforme solicitado.

  return (
    <header className="main-header">
      <div className="header-content">
        
        <div className="logo-container">
          <Link to="/">
            <img src={logoAcheiCostura} alt="Logo Achei Costura" className="logo-imagem" />
          </Link>
        </div>

        <nav className="main-nav">
          <Link to="/">Início</Link>
          <Link to="/planos">Planos</Link>
          <Link to="/contato">Contato</Link>
          <Link to="/sobre-nos">Sobre nós</Link>
        </nav>
        
        <div className="header-actions">
          
          {/* 2. MUDANÇA AQUI: Ícone dentro da div */}
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." />
            <Search className="search-icon" /> 
          </div>

          {/* LÓGICA: Se estiver logado, mostra as moedas */}
          {isLoggedIn && user && (
            <div className="coin-balance-card">
              <span className="coin-count">{user.coins}</span>
              <img src={coinsImg} alt="Coins" className="header-coin-icon" />
            </div>
          )}

          <Link to={isLoggedIn ? "/meu-perfil" : "/login"} className="login-btn">
            {isLoggedIn ? "Meu Perfil" : "Login"}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;