import React, { useState, useEffect } from 'react';
import { getEmpresas } from '../../data/api';      
import { getCostureiros } from '../../data/api';  
import GridDeItens from '../../components/GridDeItens'; 
import './style.css'; 
function HomePage() {
  const [todosOsItens, setTodosOsItens] = useState([]);
  const [itensFiltrados, setItensFiltrados] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('Geral');

  useEffect(() => {
    const empresas = getEmpresas();
    const costureiros = getCostureiros();
    const empresasComTipo = empresas.map(item => ({ ...item, tipo: 'empresas' }));
    const costureirosComTipo = costureiros.map(item => ({ ...item, tipo: 'costureiros' }));

    setTodosOsItens([...empresasComTipo, ...costureirosComTipo]);
  }, []);

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

      <GridDeItens itens={itensFiltrados} />
    </div>
  );
}

export default HomePage;