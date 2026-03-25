# 🧵 Plataforma de Conexão: Empresas ↔️ Costureiros

## 📦 Entrega Completa

Este projeto contém uma **plataforma completa** para conectar empresas que precisam de serviços de costura a costureiros profissionais autônomos.

---

## ✨ O Que Foi Criado

### 🎯 **2 Versões da Home de Serviços**

#### **Versão 1: Home Padrão** (`/src/app/pages/Home.tsx`)
- Grid de cards de serviços
- Carrossel de destaques com react-slick
- Busca e filtros em sidebar
- Página de detalhes completa
- Integração com autenticação

#### **Versão 2: HomeServicos** (`/src/app/components/HomeServicos.tsx`)
- Integração específica com sistema de moedas
- Candidatura direta no card
- Filtros inline otimizados
- **Pronta para integrar com backend existente**

---

## 📂 Arquivos Criados

### **Componentes Principais**
```
/src/app/
├── components/
│   ├── Header.tsx              # Cabeçalho com autenticação
│   ├── ServiceCard.tsx         # Card de serviço (versão 1)
│   ├── HomeServicos.tsx        # Home integrada (versão 2) ⭐
│   ├── SearchBar.tsx           # Barra de busca
│   ├── Filters.tsx             # Painel de filtros
│   └── FeaturedCarousel.tsx    # Carrossel de destaques
│
├── pages/
│   ├── Home.tsx                # Home padrão
│   ├── ServiceDetail.tsx       # Detalhes do serviço
│   ├── Login.tsx               # Página de login
│   └── Register.tsx            # Página de cadastro
│
├── context/
│   └── AuthContext.tsx         # Contexto de autenticação
│
├── services/
│   └── api.ts                  # Serviços TypeScript
│
├── data/
│   └── api.js                  # Serviços JavaScript ⭐
│
├── types/
│   └── index.ts                # Tipos TypeScript
│
└── App.tsx                     # Roteamento principal
```

### **Documentação**
```
/
├── INTEGRACAO.md           # 📘 Guia completo de integração
├── EXEMPLO_USO.js          # 💡 Exemplos práticos
└── ADAPTACAO_CARD.js       # 🎨 Como adaptar Card existente
```

---

## 🚀 Como Usar

### **Opção 1: HomeServicos (Recomendado para integração)**

```tsx
import HomeServicos from './components/HomeServicos';

// No seu App
<Route path="/oportunidades" element={<HomeServicos />} />
```

**Vantagens:**
- ✅ Candidatura direta no card
- ✅ Sistema de moedas integrado
- ✅ Filtros otimizados
- ✅ Fácil integração com backend

### **Opção 2: Home Padrão (Versão completa)**

```tsx
import { Home } from './pages/Home';

<Route path="/" element={<Home />} />
```

**Vantagens:**
- ✅ Carrossel de destaques
- ✅ Navegação para página de detalhes
- ✅ UI mais elaborada
- ✅ Filtros em sidebar

---

## 🔌 Integração com Backend

### **Endpoints Necessários**

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/jobs` | Lista serviços com filtros |
| `GET` | `/api/jobs/:id` | Detalhes de um serviço |
| `POST` | `/api/jobs/:id/candidatar` | Enviar candidatura |
| `GET` | `/api/candidaturas` | Minhas candidaturas |
| `GET` | `/api/categorias` | Categorias disponíveis |
| `POST` | `/api/auth/login` | Fazer login |
| `POST` | `/api/auth/cadastrar` | Criar conta |

### **Exemplo de Uso da API**

```javascript
import { getServicos, candidatarServico } from './data/api';

// Buscar serviços
const servicos = await getServicos({
  categoria: 'Moda Praia',
  cidade: 'São Paulo',
  ordenar: 'recent'
});

// Candidatar-se
await candidatarServico('job-id', 'Mensagem...');
```

📖 **Veja `INTEGRACAO.md` para detalhes completos**

---

## 🎨 Funcionalidades

### ✅ **Sistema de Autenticação**
- Login e cadastro completos
- JWT token management
- Context API para estado global
- Proteção de rotas

### ✅ **Sistema de Moedas**
- Verificação de saldo antes de candidatar
- Débito automático de moedas
- Atualização em tempo real
- Serviços gratuitos e premium

### ✅ **Busca e Filtros**
- Busca por palavras-chave
- Filtro por categoria
- Filtro por cidade
- Filtro por tipo de contrato
- Ordenação (recentes, valor, proximidade)
- Faixa de preço

### ✅ **Cards de Serviços**
- Informações da empresa
- Badge de verificado
- Badges de urgente/destaque
- Valor, prazo e localização
- Custo em moedas (se aplicável)
- Status de candidatura

### ✅ **Carrossel de Destaques**
- Serviços em destaque
- Auto-play
- Navegação por setas
- Dots de paginação
- Responsivo

### ✅ **Estados Visuais**
- Loading (skeleton)
- Erro com retry
- Empty state
- Feedback de sucesso/erro (toast)

### ✅ **Responsividade**
- Mobile first
- 1 coluna (mobile)
- 2 colunas (tablet)
- 3 colunas (desktop)
- Menu hambúrguer

### ✅ **Animações**
- Fade in/out
- Slide transitions
- Hover effects
- Motion React

---

## 🛠️ Tecnologias

- **React 18.3** - Framework
- **TypeScript** - Tipagem
- **Tailwind CSS v4** - Estilização
- **React Router v7** - Navegação
- **Axios** - HTTP client
- **React Slick** - Carrossel
- **Motion React** - Animações
- **Radix UI** - Componentes primitivos
- **Sonner** - Toasts
- **Lucide React** - Ícones

---

## 📊 Fluxo de Uso

```
1. Costureiro acessa /oportunidades
   └─> Sistema carrega serviços

2. Costureiro aplica filtros
   └─> Lista é atualizada

3. Costureiro clica "Candidatar-se"
   ├─> Verifica se está logado
   ├─> Verifica saldo de moedas
   ├─> Envia candidatura
   ├─> Debita moedas
   └─> Atualiza card

4. Candidatura enviada ✓
   └─> Card mostra badge "Candidatura enviada"
```

---

## 🎯 Dados Mock

O sistema vem com **dados mock completos** para desenvolvimento:

- 8 serviços de exemplo
- 5 empresas mock
- Categorias variadas
- Diferentes cidades
- Valores e prazos realistas

Para trocar por dados reais, basta implementar os endpoints no backend. Veja `INTEGRACAO.md`.

---

## 📱 Páginas Disponíveis

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Home | Listagem principal |
| `/oportunidades` | HomeServicos | Versão integrada |
| `/service/:id` | ServiceDetail | Detalhes + candidatura |
| `/login` | Login | Autenticação |
| `/register` | Register | Criar conta |

---

## 🔐 Sistema de Autenticação

### **AuthContext**
```tsx
const { user, login, logout, updateCoins } = useAuth();

// user contém:
{
  id: string;
  name: string;
  email: string;
  avatar?: string;
  coins: number;
  city?: string;
  state?: string;
  role: 'seamstress' | 'company';
}
```

### **Proteção**
- Token JWT armazenado em localStorage
- Interceptor automático no axios
- Redirect para login se não autenticado

---

## 💰 Sistema de Moedas

### **Como Funciona**

1. **Serviços Gratuitos**
   ```json
   { "coinCost": null }
   ```

2. **Serviços Premium**
   ```json
   { "coinCost": 10 }
   ```

3. **Verificação de Saldo**
   ```javascript
   if (user.coins < service.coinCost) {
     toast.error('Moedas insuficientes');
   }
   ```

4. **Débito Automático**
   ```javascript
   // Backend retorna novo saldo
   updateCoins(newBalance);
   ```

---

## 🎨 Customização

### **Cores**
Edite `/src/styles/theme.css`:
```css
:root {
  --cor-primaria: #8b5cf6; /* roxo */
  --cor-secundaria: #ec4899; /* rosa */
}
```

### **Componentes**
Todos os componentes UI estão em `/src/app/components/ui/`:
- Badge
- Button
- Card
- Input
- Select
- Skeleton
- Sheet
- E mais...

---

## 🧪 Teste Rápido

### **1. Sem autenticação**
```bash
# Acesse /
# Veja serviços disponíveis
# Filtros funcionam
# Clique "Ver detalhes"
```

### **2. Com autenticação**
```bash
# Clique "Cadastrar"
# Preencha dados
# Volte para home
# Clique "Candidatar-se"
# Veja moedas sendo debitadas
```

### **3. Dados mock**
```bash
# Email: qualquer@exemplo.com
# Senha: qualquer
# Saldo inicial: 150 moedas
```

---

## 📚 Documentação Adicional

| Arquivo | Conteúdo |
|---------|----------|
| `INTEGRACAO.md` | Guia completo de integração backend |
| `EXEMPLO_USO.js` | Exemplos práticos de código |
| `ADAPTACAO_CARD.js` | Como adaptar Card existente |

---

## 🐛 Troubleshooting

### **Serviços não aparecem**
✅ Verifique console do browser  
✅ Veja Network tab (requisições)  
✅ Confirme formato dos dados  

### **Candidatura não funciona**
✅ Confirme que está logado  
✅ Verifique saldo de moedas  
✅ Veja response do backend  

### **Filtros não aplicam**
✅ Verifique query parameters  
✅ Teste endpoint diretamente  
✅ Veja console por erros  

---

## 🚀 Deploy

### **Checklist**

- [ ] Backend com endpoints implementados
- [ ] Variáveis de ambiente configuradas
- [ ] CORS habilitado
- [ ] JWT funcionando
- [ ] Build de produção testado
- [ ] Responsividade validada

### **Build**

```bash
npm run build
# ou
yarn build
```

---

## 📈 Próximos Passos

### **Melhorias Sugeridas**
- [ ] Paginação de serviços
- [ ] Favoritar serviços
- [ ] Notificações em tempo real
- [ ] Chat com empresa
- [ ] Sistema de avaliações
- [ ] Histórico de candidaturas
- [ ] Recomendações personalizadas

---

## 🤝 Suporte

**Dúvidas sobre integração?**
1. Leia `INTEGRACAO.md`
2. Veja exemplos em `EXEMPLO_USO.js`
3. Teste com dados mock
4. Verifique console por erros

**Problemas com componentes?**
1. Veja `ADAPTACAO_CARD.js`
2. Confirme imports corretos
3. Valide props passadas

---

## ✅ Checklist de Integração

### **Frontend**
- [x] HomeServicos criado
- [x] API service configurado
- [x] AuthContext implementado
- [x] Rotas configuradas
- [x] Componentes UI disponíveis
- [x] Estilos responsivos
- [x] Estados de loading/erro
- [x] Dados mock funcionais

### **Backend (A fazer)**
- [ ] Endpoint GET /api/jobs
- [ ] Endpoint POST /api/jobs/:id/candidatar
- [ ] Endpoint GET /api/candidaturas
- [ ] Sistema de moedas
- [ ] Autenticação JWT
- [ ] Validações

---

## 🎉 Resumo

Você tem agora uma **plataforma completa** para conectar empresas e costureiros, com:

✨ **2 versões** da home (escolha a que melhor se adapta)  
🔐 **Autenticação** completa e segura  
💰 **Sistema de moedas** integrado  
🎨 **UI moderna** e responsiva  
📱 **Mobile-first** design  
🔍 **Filtros avançados** e busca  
🎯 **Dados mock** para desenvolvimento  
📖 **Documentação** detalhada  

**Próximo passo:** Implemente os endpoints no backend e conecte! 🚀

---

**Desenvolvido com ❤️ para a plataforma de Costura** 🧵✨
