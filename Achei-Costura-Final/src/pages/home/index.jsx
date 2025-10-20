import React, { useState, useEffect } from 'react';
import { getCostureiros } from '../../data/api'; // Importa APENAS a função de costureiros
import GridDeItens from '../../components/GridDeItens';
import Filtros from '../../components/Filtros';
import AnuncioCarrossel from '../../components/AnuncioCarrossel';
import './style.css'; 

function HomePage() {
  const [allCostureiros, setAllCostureiros] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  // Busca apenas os dados dos costureiros
  useEffect(() => {
    const costureiros = getCostureiros();
    setAllCostureiros(costureiros);
    setFilteredItems(costureiros); // Define os itens iniciais
  }, []);

  // Filtra a lista de costureiros apenas pela cidade
  useEffect(() => {
    let itemsToFilter = allCostureiros;

    if (selectedCity) {
      itemsToFilter = allCostureiros.filter(item => item.cidade === selectedCity);
    }

    setFilteredItems(itemsToFilter);
    
  }, [selectedCity, allCostureiros]);

  return (
    <div className="home-container">
      {/* O Carrossel mostrará apenas costureiros */}
      <AnuncioCarrossel items={allCostureiros} />

      {/* Renderiza o componente de Filtros simplificado */}
      <Filtros
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      {/* O Grid exibe os costureiros filtrados */}
      <GridDeItens itens={filteredItems} />
    </div>
  );
}

export default HomePage;