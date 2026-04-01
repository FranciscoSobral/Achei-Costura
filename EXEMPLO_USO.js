/**
 * EXEMPLO DE USO - HomeServicos
 * 
 * Este arquivo demonstra como integrar o componente HomeServicos
 * ao seu sistema existente
 */

// ========================================
// 1. IMPORTAÇÕES NECESSÁRIAS
// ========================================

import React from 'react';
import HomeServicos from './components/HomeServicos';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router';

// ========================================
// 2. INTEGRAÇÃO NO APP.TSX
// ========================================

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Página de oportunidades para costureiros */}
          <Route path="/oportunidades" element={<HomeServicos />} />
          
          {/* Outras rotas... */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

// ========================================
// 3. USO DA API (api.js)
// ========================================

import { 
  getServicos, 
  candidatarServico,
  getMinhasCandidaturas 
} from './data/api';

// Exemplo: Buscar serviços com filtros
async function buscarServicos() {
  try {
    const servicos = await getServicos({
      categoria: 'Moda Praia',
      cidade: 'São Paulo',
      ordenar: 'recent',
      busca: 'biquíni',
    });
    
    console.log('Serviços encontrados:', servicos);
    return servicos;
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Exemplo: Candidatar-se a um serviço
async function candidatar() {
  try {
    const resultado = await candidatarServico(
      'job-uuid-123',
      'Tenho 5 anos de experiência em moda praia.'
    );
    
    console.log('Candidatura enviada!', resultado);
    console.log('Novo saldo:', resultado.novoSaldo);
  } catch (error) {
    console.error('Erro ao candidatar:', error.message);
  }
}

// Exemplo: Buscar minhas candidaturas
async function minhasCandidaturas() {
  try {
    const candidaturas = await getMinhasCandidaturas();
    
    console.log('Total de candidaturas:', candidaturas.length);
    candidaturas.forEach(c => {
      console.log(`- ${c.job.titulo} (${c.status})`);
    });
  } catch (error) {
    console.error('Erro:', error);
  }
}

// ========================================
// 4. INTEGRAÇÃO COM HEADER/MENU EXISTENTE
// ========================================

function MeuHeader() {
  return (
    <header>
      <nav>
        <a href="/">Home</a>
        <a href="/oportunidades">Encontrar Serviços</a>
        <a href="/minhas-candidaturas">Minhas Candidaturas</a>
        <a href="/perfil">Perfil</a>
      </nav>
    </header>
  );
}

// ========================================
// 5. CUSTOMIZAÇÃO DE CORES/ESTILOS
// ========================================

// Adicione ao seu CSS global ou tailwind.config.js
const estilosCustomizados = `
  /* Cores da sua marca */
  .home-servicos-container {
    --cor-primaria: #8b5cf6;
    --cor-secundaria: #ec4899;
    --cor-sucesso: #10b981;
  }

  /* Card hover customizado */
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;

// ========================================
// 6. EXEMPLO DE CONTEXTO DE AUTH
// ========================================

// Se você já tem um AuthContext, adapte assim:
import { useContext } from 'react';
import { MeuAuthContext } from './contexto-existente';

// No componente HomeServicos, substitua:
// const { user } = useAuth();
// por:
// const { usuario } = useContext(MeuAuthContext);

// E mapeie os campos:
const user = {
  id: usuario.id,
  name: usuario.nome,
  email: usuario.email,
  coins: usuario.moedas,
  avatar: usuario.foto,
};

// ========================================
// 7. MOCK PARA DESENVOLVIMENTO (OPCIONAL)
// ========================================

// Se o backend ainda não está pronto, use dados mock:
const mockServicos = [
  {
    id: '1',
    titulo: 'Costura de vestidos',
    descricaoCurta: 'Produção de 50 vestidos de festa',
    categoria: 'Moda Festa',
    valor: 2500,
    prazo: 20,
    cidade: 'São Paulo',
    estado: 'SP',
    tipoContrato: 'Freela',
    empresa: {
      nome: 'Confecções Elite',
      verificada: true,
    },
    custoMoedas: 10,
    candidatado: false,
  },
  // ... mais serviços
];

// Substitua temporariamente a função getServicos:
export const getServicos = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockServicos;
};

// ========================================
// 8. EXEMPLO DE PÁGINA DE CANDIDATURAS
// ========================================

function MinhasCandidaturasPage() {
  const [candidaturas, setCandidaturas] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getMinhasCandidaturas()
      .then(setCandidaturas)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="container">
      <h1>Minhas Candidaturas</h1>
      <div className="candidaturas-lista">
        {candidaturas.map(c => (
          <div key={c.id} className="candidatura-card">
            <h3>{c.job.titulo}</h3>
            <p>Empresa: {c.job.empresa.nome}</p>
            <p>Status: <strong>{c.status}</strong></p>
            <p>Data: {new Date(c.dataCandidatura).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// 9. INTEGRAÇÃO COM SISTEMA DE MOEDAS
// ========================================

// Se você já tem um sistema de moedas, integre assim:

// No seu AuthContext existente:
const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  // Função para atualizar moedas após candidatura
  const atualizarMoedas = (novoSaldo) => {
    setUser(prev => ({
      ...prev,
      coins: novoSaldo,
    }));
    
    // Também atualizar no localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    userData.coins = novoSaldo;
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, atualizarMoedas }}>
      {children}
    </AuthContext.Provider>
  );
}

// ========================================
// 10. CONFIGURAÇÃO DE AMBIENTE
// ========================================

// Arquivo .env (na raiz do projeto)
/*
# URL da API
REACT_APP_API_URL=https://api.suaplataforma.com

# Chave pública para validação (se necessário)
REACT_APP_PUBLIC_KEY=sua-chave-aqui

# Ambiente
REACT_APP_ENV=production
*/

// Uso no código:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// ========================================
// RESUMO - PASSOS PARA INTEGRAÇÃO
// ========================================

/*
1. ✅ Copie HomeServicos.tsx para /src/app/components/
2. ✅ Copie api.js para /src/app/data/
3. ✅ Adicione rota no App.tsx
4. ✅ Configure variáveis de ambiente (.env)
5. ✅ Implemente endpoints no backend (veja INTEGRACAO.md)
6. ✅ Teste integração
7. ✅ Ajuste estilos se necessário
8. ✅ Deploy!

ENDPOINTS NECESSÁRIOS NO BACKEND:
- GET  /api/jobs (listar serviços)
- POST /api/jobs/:id/candidatar (candidatar-se)
- GET  /api/candidaturas (minhas candidaturas)

CAMPOS OBRIGATÓRIOS NA RESPOSTA:
{
  id, titulo, descricaoCurta, categoria, valor, prazo,
  cidade, estado, tipoContrato, empresa: { nome, verificada },
  custoMoedas, candidatado
}

AUTENTICAÇÃO:
- Token JWT no header: Authorization: Bearer <token>
- Armazenado em localStorage.authToken

BOA SORTE! 🚀
*/
