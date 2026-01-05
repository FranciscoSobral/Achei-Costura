import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCostureiros } from '../../data/api'; // Importando dados da API
import Card from '../../components/Card/index.jsx';
import './style.css'; 
import { useAuth } from '../../context/AuthContext';

const Home = () => {

  // Use o hook useAuth para acessar o contexto
  const { user, login, isLoggedIn } = useAuth();

  // 1. Busca os dados da API
  const todosCostureiros = getCostureiros();

  // 2. Filtra APENAS Gabriel e Sara e adapta os dados para o layout da Home
  const usuariosHome = todosCostureiros
    .filter(user => user.nome.includes("Gabriel") || user.nome.includes("Sara"))
    .map(user => ({
      ...user,
      foto: user.imageUrl, // A API usa 'imageUrl', mas o layout usa 'foto'
      destaque: true       // Força ambos como destaque para o carrossel
    }));

  // DEBUG: Verifique se os dados estão chegando
  console.log('🏠 Home - Total de costureiros:', todosCostureiros.length);
  console.log('🏠 Home - Usuários filtrados:', usuariosHome);

  // Lógica do Carrossel (usando a lista filtrada)
  const [indexDestaque, setIndexDestaque] = useState(0);

  const mudarDestaque = (direcao) => {
    if (direcao === 'prox') {
      setIndexDestaque((prev) => (prev + 1) % usuariosHome.length);
    } else {
      setIndexDestaque((prev) => (prev - 1 + usuariosHome.length) % usuariosHome.length);
    }
  };

  // Garante que o usuário destaque existe (caso a lista esteja vazia por algum erro)
  const usuarioDestaque = usuariosHome[indexDestaque] || {};

  return (
    <div className="home-container">
      
      {/* 1. ÁREA DE DESTAQUE PREMIUM */}
      {usuariosHome.length > 0 && (
        <section className="destaque-section">
          <div className="destaque-card">
            
            <button className="nav-btn prev" onClick={() => mudarDestaque('ant')}>
               &lt;
            </button>
            
            <div className="destaque-conteudo">
              <div className="destaque-foto-wrapper">
                 <img src={usuarioDestaque.foto} alt={usuarioDestaque.nome} />
                 <span className="badge-vip">⭐ Destaque</span>
              </div>
              
              <div className="destaque-info">
                <h3>{usuarioDestaque.nome}</h3>
                <p className="cargo">{usuarioDestaque.categoria}</p>
                <p className="local">{usuarioDestaque.cidade}</p>
                {/* Link corrigido para a rota definida no AppRoutes */}
                <Link to={`/costureiros/${usuarioDestaque.id}`} className="btn-ver-perfil">
                  Ver Perfil
                </Link>
              </div>
            </div>

            <button className="nav-btn next" onClick={() => mudarDestaque('prox')}>
               &gt;
            </button>

          </div>
        </section>
      )}

      {/* 2. MIOLO DA PÁGINA */}
      <div className="main-content">
        
        {/* BARRA DE TÍTULO E FILTROS */}
        <div className="top-bar">
          <h2 className="titulo-secao">Facções Disponíveis</h2>
          
          <div className="filtros-modernos">
            <div className="select-wrapper">
              <select>
                <option>Ordenar por</option>
                <option>Mais recentes</option>
                <option>Relevância</option>
              </select>
            </div>
            <div className="select-wrapper">
              <select>
                <option>Todas as Cidades</option>
                <option>Caruaru</option>
                <option>Toritama</option>
                <option>Santa Cruz</option>
              </select>
            </div>
          </div>
        </div>

        {/* GRID DE CARDS - AGORA USANDO O COMPONENTE CARD */}
        <div className="cards-grid">
          {usuariosHome.map((user) => (
            <Card
              key={user.id}
              id={user.id}
              imagem={user.foto || user.imageUrl} //  a foto ou imageUrl
              nome={user.nome}
              cidade={user.cidade}
              avaliacao={user.avaliacao}
              servicos={[user.categoria]} // Transforma a categoria em array para servicos
              premiumRequired={true} // Defina como true para testar a censura
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;