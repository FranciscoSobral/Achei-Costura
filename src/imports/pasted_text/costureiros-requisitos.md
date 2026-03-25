equisitos Funcionais
1. Estrutura da Página
Deve ser acessível via rota /empresas/buscar (ou /buscar-costureiros).

Utiliza o layout padrão com o Header (já existente).

Conteúdo principal: barra de ferramentas (busca + filtros) e grid de cards.

2. Busca e Filtros
Os filtros devem ser enviados como query parameters para o endpoint de listagem (que já existe: /couturiers/with-unlock-status). Utilize os seguintes campos (todos opcionais):

Busca textual (search): campo de texto para pesquisar por nome ou especialidade.

Especialidade (specialty): lista de checkboxes ou multi-select (ex.: "Moda Praia", "Jeans", "Bordado", etc.). Valores devem ser mapeados para os dados do backend.

Cidade (city): campo de texto com autocomplete ou select (listar cidades disponíveis obtidas da API).

Máquinas (machines): multi-select com opções como "Reta", "Overloque", "Galoneira", "Ponto Cruzado".

Tipo de facção (factionType): multi-select (ex.: "Corte e Costura", "Lavanderia", "Malharia").

Experiência (experienceYears): seleção única com opções: "0-2", "2-5", "5-10", "10+".

Disponibilidade (availability): seleção única: "Manhã", "Tarde", "Integral", "Finais de semana" (mapear para os valores do backend: MORNING, AFTERNOON, MORNING_AFTERNOON, WEEKENDS).

Avaliação mínima (minRating): slider ou estrelas (valores de 0 a 5, step 0.5).

Apenas verificados (verified): checkbox.

Ordenação (sortBy): dropdown com opções: "Mais relevantes" (padrão), "Melhor avaliação", "Mais recentes", "Mais experiência".

3. Listagem de Costureiros
Ao carregar a página (ou ao alterar filtros), fazer uma requisição GET para /couturiers/with-unlock-status incluindo os filtros como query params. A resposta é um array de objetos CouturierDTO, cada um com um campo unlocked (boolean).

Enquanto carrega, exibir skeletons (usar componente Skeleton do shadcn/ui ou criar um placeholder simples).

Se houver erro, mostrar mensagem amigável com botão de tentar novamente.

Se não houver resultados, exibir mensagem "Nenhum costureiro encontrado" e sugerir limpar filtros.

4. Cards de Costureiro
Utilize o componente Card existente (importe de ../../components/Card).

Passe as props necessárias:

id: id do costureiro.

nome: name.

imagem: será tratada pelo próprio Card (ele já recebe a prop imagem, mas a lógica de carregamento da foto real pode ficar na página ou no Card; o ideal é que a página já passe a URL da imagem se disponível, ou deixe que o Card a carregue via getUserProfileImageById após desbloqueio).

cidade: city + state (formate como "Cidade - UF").

avaliacao: ratingAverage (número).

servicos: array com a especialidade principal (pode ser [category]).

premiumRequired: use !verified (se não for verificado, requer premium/desbloqueio).

jaDesbloqueou: unlocked (vindo da API).

O componente Card já trata:

Se user.plano for 'gold' ou 'pro' (assinante), o card mostra botão "Acessar (VIP)" e leva ao perfil sem custo.

Caso contrário e jaDesbloqueou for false, mostra botão "Desbloquear com 1 Coin", que chama a função unlockProfile do contexto e atualiza o estado local.

Após desbloqueio, o card deve refletir o novo estado (jaDesbloqueou se torna true) e o saldo no header será atualizado automaticamente pelo contexto.

5. Carregamento de Imagens
Para evitar chamadas desnecessárias à API de imagens, a página deve gerenciar um estado de imagens carregadas (imagensCarregadas) e só carregar a imagem quando o perfil estiver desbloqueado (usando getUserProfileImageById). Como o Card pode não ter essa lógica, você pode:

No Card, já existe um placeholder; mas você pode passar a URL da imagem pronta como prop imagem caso já tenha sido carregada.

Alternativa: adicionar um useEffect na página que, para cada costureiro com unlocked = true, dispara getUserProfileImageById e armazena a URL em um estado imagensUrl, depois repassa para o Card.

Recomendo esta última para manter o Card simples e centralizar o gerenciamento de imagens na página.

6. Filtros: Estado e Comportamento
Crie um estado filtros (objeto) com todos os campos mencionados.

Adicione funções para atualizar cada filtro (ex.: handleFilterChange).

Para campos de múltipla escolha, utilize arrays.

Para evitar chamadas excessivas à API, use useEffect com debounce (300ms) para o campo de busca textual e para os outros filtros, você pode aplicar um botão "Aplicar filtros" ou atualizar automaticamente ao mudar (recomendo automático para checkboxes e selects, mas com cuidado para não sobrecarregar).

Inclua um botão "Limpar filtros" que reseta todos os filtros para os valores padrão e refaz a busca.

7. Responsividade
Em telas menores, os filtros podem ser agrupados em um drawer/modal que se abre ao clicar em um botão "Filtrar".

A grid de cards deve usar CSS Grid com colunas responsivas: 1 coluna em mobile, 2 em tablet, 3 ou 4 em desktop.

O cabeçalho com título "Encontrar costureiros" deve se adaptar.

8. Integração com Contexto e API
Use useAuth() para acessar user e unlockProfile.

Crie uma função buscarCostureiros em api.js (ou dentro do componente) que faz a requisição com os parâmetros.

A rota é GET /couturiers/with-unlock-status. Certifique-se de que o token é enviado automaticamente pelo interceptor do axios.

Código de Exemplo (Estrutura Sugerida)
jsx
// src/pages/BuscaCostureiros/index.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { buscarCostureiros, getUserProfileImageById } from '../../data/api';
import Card from '../../components/Card';
import { Search, Filter, X } from 'lucide-react'; // ícones opcionais
import './style.css';

const FILTROS_PADRAO = {
  search: '',
  specialty: [],
  city: '',
  machines: [],
  factionType: [],
  experienceYears: '',
  availability: '',
  minRating: 0,
  verified: false,
  sortBy: 'relevance',
};

const BuscaCostureiros = () => {
  const { user } = useAuth();
  const [filtros, setFiltros] = useState(FILTROS_PADRAO);
  const [costureiros, setCostureiros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagensUrl, setImagensUrl] = useState({});
  const [imagensFalha, setImagensFalha] = useState({});

  const debounceTimeout = useRef();

  // Função para buscar costureiros (simula api)
  const carregarCostureiros = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { ...filtros };
      // converter arrays para string separada por vírgulas, se o backend esperar
      if (params.specialty.length) params.specialty = params.specialty.join(',');
      if (params.machines.length) params.machines = params.machines.join(',');
      if (params.factionType.length) params.factionType = params.factionType.join(',');
      // remover campos vazios
      Object.keys(params).forEach(key => {
        if (params[key] === '' || (Array.isArray(params[key]) && !params[key].length)) delete params[key];
      });
      const data = await api.get('/couturiers/with-unlock-status', { params });
      setCostureiros(data);
      // Resetar imagens ao mudar a lista
      setImagensUrl({});
      setImagensFalha({});
    } catch (err) {
      setError('Erro ao carregar costureiros. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  // Efeito com debounce para busca textual
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      carregarCostureiros();
    }, 300);
    return () => clearTimeout(debounceTimeout.current);
  }, [filtros.search, carregarCostureiros]);

  // Para outros filtros, podemos recarregar imediatamente (ou usar debounce também)
  useEffect(() => {
    carregarCostureiros();
  }, [
    filtros.specialty,
    filtros.city,
    filtros.machines,
    filtros.factionType,
    filtros.experienceYears,
    filtros.availability,
    filtros.minRating,
    filtros.verified,
    filtros.sortBy,
  ]);

  // Carregar imagens apenas para perfis desbloqueados
  useEffect(() => {
    costureiros.forEach(async (c) => {
      if (c.unlocked && !imagensUrl[c.id] && !imagensFalha[c.id]) {
        try {
          const url = await getUserProfileImageById(c.id);
          if (url) {
            setImagensUrl(prev => ({ ...prev, [c.id]: url }));
          } else {
            setImagensFalha(prev => ({ ...prev, [c.id]: true }));
          }
        } catch {
          setImagensFalha(prev => ({ ...prev, [c.id]: true }));
        }
      }
    });
  }, [costureiros, imagensUrl, imagensFalha]);

  // Handlers para atualizar filtros
  const handleSearchChange = (e) => {
    setFiltros(prev => ({ ...prev, search: e.target.value }));
  };

  const handleMultiSelect = (field, value) => {
    setFiltros(prev => {
      const current = prev[field];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleSelect = (field, value) => {
    setFiltros(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckbox = (field, checked) => {
    setFiltros(prev => ({ ...prev, [field]: checked }));
  };

  const limparFiltros = () => {
    setFiltros(FILTROS_PADRAO);
  };

  // Renderização dos filtros (pode ser um componente separado)
  const renderFiltros = () => (
    <div className="filtros-painel">
      {/* Campo de busca textual */}
      <div className="filtro-busca">
        <input
          type="text"
          placeholder="Buscar por nome ou especialidade..."
          value={filtros.search}
          onChange={handleSearchChange}
        />
        <Search size={18} />
      </div>

      {/* Especialidades (exemplo) */}
      <div className="filtro">
        <label>Especialidade</label>
        <div className="checkbox-group">
          {['Moda Praia', 'Jeans', 'Bordado', 'Malharia'].map(esp => (
            <label key={esp}>
              <input
                type="checkbox"
                checked={filtros.specialty.includes(esp)}
                onChange={() => handleMultiSelect('specialty', esp)}
              />
              {esp}
            </label>
          ))}
        </div>
      </div>

      {/* Cidade */}
      <div className="filtro">
        <label>Cidade</label>
        <input
          type="text"
          placeholder="Digite a cidade"
          value={filtros.city}
          onChange={(e) => handleSelect('city', e.target.value)}
        />
      </div>

      {/* Máquinas (multi-select) */}
      <div className="filtro">
        <label>Máquinas</label>
        <div className="checkbox-group">
          {['Reta', 'Overloque', 'Galoneira'].map(m => (
            <label key={m}>
              <input
                type="checkbox"
                checked={filtros.machines.includes(m)}
                onChange={() => handleMultiSelect('machines', m)}
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      {/* Experiência */}
      <div className="filtro">
        <label>Experiência</label>
        <select
          value={filtros.experienceYears}
          onChange={(e) => handleSelect('experienceYears', e.target.value)}
        >
          <option value="">Todos</option>
          <option value="0-2">0-2 anos</option>
          <option value="2-5">2-5 anos</option>
          <option value="5-10">5-10 anos</option>
          <option value="10+">10+ anos</option>
        </select>
      </div>

      {/* Disponibilidade */}
      <div className="filtro">
        <label>Disponibilidade</label>
        <select
          value={filtros.availability}
          onChange={(e) => handleSelect('availability', e.target.value)}
        >
          <option value="">Todos</option>
          <option value="MORNING">Manhã</option>
          <option value="AFTERNOON">Tarde</option>
          <option value="MORNING_AFTERNOON">Integral</option>
          <option value="WEEKENDS">Finais de semana</option>
        </select>
      </div>

      {/* Avaliação mínima (slider) */}
      <div className="filtro">
        <label>Avaliação mínima: {filtros.minRating} estrelas</label>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={filtros.minRating}
          onChange={(e) => handleSelect('minRating', parseFloat(e.target.value))}
        />
      </div>

      {/* Apenas verificados */}
      <div className="filtro">
        <label>
          <input
            type="checkbox"
            checked={filtros.verified}
            onChange={(e) => handleCheckbox('verified', e.target.checked)}
          />
          Apenas verificados
        </label>
      </div>

      {/* Ordenação */}
      <div className="filtro">
        <label>Ordenar por</label>
        <select
          value={filtros.sortBy}
          onChange={(e) => handleSelect('sortBy', e.target.value)}
        >
          <option value="relevance">Mais relevantes</option>
          <option value="rating">Melhor avaliação</option>
          <option value="recent">Mais recentes</option>
          <option value="experience">Mais experiência</option>
        </select>
      </div>

      <button onClick={limparFiltros} className="btn-limpar">
        Limpar filtros
      </button>
    </div>
  );

  return (
    <div className="busca-costureiros-container">
      <div className="header-hero">
        <h1>Encontre costureiros ideais para seus projetos</h1>
        <p>Utilize os filtros para refinar sua busca e desbloqueie perfis com moedas ou assinatura</p>
      </div>

      <div className="conteudo-principal">
        {/* Painel de filtros (colapsável em mobile) */}
        <aside className="filtros-sidebar">
          {renderFiltros()}
        </aside>

        {/* Grid de resultados */}
        <main className="resultados">
          {loading && (
            <div className="cards-grid">
              {Array(6).fill().map((_, i) => (
                <div key={i} className="skeleton-card">Carregando...</div>
              ))}
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={carregarCostureiros}>Tentar novamente</button>
            </div>
          )}

          {!loading && !error && costureiros.length === 0 && (
            <div className="empty-state">
              <p>Nenhum costureiro encontrado com os filtros selecionados.</p>
              <button onClick={limparFiltros}>Limpar filtros</button>
            </div>
          )}

          {!loading && !error && costureiros.length > 0 && (
            <div className="cards-grid">
              {costureiros.map(costureiro => (
                <Card
                  key={costureiro.id}
                  id={costureiro.id}
                  nome={costureiro.name}
                  imagem={imagensUrl[costureiro.id] || 'https://via.placeholder.com/150'}
                  cidade={`${costureiro.city} - ${costureiro.state}`}
                  avaliacao={costureiro.ratingAverage || 0}
                  servicos={costureiro.category ? [costureiro.category] : []}
                  premiumRequired={!costureiro.verified}
                  jaDesbloqueou={costureiro.unlocked}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BuscaCostureiros;
Observações Finais
Certifique-se de que o endpoint /couturiers/with-unlock-status aceita os query params como descrito. Se o backend ainda não os suporta, você pode mencionar que é necessário ajustá-lo.

A lógica de imagem pode ser refinada para evitar vazamento de memória (revogar URLs quando o componente desmontar).

Reutilize os estilos já existentes (ex.: .cards-grid do Home) ou crie novos no arquivo de estilo da página.

Integre o botão de filtro colapsável em mobile usando um estado showFilters e um ícone de filtro.

Este prompt fornece todas as instruções para que uma IA gere o código frontend completo para a busca de costureiros, reutilizando os componentes e a lógica já existentes.