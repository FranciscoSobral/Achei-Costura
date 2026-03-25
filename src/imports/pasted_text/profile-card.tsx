import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StarFill, GeoAltFill, LockFill, UnlockFill, CheckCircleFill } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext';
import './style.css';

function Card({ 
  id, 
  imagem, 
  nome, 
  cidade, 
  avaliacao, 
  servicos, 
  premiumRequired = true,
  jaDesbloqueou = false 
}) {
  
  const { user, unlockProfile, updateUser } = useAuth();
  const navigate = useNavigate();
  
  const [desbloqueadoLocal, setDesbloqueadoLocal] = useState(jaDesbloqueou);
  const [desbloqueando, setDesbloqueando] = useState(false);

  const isAssinante = user?.plano === 'gold' || user?.plano === 'pro';
  const isLocked = premiumRequired && !isAssinante && !desbloqueadoLocal;

  const handleUsarMoeda = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Faça login para continuar.");
      navigate('/login');
      return;
    }

    if (user.role !== 'EMPRESA') {
      alert("Apenas empresas podem desbloquear perfis.");
      return;
    }

    if (user.coins < 1) {
      if (window.confirm("Saldo insuficiente. Ir para a loja de planos?")) {
        navigate('/planos');
      }
      return;
    }

    const confirmar = window.confirm(`Gastar 1 moeda para desbloquear o perfil de ${nome}?`);
    if (!confirmar) return;

    setDesbloqueando(true);
    try {
      const result = await unlockProfile(id);
      if (result.success) {
        setDesbloqueadoLocal(true);
        // O contexto já atualizou o usuário, mas podemos forçar atualização visual
        // A imagem será carregada posteriormente pelo Home
      } else {
        alert(result.message || "Erro ao desbloquear. Tente novamente.");
      }
    } catch (error) {
      alert("Erro inesperado. Tente novamente.");
    } finally {
      setDesbloqueando(false);
    }
  };

  const handleNavegacao = (rota) => {
    navigate(rota);
  };

  return (
    <div className="card-container">
      <div className="card-image-wrapper">
        <img 
          src={imagem || "https://via.placeholder.com/300"} 
          alt={nome} 
          className={`card-img ${isLocked ? 'img-blur' : ''}`} 
        />
        {isLocked && (
          <div className="locked-overlay">
            <LockFill size={32} />
            <span className="locked-text">Exclusivo Premium</span>
          </div>
        )}
      </div>

      <div className="card-content">
        <h3 className="card-title">
          {isLocked ? "Profissional Oculto" : nome}
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
            {servicos.slice(0, 2).map((s, i) => (
              <span key={i} className="tag">{s}</span>
            ))}
          </div>
        )}

        <div className="card-actions">
          {isLocked ? (
            <div className="btns-lado-a-lado">
              <button 
                className="card-btn btn-assinar" 
                onClick={() => handleNavegacao('/planos')}
                title="Tenha acesso ilimitado"
              >
                <LockFill /> Assinar
              </button>

              <button 
                className="card-btn btn-moeda" 
                onClick={handleUsarMoeda}
                disabled={desbloqueando}
                title="Pague apenas por este"
              >
                <UnlockFill /> {desbloqueando ? 'Desbloqueando...' : 'Usar Moeda'}
              </button>
            </div>
          ) : (
            <button 
              className={`card-btn ${isAssinante ? 'btn-vip' : 'btn-ver'}`}
              onClick={() => handleNavegacao(`/costureiros/${id}`)}
            >
              {isAssinante ? (
                <> <CheckCircleFill /> Acessar (VIP) </>
              ) : (
                "Ver Perfil Completo"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;