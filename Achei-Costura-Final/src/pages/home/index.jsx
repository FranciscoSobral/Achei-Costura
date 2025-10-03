import React, { useState, useEffect } from 'react';
import { getEmpresas } from '../../data/api';      // Importa nossa lista de empresas
import { getCostureiros } from '../../data/api';   // Importa nossa lista de costureiros
import GridDeItens from '../../components/GridDeItens'; // Nosso grid genérico
import './style.css'; // O arquivo de estilo para esta página

function HomePage() {
  // Estado para guardar a lista COMPLETA de todos os itens
  const [todosOsItens, setTodosOsItens] = useState([]);
  // Estado para guardar apenas os itens que serão exibidos na tela
  const [itensFiltrados, setItensFiltrados] = useState([]);
  // Estado para saber qual botão de filtro está ativo
  const [filtroAtivo, setFiltroAtivo] = useState('Geral'); // Começa com 'Geral'

  // 1. Busca e junta os dados uma única vez, quando a página carrega
  useEffect(() => {
    const empresas = getEmpresas();
    const costureiros = getCostureiros();
    // Adiciona uma propriedade 'tipo' em cada item para sabermos diferenciá-los
    const empresasComTipo = empresas.map(item => ({ ...item, tipo: 'empresas' }));
    const costureirosComTipo = costureiros.map(item => ({ ...item, tipo: 'costureiros' }));

    setTodosOsItens([...empresasComTipo, ...costureirosComTipo]);
  }, []);

  // 2. Filtra a lista sempre que o filtro ativo ou a lista principal mudar
  useEffect(() => {
    if (filtroAtivo === 'Geral') {
      setItensFiltrados(todosOsItens);
    } else if (filtroAtivo === 'Empresas') {
      const filtrados = todosOsItens.filter(item => item.tipo === 'empresas');
      setItensFiltrados(filtrados);
    } else if (filtroAtivo === 'Costureiros') {
      const filtrados = todosOsItens.filter(item => item.tipo === 'costureiros');
      setItensFiltrados(filtrados);
    }
  }, [filtroAtivo, todosOsItens]);

  return (
    <div className="home-container">
      {/* O carrossel de destaque virá aqui no futuro */}
      {/* <HeroCarousel /> */}

      <div className="filtros-principais">
        <button 
          className={`filtro-btn ${filtroAtivo === 'Geral' ? 'active' : ''}`}
          onClick={() => setFiltroAtivo('Geral')}
        >
          Geral
        </button>
        <button 
          className={`filtro-btn ${filtroAtivo === 'Costureiros' ? 'active' : ''}`}
          onClick={() => setFiltroAtivo('Costureiros')}
        >
          Costureiros
        </button>
        <button 
          className={`filtro-btn ${filtroAtivo === 'Empresas' ? 'active' : ''}`}
          onClick={() => setFiltroAtivo('Empresas')}
        >
          Empresas
        </button>
      </div>

      {/* Usamos nosso grid genérico para exibir os itens filtrados */}
      <GridDeItens itens={itensFiltrados} />
    </div>
  );
}

export default HomePage;