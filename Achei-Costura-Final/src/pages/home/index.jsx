import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCostureiros } from '../../data/api'; // Importando dados da API
import Card from '../../components/Card/index.jsx'; // Verifique se o caminho está certo
import './style.css';
import { useAuth } from '../../context/AuthContext';

const Home = () => {

  // Use o hook useAuth para acessar o contexto
  const { user } = useAuth();

  // 1. Busca os dados da API
  const todosCostureiros = getCostureiros();

  // --- CORREÇÃO 1: Definindo a lista principal para o Grid de cards ---
  // Se quiser tirar os destaques da lista de baixo, você pode filtrar aqui.
  // Por enquanto, vou deixar todos:
  const listaCostureiras = todosCostureiros; 

  // 2. Filtra APENAS Gabriel e Sara para o Destaque
  const usuariosHome = todosCostureiros
  
  .filter(user => user.isDestaque === true) 
  .map(user => ({
     ...user,
     foto: user.foto_url
  }));

  // Lógica do Carrossel
  const [indexDestaque, setIndexDestaque] = useState(0);

  const mudarDestaque = (direcao) => {
    if (direcao === 'prox') {
      setIndexDestaque((prev) => (prev + 1) % usuariosHome.length);
    } else {
      setIndexDestaque((prev) => (prev - 1 + usuariosHome.length) % usuariosHome.length);
    }
  };

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
                {/* Verifica se existe foto, senão põe placeholder */}
                <img src={usuarioDestaque.foto || "https://via.placeholder.com/150"} alt={usuarioDestaque.nome} />
                <span className="badge-vip">⭐ Destaque</span>
              </div>

              <div className="destaque-info">
                <h3>{usuarioDestaque.nome}</h3>
                <p className="cargo">{usuarioDestaque.categoria || "Costura Geral"}</p>
                <p className="local">{usuarioDestaque.cidade}</p>
                
                {/* Link para o perfil */}
                <Link to={`/perfil/${usuarioDestaque.id}`} className="btn-ver-perfil">
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

        {/* --- GRID DE CARDS --- */}
        <div className="cards-grid"> 
          {/* Adicionei uma div wrapper se quiser estilizar o grid no CSS (display: grid/flex) */}
          
          {listaCostureiras.map((costureira) => (
            <Card
              key={costureira.id}
              id={costureira.id}
              nome={costureira.nome}
              // CORREÇÃO 2: Verifique se sua API manda 'imageUrl' ou 'foto_url'
              imagem={costureira.imageUrl || costureira.foto_url} 
              cidade={costureira.cidade}
              avaliacao={costureira.nota || "5.0"} // Valor padrão se não tiver nota
              servicos={costureira.tags || ["Costura", "Acabamento"]} // Valor padrão
              
              // Define se precisa pagar pra ver
              premiumRequired={true} 
              
              // Simula se o usuário já desbloqueou (Isso virá do backend depois)
              jaDesbloqueou={costureira.desbloqueado_pelo_usuario || false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;