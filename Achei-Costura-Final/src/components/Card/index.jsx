import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Ícones do Bootstrap
import { StarFill, GeoAltFill, LockFill, UnlockFill, CheckCircleFill } from 'react-bootstrap-icons';
import { useAuth } from '../../context/AuthContext'; 
import './style.css'; 

function Card(props) { // Adaptei para receber props ou item, para compatibilidade
  
  // Lógica para garantir que funciona se vier como 'item' ou props soltas
  const data = props.item || props;
  const { 
    id, 
    imagem, 
    nome, 
    cidade, 
    avaliacao, 
    servicos, 
    premiumRequired = true,
    jaDesbloqueou = false 
  } = data;

  // Define o tipo para a rota correta (costureiros ou empresas)
  const tipo = props.tipo || 'costureiros';

  const { user, updateUser } = useAuth(); 
  const navigate = useNavigate();
  
  // Estado local mantido do seu código original
  const [desbloqueadoLocal, setDesbloqueadoLocal] = useState(jaDesbloqueou);

  // --- LÓGICA DE DECISÃO ---
  const isAssinante = user?.plano === 'gold' || user?.plano === 'pro';

  // Lógica de bloqueio visual (Cadeado/Blur)
  const isLocked = premiumRequired && !isAssinante && !desbloqueadoLocal;

  // --- AÇÕES ---

  // Mantive sua função original aqui para não "limpar" o código
  const handleUsarMoeda = async (e) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!user) {
        alert("Faça login para continuar.");
        navigate('/login');
        return;
    }

    if (Number(user.ac_coins) < 1) {
        if(window.confirm("Saldo insuficiente. Ir para a loja de planos?")) {
            navigate('/planos');
        }
        return;
    }

    const confirmar = window.confirm(`Gastar 1 Moeda para ver o contato?`);
    
    if (confirmar) {
        try {
            // Lógica de desbloqueio (mantida)
            setDesbloqueadoLocal(true); 
            console.log(`Perfil ${id} desbloqueado!`);
        } catch (error) {
            alert("Erro ao processar.");
        }
    }
  };

  const handleNavegacao = (rota) => {
      navigate(rota);
  };

  // Função auxiliar para entrar no perfil
  const entrarNoPerfil = () => {
      handleNavegacao(`/${tipo}/${id}`);
  };

  return (
    <div className="card-container">
      
      {/* --- PARTE SUPERIOR: FOTO E BLOQUEIO --- */}
      {/* Adicionei onClick={entrarNoPerfil} para permitir entrar mesmo bloqueado */}
      <div className="card-image-wrapper" onClick={entrarNoPerfil} style={{cursor: 'pointer'}}>
        <img 
          src={imagem || "https://via.placeholder.com/300"} 
          alt={nome} 
          className={`card-img ${isLocked ? 'img-blur' : ''}`} 
        />
        
        {/* Mostra cadeado e fundo verde se trancado */}
        {isLocked && (
            <div className="locked-overlay">
                <LockFill size={32} />
                <span className="locked-text">Contato Privado</span>
                {/* Pequeno aviso para clicar */}
                <span style={{fontSize: '0.75rem', marginTop: '5px', opacity: 0.9}}>
                    (Toque para ver fotos)
                </span>
            </div>
        )}
      </div>

      {/* --- PARTE INFERIOR: TEXTOS E BOTÕES --- */}
      <div className="card-content">
        
        {/* Nome Oculto se estiver bloqueado */}
        <h3 className="card-title" onClick={entrarNoPerfil} style={{cursor: 'pointer'}}>
          {isLocked ? "Profissional Oculto" : nome}
        </h3>

        <p className="card-location">
          <GeoAltFill className="icon-location" /> {cidade}
        </p>

        <div className="card-rating">
            <span className="rating-score">{avaliacao || 5}</span>
            <StarFill className="icon-star" />
        </div>

        {servicos && (
            <div className="card-tags">
            {servicos.slice(0, 2).map((s, i) => (
                <span key={i} className="tag">{s}</span>
            ))}
            </div>
        )}

        {/* --- ÁREA DOS BOTÕES --- */}
        <div className="card-actions">
            
            {isLocked ? (
                // CASO 1: BLOQUEADO
                // Alterei aqui: Em vez de bloquear com "handleUsarMoeda", 
                // coloquei um botão que LEVA para o perfil (entrarNoPerfil).
                // A função handleUsarMoeda continua no arquivo, mas o botão chama a navegação.
                <button 
                    className="card-btn" // Usei btn-ver para ficar azul/convidativo
                    onClick={entrarNoPerfil}
                >
                    Ver Portfólio
                </button>
            ) : (
                // CASO 2: LIBERADO
                <button 
                    className={`card-btn ${isAssinante ? 'btn-vip' : 'btn-ver'}`}
                    onClick={entrarNoPerfil}
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