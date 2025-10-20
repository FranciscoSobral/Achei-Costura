// 1. A lista de empresas agora está VAZIA.
const DADOS_DAS_EMPRESAS = [];

// 2. A lista de costureiros está completa.
const DADOS_DOS_COSTUREIROS = [
    { 
        id: 101,
        nome: 'Gabriel Batista', 
        categoria: 'Modinha e Moda Praia', 
        contato: '(81) 94589-****', 
        endereco: 'Rua Governador, 123, Centro, Caruaru',
        imageUrl: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
        avaliacao: 5,
        tipo: 'costureiros',
        cidade: 'Caruaru - PE'
    },
    { 
        id: 102,
        nome: 'Sara Gabriely', 
        categoria: 'Modinha', 
        contato: '(81) 94589-****', 
        endereco: 'Av. Principal, 456, Centro, Toritama',
        imageUrl: 'https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
        avaliacao: 4,
        tipo: 'costureiros',
        cidade: 'Toritama - PE'
    },
    // ... mais costureiros aqui
];


// 3. TODAS as funções continuam com 'export' para não dar erro.
export const getEmpresas = () => { return DADOS_DAS_EMPRESAS; };

export const getCostureiros = () => { return DADOS_DOS_COSTUREIROS; };

// 4. A função getAllItems agora retorna APENAS os costureiros.
export const getAllItems = () => { return DADOS_DOS_COSTUREIROS; };

export const getEmpresaById = (id) => { return DADOS_DAS_EMPRESAS.find(e => e.id === parseInt(id)); };

export const getCostureiroById = (id) => { return DADOS_DOS_COSTUREIROS.find(c => c.id === parseInt(id)); };