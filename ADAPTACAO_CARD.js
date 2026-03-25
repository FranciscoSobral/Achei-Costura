/**
 * GUIA DE ADAPTAÇÃO DO CARD EXISTENTE
 * 
 * Se você já tem um componente Card na sua plataforma,
 * este guia mostra como adaptá-lo para exibir serviços
 */

import React from 'react';

// ========================================
// CARD GENÉRICO ADAPTÁVEL
// ========================================

/**
 * Card - Componente reutilizável para costureiros e serviços
 * 
 * Props:
 * - tipo: 'costureiro' | 'servico'
 * - dados: objeto com dados a serem exibidos
 * - onAction: callback para ação principal (desbloquear/candidatar)
 */

export function Card({ tipo, dados, onAction, actionLabel, actionDisabled }) {
  if (tipo === 'costureiro') {
    return <CardCostureiro dados={dados} onDesbloquear={onAction} />;
  }
  
  if (tipo === 'servico') {
    return <CardServico dados={dados} onCandidatar={onAction} />;
  }
  
  return null;
}

// ========================================
// CARD DE COSTUREIRO (JÁ EXISTENTE)
// ========================================

function CardCostureiro({ dados, onDesbloquear }) {
  return (
    <div className="card costureiro-card">
      <div className="card-header">
        {dados.fotoDesbloqueada ? (
          <img src={dados.foto} alt={dados.nome} />
        ) : (
          <div className="foto-bloqueada">
            <span>🔒</span>
          </div>
        )}
      </div>
      
      <div className="card-body">
        <h3>{dados.nomeDesbloqueado ? dados.nome : 'Nome bloqueado'}</h3>
        <p>Especialidade: {dados.especialidade}</p>
        <p>Experiência: {dados.experiencia} anos</p>
        <p>Cidade: {dados.cidade}</p>
        
        {dados.desbloqueado ? (
          <div className="contato">
            <p>📱 {dados.telefone}</p>
            <p>✉️ {dados.email}</p>
          </div>
        ) : (
          <div className="info-bloqueio">
            <p>Desbloqueie por {dados.custoMoedas} moedas</p>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        {dados.desbloqueado ? (
          <button disabled className="btn-desbloqueado">
            ✓ Desbloqueado
          </button>
        ) : (
          <button onClick={onDesbloquear} className="btn-desbloquear">
            Desbloquear ({dados.custoMoedas} moedas)
          </button>
        )}
      </div>
    </div>
  );
}

// ========================================
// CARD DE SERVIÇO (NOVO)
// ========================================

function CardServico({ dados, onCandidatar }) {
  return (
    <div className="card servico-card">
      <div className="card-header">
        <div className="empresa-info">
          {dados.empresa.logo ? (
            <img 
              src={dados.empresa.logo} 
              alt={dados.empresa.nome}
              className="empresa-logo"
            />
          ) : (
            <div className="empresa-logo-placeholder">
              🏢
            </div>
          )}
          <div>
            <h4>{dados.empresa.nome}</h4>
            {dados.empresa.verificada && <span className="badge verificado">✓</span>}
          </div>
        </div>
        
        {/* Badges de status */}
        <div className="badges">
          {dados.urgente && <span className="badge urgente">Urgente</span>}
          {dados.destaque && <span className="badge destaque">⭐ Destaque</span>}
        </div>
      </div>
      
      <div className="card-body">
        <h3>{dados.titulo}</h3>
        <p className="descricao">{dados.descricaoCurta}</p>
        
        <div className="categoria">
          <span className="badge categoria">{dados.categoria}</span>
        </div>
        
        <div className="info-grid">
          <div className="info-item">
            <span className="icon">💰</span>
            <span className="valor">R$ {dados.valor.toLocaleString('pt-BR')}</span>
          </div>
          
          <div className="info-item">
            <span className="icon">⏰</span>
            <span>{dados.prazo} dias</span>
          </div>
          
          <div className="info-item">
            <span className="icon">📍</span>
            <span>{dados.cidade} - {dados.estado}</span>
          </div>
          
          <div className="info-item">
            <span className="icon">💼</span>
            <span>{dados.tipoContrato}</span>
          </div>
        </div>
        
        {/* Custo de candidatura */}
        {dados.custoMoedas && (
          <div className="custo-moedas">
            <span className="icon">🪙</span>
            <span>Custa {dados.custoMoedas} moedas para candidatar</span>
          </div>
        )}
      </div>
      
      <div className="card-footer">
        {dados.candidatado ? (
          <button disabled className="btn-candidatado">
            ✓ Candidatura enviada
          </button>
        ) : (
          <button onClick={onCandidatar} className="btn-candidatar">
            Candidatar-se
          </button>
        )}
      </div>
    </div>
  );
}

// ========================================
// ESTILOS CSS (style.css)
// ========================================

const estilosCSS = `
/* Card base */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

/* Header */
.card-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

/* Body */
.card-body {
  padding: 1rem;
}

.card-body h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.card-body .descricao {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Empresa info */
.empresa-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.empresa-logo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.empresa-logo-placeholder {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

/* Badges */
.badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.badge.categoria {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.badge.urgente {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.badge.destaque {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.badge.verificado {
  background: #dbeafe;
  color: #1e40af;
}

/* Info grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
}

.info-item .icon {
  font-size: 1rem;
}

.info-item .valor {
  font-weight: 600;
  color: #059669;
}

/* Custo de moedas */
.custo-moedas {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: #fef3c7;
  border: 1px solid #fde68a;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #92400e;
}

/* Footer */
.card-footer {
  padding: 1rem;
  border-top: 1px solid #eee;
}

/* Botões */
.btn-candidatar,
.btn-desbloquear {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-candidatar:hover,
.btn-desbloquear:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-candidatado,
.btn-desbloqueado {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  background: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

/* Responsivo */
@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}
`;

// ========================================
// EXEMPLO DE USO NO SEU CÓDIGO
// ========================================

function ExemploUso() {
  const [costureiros, setCostureiros] = React.useState([]);
  const [servicos, setServicos] = React.useState([]);

  return (
    <div>
      {/* Grid de costureiros (já existente) */}
      <section className="costureiros-section">
        <h2>Costureiros Disponíveis</h2>
        <div className="cards-grid">
          {costureiros.map(costureiro => (
            <Card
              key={costureiro.id}
              tipo="costureiro"
              dados={costureiro}
              onAction={() => desbloquearCostureiro(costureiro.id)}
            />
          ))}
        </div>
      </section>

      {/* Grid de serviços (novo) */}
      <section className="servicos-section">
        <h2>Serviços Disponíveis</h2>
        <div className="cards-grid">
          {servicos.map(servico => (
            <Card
              key={servico.id}
              tipo="servico"
              dados={servico}
              onAction={() => candidatarServico(servico.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

// ========================================
// MAPEAMENTO DE DADOS
// ========================================

// Se seus dados vêm em formato diferente, mapeie assim:

function mapearServico(servicoDoBackend) {
  return {
    id: servicoDoBackend.id,
    titulo: servicoDoBackend.title || servicoDoBackend.titulo,
    descricaoCurta: servicoDoBackend.shortDescription || servicoDoBackend.descricaoCurta,
    categoria: servicoDoBackend.category || servicoDoBackend.categoria,
    valor: servicoDoBackend.price || servicoDoBackend.valor,
    prazo: servicoDoBackend.deadline || servicoDoBackend.prazo,
    cidade: servicoDoBackend.city || servicoDoBackend.cidade,
    estado: servicoDoBackend.state || servicoDoBackend.estado,
    tipoContrato: servicoDoBackend.contractType || servicoDoBackend.tipoContrato,
    empresa: {
      nome: servicoDoBackend.company?.name || servicoDoBackend.empresa?.nome,
      logo: servicoDoBackend.company?.logo || servicoDoBackend.empresa?.logo,
      verificada: servicoDoBackend.company?.verified || servicoDoBackend.empresa?.verificada,
    },
    custoMoedas: servicoDoBackend.coinCost || servicoDoBackend.custoMoedas,
    candidatado: servicoDoBackend.applied || servicoDoBackend.candidatado,
    urgente: servicoDoBackend.urgent || servicoDoBackend.urgente,
    destaque: servicoDoBackend.featured || servicoDoBackend.destaque,
  };
}

// Uso:
const servicosFormatados = servicosDoBackend.map(mapearServico);

// ========================================
// DICAS DE INTEGRAÇÃO
// ========================================

/*
1. MANTENHA A MESMA ESTRUTURA DE CLASSES CSS
   - Use as mesmas classes para ambos os tipos de card
   - Adicione classe específica apenas quando necessário
   - Exemplo: .card.servico-card vs .card.costureiro-card

2. REUTILIZE COMPONENTES EXISTENTES
   - Se você já tem Badge, Button, Avatar, etc.
   - Importe e use ao invés de criar novos
   - Mantém consistência visual

3. ADAPTE AO SEU DESIGN SYSTEM
   - Cores: use as variáveis CSS da sua marca
   - Tipografia: mantenha fontes e tamanhos consistentes
   - Espaçamentos: siga o grid já estabelecido

4. TESTE AMBOS OS TIPOS
   - Costureiros e serviços devem conviver bem
   - Verifique que os estilos não conflitam
   - Teste responsividade em ambos

5. ESTADOS VISUAIS
   - Loading: mostre skeleton enquanto carrega
   - Erro: feedback claro de problemas
   - Vazio: mensagem quando não há dados
   - Sucesso: confirmação visual de ações
*/

export default Card;
