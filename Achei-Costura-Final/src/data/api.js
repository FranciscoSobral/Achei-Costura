import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Cria uma instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Serviço de Autenticação
export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const user = response.data.user || { email, nome: 'Usuário' };
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user, token: response.data.token };
      }
      return { success: false, message: 'Token não recebido' };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erro no login' };
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
         localStorage.setItem('token', response.data.token);
         const user = response.data.user || userData;
         localStorage.setItem('user', JSON.stringify(user));
         return { success: true, user, token: response.data.token };
      }
      return { success: true, message: 'Cadastro realizado!' };
    } catch (error) {
       return { success: false, message: error.response?.data?.message || 'Erro no cadastro' };
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// --- DADOS REAIS DO BACKEND ---
export const getCostureiros = async () => {
  try {
    const response = await api.get('/costureiros'); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar costureiros (API):", error);
    // Retorna a lista estática como FALLBACK se a API falhar
    return DADOS_DOS_COSTUREIROS; 
  }
};

export const getEmpresas = async () => {
  try {
    return []; 
  } catch (error) {
    return [];
  }
};

// --- DADOS ESTÁTICOS (MANTIDOS PARA NÃO QUEBRAR OUTRAS PÁGINAS) ---
// Se você remover isso, páginas que importam { DADOS_DOS_COSTUREIROS } vão quebrar.
export const DADOS_DOS_COSTUREIROS = [
    { 
        id: 101,
        nome: 'Gabriel Batista', 
        categoria: 'Modinha e Moda Praia', 
        contato: '(81) 94589-****', 
        endereco: 'Rua Governador, 123, Centro, Caruaru',
        imageUrl: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
        foto_url: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isDestaque: true, 
        avaliacao: 5,
        tipo: 'costureiros',
        cidade: 'Caruaru - PE',
        tags: ["Moda Praia", "Atacado"] 
    },
    { 
        id: 102,
        nome: 'Sara Gabriely', 
        categoria: 'Modinha', 
        contato: '(81) 94589-****', 
        endereco: 'Av. Principal, 456, Centro, Toritama',
        imageUrl: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
        foto_url: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        isDestaque: true,
        avaliacao: 4,
        tipo: 'costureiros',
        cidade: 'Toritama - PE',
        tags: ["Modinha", "Varejo"]
    },
];

export default api;