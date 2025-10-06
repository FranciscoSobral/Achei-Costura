import React from 'react';
import './style.css';

// Componente para um único item da lista de benefícios
const BeneficioItem = ({ texto, disponivel = true }) => (
  <li className={disponivel ? 'disponivel' : 'indisponivel'}>
    <span className="check-icon">{disponivel ? '✔' : '✖'}</span>
    {texto}
  </li>
);

function PlanosPage() {
  return (
    <div className="planos-container">
      <h1 className="planos-titulo">Planos de Assinatura</h1>
      <div className="planos-grid">

        {/* Card do Plano Mensal */}
        <div className="plano-card">
          <h2>Mensal</h2>
          <ul>
            <BeneficioItem texto="Desbloqueie todos os contatos" />
            <BeneficioItem texto="Navegação sem anúncios de terceiros" />
            <BeneficioItem texto="Ideal para projetos rápidos e imediatos" />
          </ul>
          <button className="btn-assinar">Assinar Agora</button>
        </div>

        {/* Card do Plano Trimestral */}
        <div className="plano-card popular">
          <span className="tag-popular">Mais Popular</span>
          <h2>Trimestral</h2>
          <ul>
            <BeneficioItem texto="Desbloqueie todos os contatos" />
            <BeneficioItem texto="Navegação sem anúncios de terceiros" />
            <BeneficioItem texto="Suporte prioritário" />
            <BeneficioItem texto="Ótimo custo-benefício para projetos recorrentes" />
          </ul>
          <button className="btn-assinar">Assinar Agora</button>
        </div>

        {/* Card do Plano Anual */}
        <div className="plano-card">
          <h2>Anual</h2>
          <ul>
            <BeneficioItem texto="Desbloqueie todos os contatos" />
            <BeneficioItem texto="Navegação sem anúncios de terceiros" />
            <BeneficioItem texto="Suporte prioritário" />
            <BeneficioItem texto="Máxima economia com o melhor valor a longo prazo" />
          </ul>
          <button className="btn-assinar">Assinar Agora</button>
        </div>

        {/* Card do Sócio Fundador */}
        <div className="plano-card">
          <h2>Sócio Fundador</h2>
          <ul>
            <BeneficioItem texto="Acesso VITALÍCIO com pagamento único" />
            <BeneficioItem texto="Desbloqueie todos os contatos para sempre" />
            <BeneficioItem texto="Suporte Premium e acesso antecipado a novidades" />
            <BeneficioItem texto="Navegação sem anúncios de terceiros" />
          </ul>
          <button className="btn-assinar">Seja Fundador</button>
        </div>

      </div>
    </div>
  );
}

export default PlanosPage;