import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaStar, FaCoins } from 'react-icons/fa'; // Ícones
import SpeechButton from '../../components/SpeechButton';
import coinsImg from '../../assets/coins.png'; // Imagem das coins
import './style.css';

const PlanosPage = () => {
  
  // --- Textos para o Áudio ---
  const textoPlanoMensal = "Plano Mensal. Benefícios: Desbloqueie todos os contatos por 1 mês. Navegação sem anúncios de terceiros, item indisponível. Ideal para projetos rápidos e imediatos.";
  const textoPlanoTrimestral = "Plano Trimestral, o mais popular. Benefícios: Desbloqueie todos os contatos por 3 meses. Navegação sem anúncios de terceiros. Suporte prioritário. Ótimo custo-benefício para projetos recorrentes.";
  const textoPlanoSemestral = "Plano Semestral. Benefícios: Desbloqueie todos os contatos por 6 meses. Navegação sem anúncios de terceiros. Suporte prioritário. Máxima economia com o melhor valor a longo prazo.";
  const textoPlanoAnual = "Plano Anual. Benefícios: Acesso anual. Desbloqueie todos os contatos durante 1 ano inteiro. Suporte Premium e acesso antecipado a novidades. Navegação sem anúncios de terceiros.";
  const textoCoins = "Comprar AC Coins. Compre moedas para desbloquear facções individualmente. Uma moeda equivale a um desbloqueio. Sem mensalidade ou fidelidade.";
  
  // NOVO: Texto do Carrossel
  const textoCarrossel = "Anúncio. Destaque Máximo. Sua marca ou perfil aparece no topo da página inicial com alta visibilidade. Ideal para promover lançamentos ou vagas urgentes. Foto Gigante na Home. 7 dias de Destaque. Alta Visibilidade.";

  return (
    <div className="planos-container">
      
      <div className="planos-header">
        <h1 className="titulo-principal">Nossos Planos</h1>
        <p className="subtitulo">Escolha a melhor opção para o seu negócio</p>
      </div>

      <div className="planos-grid">
        
        {/* 1. MENSAL */}
        <div className="plano-card">
          <div className="card-top-actions">
             <SpeechButton textToSpeak={textoPlanoMensal} />
          </div>
          <div className="plano-nome">Mensal</div>
          <p className="plano-desc">Ideal para projetos rápidos.</p>
          <hr />
          <ul className="lista-beneficios">
            <li><FaCheck className="icon-check" /> Acesso total por 1 mês</li>
            <li><FaCheck className="icon-check" /> Contatos liberados</li>
            <li className="inativo">Sem anúncios</li>
          </ul>
          <Link to="/pagamento?plano=mensal" className="btn-plano btn-outline">
            Assinar Agora
          </Link>
        </div>

        {/* 2. TRIMESTRAL (DESTAQUE) */}
        <div className="plano-card destaque">
          <div className="badge-recomendado"><FaStar /> Mais Popular</div>
          <div className="card-top-actions">
             <SpeechButton textToSpeak={textoPlanoTrimestral} />
          </div>
          <div className="plano-nome">Trimestral</div>
          <p className="plano-desc">Ótimo custo-benefício.</p>
          <hr />
          <ul className="lista-beneficios">
            <li><FaCheck className="icon-check" /> Acesso por 3 meses</li>
            <li><FaCheck className="icon-check" /> <strong>Sem anúncios</strong></li>
            <li><FaCheck className="icon-check" /> Suporte Prioritário</li>
          </ul>
          <Link to="/pagamento?plano=trimestral" className="btn-plano btn-cheio">
            Assinar Agora
          </Link>
        </div>

        {/* 3. SEMESTRAL */}
        <div className="plano-card">
          <div className="card-top-actions">
             <SpeechButton textToSpeak={textoPlanoSemestral} />
          </div>
          <div className="plano-nome">Semestral</div>
          <p className="plano-desc">Máxima economia.</p>
          <hr />
          <ul className="lista-beneficios">
            <li><FaCheck className="icon-check" /> Acesso por 6 meses</li>
            <li><FaCheck className="icon-check" /> Sem anúncios</li>
            <li><FaCheck className="icon-check" /> Suporte Prioritário</li>
          </ul>
          <Link to="/pagamento?plano=semestral" className="btn-plano btn-outline">
            Assinar Agora
          </Link>
        </div>

        {/* 4. ANUAL */}
        <div className="plano-card">
          <div className="card-top-actions">
             <SpeechButton textToSpeak={textoPlanoAnual} />
          </div>
          <div className="plano-nome">Anual</div>
          <p className="plano-desc">Acesso completo o ano todo.</p>
          <hr />
          <ul className="lista-beneficios">
            <li><FaCheck className="icon-check" /> 1 ano de acesso</li>
            <li><FaCheck className="icon-check" /> Suporte Premium</li>
            <li><FaCheck className="icon-check" /> Novidades antecipadas</li>
          </ul>
          <Link to="/pagamento?plano=anual" className="btn-plano btn-outline">
            Assinar Agora
          </Link>
        </div>

        {/* 5. COINS (CARD ESPECIAL) */}
        <div className="plano-card card-coins-style">
          <div className="card-top-actions">
             <SpeechButton textToSpeak={textoCoins} />
          </div>
          <div className="plano-nome">AC COINS</div>
          
          {/* Imagem das moedas */}
          <div className="img-coins-wrapper">
            <img src={coinsImg} alt="Moedas" />
          </div>

          <p className="plano-desc">Pague apenas pelo que usar.</p>
          <hr />
          <ul className="lista-beneficios">
            <li><FaCoins className="icon-check gold" /> 1 Moeda = 1 Desbloqueio</li>
            <li><FaCheck className="icon-check" /> Sem mensalidade</li>
            <li><FaCheck className="icon-check" /> As moedas não expiram</li>
          </ul>
          <Link to="/pagamento?plano=coins" className="btn-plano btn-gold">
            Comprar Moedas
          </Link>
        </div>

        {/* 6. NOVO: ANÚNCIO CARROSSEL */}
        <div className="plano-card">
          <div className="badge-recomendado" style={{ backgroundColor: '#e74c3c' }}>🚀 Destaque Extra</div>
          <div className="card-top-actions">
             <SpeechButton textToSpeak={textoCarrossel} />
          </div>
          <div className="plano-nome">Seu anuncio</div>
          <p className="plano-desc">Sua marca no topo da Home.</p>
          <hr />
          <ul className="lista-beneficios">
            <li><FaCheck className="icon-check" /> Foto Gigante na Home</li>
            <li><FaCheck className="icon-check" /> 7 dias de Destaque</li>
            <li><FaCheck className="icon-check" /> Alta Visibilidade</li>
          </ul>
          <Link to="/pagamento?plano=carrossel" className="btn-plano btn-cheio">
            Quero Destacar
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PlanosPage;