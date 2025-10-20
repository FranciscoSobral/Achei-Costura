import React from 'react';
import './style.css'; 

function Filtros({ selectedCity, setSelectedCity }) {
  const cidades = ["Todas as Cidades", "Caruaru - PE", "Toritama - PE", "Santa Cruz do Capibaribe - PE"];

  return (
    <div className="filtros-container-simplificado">
      {/* 1. TÍTULO ADICIONADO AQUI */}
      <h3 className="filtros-titulo">Costureiros Disponíveis</h3>

      <div className="location-select-container">
        <select 
          className="location-select"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cidades.map(cidade => (
            <option key={cidade} value={cidade === "Todas as Cidades" ? "" : cidade}>
              {cidade}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filtros;