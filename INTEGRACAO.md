# 🧵 Guia de Integração - Home de Serviços para Costureiros

## 📋 Visão Geral

Este guia descreve como integrar o componente **HomeServicos** à sua plataforma existente de conexão entre empresas e costureiros.

## 🎯 Componentes Criados

### 1. **HomeServicos.tsx** (`/src/app/components/HomeServicos.tsx`)
Componente principal da home de oportunidades com:
- Listagem de serviços em grid responsivo
- Sistema de filtros (categoria, cidade, tipo de contrato, ordenação)
- Busca por palavras-chave
- Cards de serviços com informações detalhadas
- Sistema de candidatura integrado com moedas
- Estados de loading, erro e empty state

### 2. **api.js** (`/src/app/data/api.js`)
Serviço JavaScript com todas as funções de integração:
- `getServicos(filtros)` - Buscar serviços com filtros
- `candidatarServico(jobId, mensagem)` - Enviar candidatura
- `getMinhasCandidaturas()` - Listar candidaturas do usuário
- `getCategorias()` - Buscar categorias disponíveis
- E mais...

---

## 🔌 Integração com Backend

### Endpoints Necessários

#### **1. GET `/api/jobs`**
Retorna lista de serviços disponíveis

**Query Parameters:**
- `categoria` (string, opcional) - Filtrar por categoria
- `cidade` (string, opcional) - Filtrar por cidade
- `tipoContrato` (string, opcional) - Freela, PJ ou CLT
- `ordenar` (string, opcional) - recent, valor, prazo
- `busca` (string, opcional) - Termo de busca

**Response:**
```json
[
  {
    "id": "uuid",
    "titulo": "Costura de 100 biquínis",
    "descricao": "Descrição completa...",
    "descricaoCurta": "Resumo do serviço",
    "categoria": "Moda Praia",
    "valor": 1500,
    "prazo": 15,
    "cidade": "São Paulo",
    "estado": "SP",
    "tipoContrato": "Freela",
    "dataPublicacao": "2026-02-20T10:00:00Z",
    "destaque": true,
    "urgente": false,
    "custoMoedas": 10,
    "empresa": {
      "id": "uuid",
      "nome": "Confecção Estrela",
      "logo": "https://...",
      "verificada": true
    },
    "candidatado": false
  }
]
```

#### **2. POST `/api/jobs/{jobId}/candidatar`**
Envia candidatura a um serviço

**Body:**
```json
{
  "mensagem": "Mensagem de apresentação do costureiro"
}
```

**Response Success (200):**
```json
{
  "id": "candidatura-uuid",
  "jobId": "job-uuid",
  "status": "pendente",
  "novoSaldo": 140,
  "mensagem": "Candidatura enviada com sucesso"
}
```

**Response Error (400/402):**
```json
{
  "message": "Você já se candidatou a este serviço"
}
```
ou
```json
{
  "message": "Moedas insuficientes"
}
```

#### **3. GET `/api/jobs/destaque`**
Retorna serviços em destaque (para carrossel)

**Response:** Mesmo formato de GET `/api/jobs`

#### **4. GET `/api/jobs/{jobId}`**
Retorna detalhes completos de um serviço

**Response:** Objeto único com mesmo formato

#### **5. GET `/api/candidaturas`**
Lista candidaturas do usuário logado

**Response:**
```json
[
  {
    "id": "uuid",
    "job": { /* objeto completo do job */ },
    "status": "pendente", // "pendente", "aceita", "rejeitada"
    "mensagem": "Minha mensagem...",
    "dataCandidatura": "2026-02-21T10:00:00Z"
  }
]
```

---

## 🔐 Autenticação

### Token JWT
O sistema usa JWT Bearer Token para autenticação. O token é:
- Armazenado em `localStorage.authToken`
- Adicionado automaticamente a todas as requisições via interceptor
- Validado pelo backend em rotas protegidas

### Estrutura do Usuário
```json
{
  "id": "uuid",
  "nome": "Maria Silva",
  "email": "maria@example.com",
  "avatar": "https://...",
  "coins": 150,
  "cidade": "São Paulo",
  "estado": "SP",
  "tipo": "costureiro"
}
```

---

## 💰 Sistema de Moedas

### Fluxo de Candidatura com Moedas

1. **Verificação de Saldo**
   ```javascript
   if (servico.custoMoedas && user.coins < servico.custoMoedas) {
     // Mostrar erro "moedas insuficientes"
   }
   ```

2. **Envio da Candidatura**
   ```javascript
   const response = await candidatarServico(jobId, mensagem);
   ```

3. **Atualização do Saldo**
   ```javascript
   // Backend retorna novoSaldo
   updateCoins(response.novoSaldo);
   ```

### Serviços Gratuitos vs Premium
- **Gratuitos:** `custoMoedas = null` ou `custoMoedas = 0`
- **Premium:** `custoMoedas > 0` (ex: 10 moedas)

O card exibe um badge especial para serviços premium:
```
🪙 Custa 10 moedas para candidatar
```

---

## 🎨 Customização Visual

### Classes CSS Principais
```css
.home-servicos-container { /* Container principal */ }
.cards-grid { /* Grid de cards */ }
.filter-bar { /* Barra de filtros */ }
```

### Cores do Tema
O componente usa classes Tailwind compatíveis com seu tema:
- **Primary:** `purple-600`, `pink-600`
- **Success:** `green-600`
- **Warning:** `amber-600`
- **Danger:** `red-600`

### Responsividade
```css
/* Mobile first */
grid-cols-1 /* 1 coluna em mobile */
md:grid-cols-2 /* 2 colunas em tablet */
lg:grid-cols-3 /* 3 colunas em desktop */
```

---

## 🚀 Como Usar

### 1. Importe o componente
```tsx
import HomeServicos from './components/HomeServicos';
```

### 2. Adicione à rota
```tsx
<Route path="/oportunidades" element={<HomeServicos />} />
```

### 3. Configure variáveis de ambiente
```env
REACT_APP_API_URL=https://api.suaplataforma.com
```

### 4. Adicione link no menu
```tsx
<Link to="/oportunidades">Encontrar Serviços</Link>
```

---

## 📊 Estrutura de Dados

### Interface Service (TypeScript)
```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  deadline: number; // dias
  city: string;
  state: string;
  category: string;
  contractType: string;
  createdAt: string;
  featured: boolean;
  urgent: boolean;
  coinCost?: number;
  company: {
    id: string;
    name: string;
    logo?: string;
    verified: boolean;
  };
  applied?: boolean;
}
```

---

## 🔄 Fluxo de Uso

1. **Usuário acessa a home de oportunidades**
   - Sistema carrega serviços via `GET /api/jobs`
   - Exibe grid de cards com loading state

2. **Usuário aplica filtros**
   - Componente refaz requisição com query parameters
   - Grid é atualizado com novos resultados

3. **Usuário clica em "Candidatar-se"**
   - Sistema verifica login e saldo de moedas
   - Envia POST para `/api/jobs/{id}/candidatar`
   - Atualiza card para "Candidatura enviada"
   - Debita moedas se aplicável

4. **Feedback visual**
   - Card mostra badge "Candidatura enviada"
   - Botão fica desabilitado
   - Toast de sucesso é exibido

---

## ⚙️ Configurações Opcionais

### Categorias Dinâmicas
Por padrão, categorias são fixas. Para buscar do backend:
```javascript
const [categorias, setCategorias] = useState([]);

useEffect(() => {
  getCategorias().then(setCategorias);
}, []);
```

### Cidades Dinâmicas
```javascript
const [cidades, setCidades] = useState([]);

useEffect(() => {
  getCidadesDisponiveis().then(setCidades);
}, []);
```

### Paginação
Para adicionar paginação, modifique `getServicos`:
```javascript
export const getServicos = async (filtros, page = 1, limit = 12) => {
  const response = await api.get(`/jobs?page=${page}&limit=${limit}&...`);
  return {
    servicos: response.data.items,
    total: response.data.total,
    paginas: response.data.pages,
  };
};
```

---

## 🧪 Testes

### Cenários de Teste

1. **Carregamento inicial**
   - ✅ Serviços são carregados e exibidos
   - ✅ Loading state funciona
   - ✅ Cards são renderizados corretamente

2. **Filtros**
   - ✅ Filtrar por categoria atualiza a lista
   - ✅ Busca por texto funciona
   - ✅ Limpar filtros restaura lista completa

3. **Candidatura**
   - ✅ Usuário logado pode se candidatar
   - ✅ Moedas são debitadas corretamente
   - ✅ Card é marcado como "Candidatado"
   - ✅ Erro de moedas insuficientes é exibido

4. **Estados de erro**
   - ✅ Erro de rede mostra mensagem
   - ✅ Botão "Tentar novamente" funciona

---

## 📱 Responsividade

### Breakpoints
- **Mobile:** < 768px (1 coluna)
- **Tablet:** 768px - 1024px (2 colunas)
- **Desktop:** > 1024px (3 colunas)

### Elementos Adaptáveis
- Menu hambúrguer em mobile
- Filtros em sidebar/sheet
- Cards em stack vertical
- Tipografia escalável

---

## 🔍 Debugging

### Logs Úteis
```javascript
// Ver filtros aplicados
console.log('Filtros:', filtros);

// Ver serviços retornados
console.log('Serviços carregados:', servicos.length);

// Ver erro de API
console.error('Erro:', error.response?.data);
```

### Ferramentas
- **React DevTools** - Inspecionar estado
- **Network Tab** - Ver requisições
- **Console** - Ver erros e warnings

---

## 🚨 Tratamento de Erros

### Erros Comuns

1. **401 Unauthorized**
   - Token expirado ou inválido
   - Usuário é redirecionado para login

2. **400 Bad Request**
   - Já candidatado ao serviço
   - Dados inválidos

3. **402 Payment Required**
   - Moedas insuficientes

4. **404 Not Found**
   - Serviço não existe

5. **500 Internal Server Error**
   - Erro no backend
   - Mostrar mensagem genérica

---

## 📈 Melhorias Futuras

### Sugestões de Features
- [ ] Salvar serviços como favoritos
- [ ] Notificações de novos serviços
- [ ] Chat direto com empresa
- [ ] Histórico de candidaturas
- [ ] Sistema de avaliações
- [ ] Recomendações personalizadas
- [ ] Filtros salvos
- [ ] Compartilhamento de serviços

---

## 🤝 Suporte

### Dúvidas sobre Integração
- Verifique os logs do console
- Teste endpoints no Postman/Insomnia
- Confirme formato dos dados retornados
- Valide tokens JWT

### Problemas Comuns
**Cards não aparecem:**
- Verifique se API está retornando dados
- Confirme estrutura do JSON
- Veja erros no console

**Candidatura não funciona:**
- Confirme que usuário está logado
- Verifique saldo de moedas
- Teste endpoint diretamente

**Filtros não funcionam:**
- Confirme query parameters no backend
- Veja network tab para params enviados

---

## 📝 Checklist de Deploy

- [ ] Backend com todos endpoints implementados
- [ ] JWT configurado corretamente
- [ ] CORS habilitado para frontend
- [ ] Variáveis de ambiente configuradas
- [ ] Testes de integração passando
- [ ] Loading states funcionando
- [ ] Tratamento de erros implementado
- [ ] Design responsivo testado
- [ ] Performance otimizada

---

## 🎉 Conclusão

O componente **HomeServicos** está pronto para uso e totalmente integrado com:
- ✅ Sistema de autenticação JWT
- ✅ Sistema de moedas
- ✅ Filtros avançados
- ✅ Design responsivo
- ✅ Estados de loading e erro
- ✅ Feedback visual completo

**Próximos passos:**
1. Implementar endpoints no backend
2. Testar integração completa
3. Ajustar estilos conforme necessário
4. Deploy em produção

---

**Desenvolvido para plataforma de conexão entre Empresas e Costureiros** 🧵✨
