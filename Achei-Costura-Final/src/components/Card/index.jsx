import React, { useEffect } from 'react'; // Certifique-se de importar useEffect
import { useAuth } from '../../context/AuthContext'; 
import './style.css';
import { StarFill, GeoAltFill, LockFill } from 'react-bootstrap-icons'; 

function Card({ id, imagem, nome, cidade, avaliacao, servicos, premiumRequired = true }) {
  const { user } = useAuth();

  // DEBUG 1: Log simples (fora do useEffect)
  console.log('🎯 Card - user do contexto:', user);
  console.log('🎯 Card - coins do user:', user?.coins);

  // DEBUG 2: useEffect para logs
  useEffect(() => {
    console.log('🔄 useEffect Card - user atualizado:', user);
    console.log('🔄 useEffect Card - premiumRequired:', premiumRequired);
  }, [user, premiumRequired]);

  const isPremium = user && user.coins > 0;
  const isCensored = premiumRequired && !isPremium;

  // DEBUG 3: Log dos cálculos
  console.log('📊 Card - isPremium:', isPremium);
  console.log('📊 Card - isCensored:', isCensored);

  const renderName = () => {
    if (!isCensored) return nome;
    
    return (
      <span className="censored-text">
        {nome.substring(0, 3)}... <span className="blur-effect">******</span>
      </span>
    );
  };

  return (
    <div className="card-container" >
      {/* Imagem (Se censurado, podemos deixar preto e branco ou normal) */}
      <div className="card-image-wrapper">
        <img src={imagem} alt="Foto de perfil" className="card-img" />
        {isCensored && (
            <div className="locked-overlay">
                <LockFill size={24} color="#fff" />
            </div>
        )}
      </div>

      <div className="card-content">
        {/* Nome com Censura */}
        <h3 className={`card-title ${isCensored ? 'censored' : ''}`}>
          {renderName()}
        </h3>

        {/* Localização */}
        <p className="card-location">
          <GeoAltFill className="icon-location" /> {cidade}
        </p>

        {/* Avaliação */}
        <div className="card-rating">
            <span className="rating-score">{avaliacao}</span>
            <StarFill className="icon-star" />
        </div>

        {/* Serviços (Tags) */}
        {servicos && (
            <div className="card-tags">
            {servicos.slice(0, 2).map((servico, index) => ( // Mostra só os 2 primeiros
                <span key={index} className="tag">{servico}</span>
            ))}
            </div>
        )}

        {/* Botão de Ação */}
        <button className={`card-btn ${isCensored ? 'btn-locked' : ''}`}>
          {isCensored ? (
          // Se censurado: botão normal
          <button className="card-btn btn-locked">
            Desbloquear Contato
          </button>
        ) : (
          // Se NÃO censurado: Link para o perfil
          <button className="card-btn" onClick={() => window.location.href = `/costureiros/${id}`}>
            Ver Perfil
          </button>
        )}
        </button>
      </div>
    </div>
  );
}

export default Card;