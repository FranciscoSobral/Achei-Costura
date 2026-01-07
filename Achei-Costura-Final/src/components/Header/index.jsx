import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; 
import coinsIcon from '../../assets/coins.png'; 
import './style.css';
import { List, X, Search, BoxArrowRight, PersonCircle } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Importe o logout
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

 const handleLogout = async () => {
    closeMenu();
    await logout(); // Cortina sobe
    navigate('/');  // Navega
    finishTransition(); // Cortina desce
  };
  return (
    <header className="header">
      <div className="header-container">

        <div className="logo-container">
          <Link to="/" onClick={closeMenu}>
            <img src={logo} alt="Achei Costura" className="logo-img" />
          </Link>
        </div>

        <div className="search-bar-container">
            <div className="search-input-wrapper">
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="search-input"
                />
                <button className="search-button">
                    <Search size={16} />
                </button>
            </div>
        </div>

        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <X size={40} /> : <List size={40} />}
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><NavLink to="/" className="nav-link" onClick={closeMenu}>Início</NavLink></li>
            <li><NavLink to="/planos" className="nav-link" onClick={closeMenu}>Planos</NavLink></li>
            <li><NavLink to="/sobre-nos" className="nav-link" onClick={closeMenu}>Sobre Nós</NavLink></li>
            <li><NavLink to="/contato" className="nav-link" onClick={closeMenu}>Contato</NavLink></li>
          </ul>

          <div className="nav-actions">
            {user ? (
              <div className="user-controls">
                
                <div className="coins-display">
                  <img src={coinsIcon} alt="AC" className="coin-icon" />
                  <span className="coin-text">{user.coins || 0} AC</span>
                </div>

                <Link to="/meu-perfil" className="profile-link" onClick={closeMenu}>
                   <PersonCircle size={24} />
                   <span className="link-text">Meu Perfil</span>
                </Link>

                <button onClick={handleLogout} className="btn-logout">
                  <BoxArrowRight size={24} />
                  <span className="link-text">Sair</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-login" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/cadastro" className="btn-cadastro" onClick={closeMenu}>
                  Cadastre-se
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;