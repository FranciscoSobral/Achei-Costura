import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getCostureiros, getCostureirosDestaque, getUserProfileImageById } from '../../data/api';
import Card from '../../components/Card';
import './style.css';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [costureiros, setCostureiros] = useState([]);
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indexDestaque, setIndexDestaque] = useState(0);
  const [imagensCarregadas, setImagensCarregadas] = useState({});
  const [imagensFalha, setImagensFalha] = useState({});

  // --- 1. Função para carregar imagem com controle de falhas ---
  const carregarImagem = useCallback(async (costureiroId) => {
    // Se já carregou ou já falhou, não tenta novamente
    if (imagensCarregadas[costureiroId] || imagensFalha[costureiroId]) return;

    try {
      const url = await getUserProfileImageById(costureiroId);
      if (url) {
        setImagensCarregadas(prev => ({ ...prev, [costureiroId]: url }));
      } else {
        // Marca como falha (ex: 404) para não tentar novamente
        setImagensFalha(prev => ({ ...prev, [costureiroId]: true }));
      }
    } catch (error) {
      console.error('Erro ao carregar imagem', costureiroId, error);
      setImagensFalha(prev => ({ ...prev, [costureiroId]: true }));
    }
  }, [imagensCarregadas, imagensFalha]);

  // --- 2. Buscar dados iniciais (costureiros e destaques) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const todos = await getCostureiros();
        setCostureiros(todos);
        const tops = await getCostureirosDestaque(5);
        setDestaques(tops.length > 0 ? tops : todos.slice(0, 2));
      } catch (error) {
        console.error('Erro ao carregar home:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- 3. Disparar carregamento de imagens apenas para perfis desbloqueados ---
  useEffect(() => {
    costureiros.forEach(costureiro => {
      if (costureiro.unlocked && !imagensCarregadas[costureiro.id] && !imagensFalha[costureiro.id]) {
        carregarImagem(costureiro.id);
      }
    });
  }, [costureiros, imagensCarregadas, imagensFalha, carregarImagem]);

  // --- 4. Carregar imagem do destaque atual (com a mesma lógica) ---
  useEffect(() => {
    if (destaques.length === 0) return;
    const usuario = destaques[indexDestaque];
    if (usuario?.id && !imagensCarregadas[usuario.id] && !imagensFalha[usuario.id]) {
      carregarImagem(usuario.id);
    }
  }, [indexDestaque, destaques, imagensCarregadas, imagensFalha, carregarImagem]);

  // --- 5. Navegação do carrossel ---
  const mudarDestaque = (direcao) => {
    if (destaques.length === 0) return;
    if (direcao === 'prox') {
      setIndexDestaque((prev) => (prev + 1) % destaques.length);
    } else {
      setIndexDestaque((prev) => (prev - 1 + destaques.length) % destaques.length);
    }
  };

  // --- 6. Prepara dados para exibição (inclui a imagem se disponível) ---
  const prepararDados = (item) => ({
    id: item.id,
    nome: item.name,
    foto: imagensCarregadas[item.id] || 'https://via.placeholder.com/150',
    categoria: item.category || 'Costura Geral',
    cidade: item.city && item.state ? `${item.city} - ${item.state}` : (item.city || 'Local não informado'),
    avaliacao: item.ratingAverage || 0,
    servicos: item.category ? [item.category] : ['Costura'],
    verified: item.verified || false,
    unlocked: item.unlocked || false,
  });

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  const usuarioDestaque = destaques.length > 0 ? prepararDados(destaques[indexDestaque]) : null;

  return (
    <div className="home-container">
      {/* Seção de destaque */}
      {destaques.length > 0 && usuarioDestaque && (
        <section className="destaque-section">
          <div className="destaque-card">
            <button className="nav-btn prev" onClick={() => mudarDestaque('ant')}>&lt;</button>
            <div className="destaque-conteudo">
              <div className="destaque-foto-wrapper">
                <img src={usuarioDestaque.foto} alt={usuarioDestaque.nome} />
                <span className="badge-vip">⭐ Destaque</span>
              </div>
              <div className="destaque-info">
                <h3>{usuarioDestaque.nome}</h3>
                <p className="cargo">{usuarioDestaque.categoria}</p>
                <p className="local">{usuarioDestaque.cidade}</p>
                <Link to={`/costureiros/${usuarioDestaque.id}`} className="btn-ver-perfil">
                  Ver Perfil
                </Link>
              </div>
            </div>
            <button className="nav-btn next" onClick={() => mudarDestaque('prox')}>&gt;</button>
          </div>
        </section>
      )}

      {/* Grid de cards */}
      <div className="home-grid-area">
        <div className="top-bar">
          <h2 className="titulo-secao">Facções Disponíveis</h2>
          <div className="filtros-modernos">
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>Ordenar por</option>
                <option value="recentes">Mais recentes</option>
                <option value="relevancia">Relevância</option>
              </select>
            </div>
            <div className="select-wrapper">
              <select defaultValue="">
                <option value="" disabled>Filtrar por Cidade</option>
                <option value="todas">Todas as Cidades</option>
              </select>
            </div>
          </div>
        </div>

        <div className="cards-grid">
          {costureiros.map((costureiro) => {
            const item = prepararDados(costureiro);
            return (
              <Card
                key={item.id}
                id={item.id}
                nome={item.nome}
                imagem={item.foto}
                cidade={item.cidade}
                avaliacao={item.avaliacao}
                servicos={item.servicos}
                premiumRequired={!item.verified}
                jaDesbloqueou={item.unlocked}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;