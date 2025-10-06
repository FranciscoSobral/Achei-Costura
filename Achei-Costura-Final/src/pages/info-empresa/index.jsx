import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css'; 
import { getEmpresaById } from '../../data/api';

function InfoEmpresaPage() {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);

  // NOVIDADE: Um estado para simular se o usuário é assinante
  // Mude para 'true' para ver como um usuário pagante veria a página
  const [isAssinante, setIsAssinante] = useState(false);

  useEffect(() => {
    const encontrada = getEmpresaById(id);
    setEmpresa(encontrada);
  }, [id]);

  if (!empresa) {
    return <div>Carregando informações da empresa...</div>;
  }

  // NOVIDADE: Uma função para simular o clique no botão
  const handleDesbloquear = () => {
    if (isAssinante) {
      alert("Contato já desbloqueado!");
    } else {
      // No futuro, isso levaria para a página de pagamento
      alert("Você precisa de um plano para ver o contato! Redirecionando para a página de planos...");
    }
  };

  return (
    <div className="detalhes-container"> 
      <div className="coluna-perfil">
        <img src={empresa.imageUrl} alt={empresa.nome} className="foto-perfil" />
        <h1 className="nome-perfil">{empresa.nome}</h1>
        <p className="categoria-perfil">{empresa.categoria}</p>

        {/* --- LÓGICA DE BLOQUEIO APLICADA AQUI --- */}
        {isAssinante ? (
          <>
            {/* O que um USUÁRIO PAGANTE vê */}
            <p className="contato-perfil">Contato: {empresa.contato}</p>
            <p className="endereco-perfil">Endereço: {empresa.endereco}</p>
          </>
        ) : (
          <>
            {/* O que um USUÁRIO GRÁTIS vê */}
            <p className="contato-perfil">Contato: (81) 9****-****</p>
            <p className="endereco-perfil">Endereço: Rua Go*******, *******, Centro, Caruaru</p>
            <button className="btn-desbloquear" onClick={handleDesbloquear}>
              Desbloquear contato
            </button>
          </>
        )}
      </div>

      <div className="coluna-feedbacks">
        {/* ... o resto da sua página de feedbacks continua igual ... */}
      </div>
    </div>
  );
}

export default InfoEmpresaPage;