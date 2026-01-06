import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // 1. Importação necessária para mudar de página
import './style.css';
import { StarFill, GeoAltFill, LockFill } from 'react-bootstrap-icons';

function Card({ id, imagem, nome, cidade, avaliacao, servicos, premiumRequired = true }) {
  const { user } = useAuth();
  const navigate = useNavigate(); // 2. Hook de navegação

  // Verifica se o usuário é Premium
  const isPremium = user && Number(user.ac_coins) > 0;

  // Ativa a censura se necessário
  const isCensored = premiumRequired && !isPremium;

  // Função para lidar com o clique
  const handleCardClick = (e) => {
    e.preventDefault(); // Previne comportamentos padrão estranhos

    if (isCensored) {
      // CENÁRIO 1: Usuário bloqueado clica
      // Leva para a página de planos para ele comprar
      navigate('/planos'); 
    } else {
      // CENÁRIO 2: Usuário liberado clica
      // Leva para o perfil da pessoa. 
      // ATENÇÃO: Verifique se a sua rota no AppRoutes é '/perfil/:id', '/empresa/:id' ou '/costureiro/:id'
      navigate(`/perfil/${id}`); 
    }
  };

  return (
    <div className="card-container">
      <div className="card-image-wrapper">
        <img 
          src={imagem} 
          alt="Perfil" 
          className={`card-img ${isCensored ? 'img-blur' : ''}`} 
        />
        
        {isCensored && (
            <div className="locked-overlay">
                <LockFill size={32} color="#fff" />
                <span className="locked-text">Exclusivo</span>
            </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">
          {isCensored ? "Nome indisponível" : nome}
        </h3>

        <p className="card-location">
          <GeoAltFill className="icon-location" /> {cidade}
        </p>

        <div className="card-rating">
            <span className="rating-score">{avaliacao}</span>
            <StarFill className="icon-star" />
        </div>

        {servicos && (
            <div className="card-tags">
            {servicos.slice(0, 2).map((servico, index) => (
                <span key={index} className="tag">{servico}</span>
            ))}
            </div>
        )}

        {/* Botão com a ação de clique corrigida */}
        <button 
            className={`card-btn ${isCensored ? 'btn-locked' : ''}`}
            onClick={handleCardClick}
        >
          {isCensored ? 'Assine para ver contato' : 'Ver Perfil Completo'}
        </button>
      </div>
    </div>
  );
}

export default Card;