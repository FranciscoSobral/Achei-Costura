import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchServices, applyToService } from '../services/api';
import type { Service } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Coins,
  Building2,
  BadgeCheck,
  Search,
  Filter,
  AlertCircle,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'motion/react';

/**
 * JobCard - Card adaptado para exibir serviços/jobs
 * Reutiliza componentes UI existentes e segue padrão visual da plataforma
 */
interface JobCardProps {
  servico: Service;
  onCandidatar: (id: string) => void;
  candidatando: boolean;
}

const JobCard = ({ servico, onCandidatar, candidatando }: JobCardProps) => {
  const { user } = useAuth();
  
  const getDaysAgo = (date: string) => {
    const now = new Date();
    const created = new Date(date);
    const days = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoje';
    if (days === 1) return 'Ontem';
    return `${days} dias atrás`;
  };

  const podeSeCandiatar = user && !servico.applied;
  const temMoedasSuficientes = !servico.coinCost || (user && user.coins >= servico.coinCost);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
        <CardHeader className="pb-3">
          {/* Header com empresa */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {servico.company.logo ? (
                <Avatar className="h-12 w-12 border-2 border-gray-200">
                  <AvatarImage src={servico.company.logo} alt={servico.company.name} />
                  <AvatarFallback>
                    <Building2 className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="font-semibold text-sm truncate">{servico.company.name}</p>
                  {servico.company.verified && (
                    <BadgeCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500">{getDaysAgo(servico.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Badges de status */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <Badge variant="outline" className="text-xs">{servico.category}</Badge>
            {servico.urgent && (
              <Badge variant="destructive" className="text-xs">Urgente</Badge>
            )}
            {servico.featured && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs">
                Destaque
              </Badge>
            )}
          </div>

          {/* Título */}
          <h3 className="font-semibold text-base leading-tight line-clamp-2 min-h-[2.5rem]">
            {servico.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-3">
          {/* Descrição curta */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[2.5rem]">
            {servico.shortDescription}
          </p>

          {/* Informações principais em grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">
                  R$ {servico.price.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{servico.deadline} dias</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-lg">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{servico.city} - {servico.state}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 p-2 bg-blue-50 rounded-lg">
              <Briefcase className="w-4 h-4 flex-shrink-0" />
              <span>{servico.contractType}</span>
            </div>
          </div>

          {/* Custo em moedas (se aplicável) */}
          {servico.coinCost && (
            <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-xs text-amber-900">
                  Custa <strong>{servico.coinCost} moedas</strong> para candidatar
                </span>
              </div>
              {user && !temMoedasSuficientes && (
                <p className="text-xs text-red-600 mt-1">
                  Você tem apenas {user.coins} moedas
                </p>
              )}
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          {servico.applied ? (
            <Button 
              variant="secondary" 
              className="w-full" 
              disabled
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Candidatura enviada
            </Button>
          ) : !user ? (
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => toast.info('Faça login para se candidatar')}
            >
              Ver detalhes
            </Button>
          ) : (
            <Button 
              className="w-full"
              onClick={() => onCandidatar(servico.id)}
              disabled={candidatando || !temMoedasSuficientes}
            >
              {candidatando ? 'Enviando...' : 'Candidatar-se'}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

/**
 * HomeServicos - Componente principal da home de oportunidades
 * Integrado com sistema de moedas, filtros e candidaturas
 */
export const HomeServicos = () => {
  const { user, updateCoins } = useAuth();

  // Estados principais
  const [servicos, setServicos] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [candidatando, setCandidatando] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // Estados de filtros
  const [filtros, setFiltros] = useState({
    busca: '',
    categoria: 'all',
    cidade: 'all',
    contratoTipo: 'all',
    ordenar: 'recent',
  });

  // Categorias disponíveis (pode vir de API)
  const categorias = [
    'Moda Praia',
    'Bordado',
    'Ajustes',
    'Malharia',
    'Alfaiataria',
    'Reparos',
    'Customização',
    'Infantil',
  ];

  const cidades = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Curitiba',
    'Porto Alegre',
    'Fortaleza',
    'Brasília',
    'Salvador',
  ];

  /**
   * Carregar serviços da API com filtros aplicados
   */
  const carregarServicos = async () => {
    setLoading(true);
    setErro(null);

    try {
      const params = {
        search: filtros.busca || undefined,
        category: filtros.categoria !== 'all' ? filtros.categoria : undefined,
        city: filtros.cidade !== 'all' ? filtros.cidade : undefined,
        contractType: filtros.contratoTipo !== 'all' ? filtros.contratoTipo : undefined,
        sortBy: filtros.ordenar,
      };

      const data = await fetchServices(params);
      setServicos(data);
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      setErro('Não foi possível carregar os serviços. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Recarregar serviços quando filtros mudarem
   */
  useEffect(() => {
    carregarServicos();
  }, [filtros]);

  /**
   * Handler para candidatura a um serviço
   * Verifica saldo de moedas e atualiza estado após sucesso
   */
  const handleCandidatar = async (jobId: string) => {
    if (!user) {
      toast.error('Você precisa estar logado para se candidatar');
      return;
    }

    const servico = servicos.find(s => s.id === jobId);
    if (!servico) return;

    // Verificar saldo de moedas
    if (servico.coinCost && user.coins < servico.coinCost) {
      toast.error(`Você precisa de ${servico.coinCost} moedas para se candidatar a este serviço`);
      return;
    }

    setCandidatando(jobId);

    try {
      // Enviar candidatura
      await applyToService(jobId, 'Tenho interesse neste serviço. Experiência comprovada na área.');

      // Atualizar moedas do usuário se necessário
      if (servico.coinCost) {
        updateCoins(user.coins - servico.coinCost);
        toast.success(`Candidatura enviada! ${servico.coinCost} moedas debitadas.`);
      } else {
        toast.success('Candidatura enviada com sucesso!');
      }

      // Atualizar estado local do serviço
      setServicos(prev =>
        prev.map(s => (s.id === jobId ? { ...s, applied: true } : s))
      );
    } catch (error: any) {
      console.error('Erro ao candidatar:', error);
      toast.error(error.message || 'Erro ao enviar candidatura. Tente novamente.');
    } finally {
      setCandidatando(null);
    }
  };

  /**
   * Atualizar filtro específico
   */
  const atualizarFiltro = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  /**
   * Limpar todos os filtros
   */
  const limparFiltros = () => {
    setFiltros({
      busca: '',
      categoria: 'all',
      cidade: 'all',
      contratoTipo: 'all',
      ordenar: 'recent',
    });
  };

  return (
    <div className="home-servicos-container">
      {/* Hero Section com busca */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Encontre Oportunidades
            </h1>
            <p className="text-lg text-purple-100">
              {servicos.length} serviços disponíveis de empresas verificadas
            </p>
          </div>

          {/* Busca rápida */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar por título, empresa ou palavra-chave..."
              value={filtros.busca}
              onChange={(e) => atualizarFiltro('busca', e.target.value)}
              className="pl-12 h-14 text-base bg-white"
            />
          </div>
        </div>
      </div>

      {/* Barra de filtros */}
      <div className="border-b bg-white shadow-sm sticky top-16 z-40">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center gap-3 mb-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Categoria */}
            <Select
              value={filtros.categoria}
              onValueChange={(value) => atualizarFiltro('categoria', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Cidade */}
            <Select
              value={filtros.cidade}
              onValueChange={(value) => atualizarFiltro('cidade', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas cidades</SelectItem>
                {cidades.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tipo de contrato */}
            <Select
              value={filtros.contratoTipo}
              onValueChange={(value) => atualizarFiltro('contratoTipo', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de contrato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos tipos</SelectItem>
                <SelectItem value="Freela">Freela</SelectItem>
                <SelectItem value="PJ">PJ</SelectItem>
                <SelectItem value="CLT">CLT</SelectItem>
              </SelectContent>
            </Select>

            {/* Ordenação */}
            <Select
              value={filtros.ordenar}
              onValueChange={(value) => atualizarFiltro('ordenar', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais recentes</SelectItem>
                <SelectItem value="price">Maior valor</SelectItem>
                <SelectItem value="nearby">Mais próximos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botão limpar filtros */}
          {(filtros.busca || filtros.categoria !== 'all' || filtros.cidade !== 'all' || filtros.contratoTipo !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={limparFiltros}
              className="mt-3"
            >
              Limpar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Estado de erro */}
        {erro && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>{erro}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={carregarServicos}
              >
                Tentar novamente
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Estado de carregamento */}
        {loading && (
          <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-6 w-4/5" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Grid de cards */}
        {!loading && !erro && servicos.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <p className="text-lg font-semibold">
                  {servicos.length} {servicos.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}
                </p>
              </div>
            </div>

            <div className="cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicos.map((servico) => (
                <JobCard
                  key={servico.id}
                  servico={servico}
                  onCandidatar={handleCandidatar}
                  candidatando={candidatando === servico.id}
                />
              ))}
            </div>
          </>
        )}

        {/* Estado vazio */}
        {!loading && !erro && servicos.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              Nenhum serviço encontrado
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Não encontramos serviços com os filtros selecionados. 
              Tente ajustar os critérios de busca.
            </p>
            <Button onClick={limparFiltros} variant="outline">
              Limpar filtros e ver todos
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeServicos;
