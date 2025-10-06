import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCostureiroById } from '../../data/api';
import StarRating from '../../components/StarRating';
import FeedbackForm from '../../components/FeedbackForm';
import './style.css'; 

function InfoCostureiroPage() {
  const { id } = useParams();
  const [costureiro, setCostureiro] = useState(null);

  // NOVIDADE: Estado para simular se o usuário é assinante
  // Mude para 'true' para testar a visão de um usuário pagante
  const [isAssinante, setIsAssinante] = useState(false);

  useEffect(() => {
    const costureiroEncontrado = getCostureiroById(id);
    setCostureiro(costureiroEncontrado);
  }, [id]);

  if (!costureiro) {
    return <div>Carregando profissional...</div>;
  }

  // NOVIDADE: Função para o botão "Desbloquear"
  const handleDesbloquear = () => {
    // No futuro, isso levaria para a página de pagamento
    alert("Você precisa de um plano para ver o contato!");
  };

  return (
    <div className="detalhes-container">
      <div className="coluna-perfil">
        <img src={costureiro.imageUrl} alt={costureiro.nome} className="foto-perfil" />
        <h1 className="nome-perfil">{costureiro.nome}</h1>
        <p className="categoria-perfil">{costureiro.categoria}</p>
        
        {/* --- LÓGICA DE BLOQUEIO APLICADA AQUI --- */}
        {isAssinante ? (
          <>
            {/* O que um USUÁRIO PAGANTE vê */}
            <p className="contato-perfil">Contato: {costureiro.contato}</p>
            <p className="endereco-perfil">Endereço: {costureiro.endereco}</p>
          </>
        ) : (
          <>
            {/* O que um USUÁRIO GRÁTIS vê */}
            <p className="contato-perfil">Contato: (81) 9****-****</p>
            <p className="endereco-perfil">Endereço: {costureiro.endereco.substring(0, 10)}********</p>
            <button className="btn-desbloquear" onClick={handleDesbloquear}>
              Desbloquear contato
            </button>
          </>
        )}
      </div>
      <div className="coluna-feedbacks">
        <div className="avaliacao">
          <h2>Avalie este profissional</h2>
          <StarRating /> 
        </div>
        <FeedbackForm />
        <div className="feedbacks-lista">
          <h3>Feedbacks</h3>
          <div className="feedback-item">
            <div className="feedback-usuario-avatar"></div>
            <div className="feedback-conteudo">
              <strong className="feedback-usuario-nome">usuario_223</strong>
              <span className="feedback-texto">Entrega no prazo!</span>
            </div>
          </div>
          <div className="feedback-item">
            <div className="feedback-usuario-avatar"></div>
            <div className="feedback-conteudo">
              <strong className="feedback-usuario-nome">usuario_225</strong>
              <span className="feedback-texto">Muito Eficiente!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default InfoCostureiroPage;