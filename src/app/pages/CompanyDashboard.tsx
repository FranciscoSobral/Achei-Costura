import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Users, 
  PlusCircle, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Briefcase,
  Search,
  Filter,
  Star,
  MessageCircle
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { mockCompanyJobs } from '../data/mockCompanyData';
import AnuncioCarrossel from '../components/AnuncioCarrossel';

const mockCostureiros = [
  {
    id: '1',
    nome: 'Maria Silva',
    tipo: 'costureiro',
    categoria: 'Costura Criativa',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    rating: 4.8,
    cidade: 'São Paulo',
    estado: 'SP'
  },
  {
    id: '2',
    nome: 'Ana Costa',
    tipo: 'costureiro',
    categoria: 'Moda Praia',
    imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=150&h=150&fit=crop',
    rating: 4.9,
    cidade: 'Rio de Janeiro',
    estado: 'RJ'
  },
  {
    id: '3',
    nome: 'Joana Prado',
    tipo: 'costureiro',
    categoria: 'Alta Costura',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5.0,
    cidade: 'Curitiba',
    estado: 'PR'
  },
];

export const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter jobs based on search
  const filteredJobs = mockCompanyJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Painel da Empresa</h1>
          <p className="text-gray-600 mt-1">Gerencie suas vagas e visualize candidatos.</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Publicar Nova Vaga
        </Button>
      </div>

      <Tabs defaultValue="vagas" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="vagas">Minhas Vagas</TabsTrigger>
          {/*<TabsTrigger value="costureiros">Encontre Costureiros</TabsTrigger> */}
        </TabsList>

        <TabsContent value="vagas">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vagas Ativas</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {mockCompanyJobs.filter(j => j.status === 'open').length}
                    </h3>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total de Candidatos</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {mockCompanyJobs.reduce((acc, job) => acc + job.applicantsCount, 0)}
                    </h3>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vagas Fechadas</p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {mockCompanyJobs.filter(j => j.status === 'closed').length}
                    </h3>
                  </div>
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Calendar className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Buscar vagas..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtrar
            </Button>
          </div>

          {/* Job List */}
          <div className="space-y-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                          {job.status === 'open' ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">Ativa</Badge>
                          ) : (
                            <Badge variant="secondary">Fechada</Badge>
                          )}
                          <Badge variant="outline">{job.category}</Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.city} - {job.state}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            R$ {job.price.toLocaleString('pt-BR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Publicado em {new Date(job.createdAt).toLocaleDateString('pt-BR')}
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-2 mb-4 md:mb-0">
                          {job.shortDescription}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3 min-w-[200px]">
                        <div className="text-center w-full bg-blue-50 p-3 rounded-lg border border-blue-100">
                          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Candidatos</p>
                          <div className="flex items-center justify-center gap-2 mt-1">
                            <Users className="w-5 h-5 text-blue-700" />
                            <span className="text-2xl font-bold text-blue-800">{job.applicantsCount}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          onClick={() => navigate(`/empresa/vaga/${job.id}/candidatos`)}
                        >
                          Ver Candidatos
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Nenhuma vaga encontrada</h3>
                <p className="text-gray-500 mt-1">Tente ajustar seus filtros ou publique uma nova vaga.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="costureiros">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Costureiros em Destaque</h2>
            <p className="text-gray-600 mb-6">Confira os profissionais recomendados para a sua empresa.</p>
            <AnuncioCarrossel items={mockCostureiros} />
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar por nome ou especialidade..." className="pl-10" />
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate('/empresa/buscar')}>
              <Filter className="w-4 h-4" />
              Filtros Avançados
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCostureiros.map((costureiro) => (
              <Card key={costureiro.id} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <CardContent className="p-0 flex-1">
                  <div className="p-6 flex flex-col items-center text-center border-b border-gray-100">
                    <img 
                      src={costureiro.imageUrl} 
                      alt={costureiro.nome} 
                      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-50"
                    />
                    <h3 className="text-xl font-bold text-gray-900">{costureiro.nome}</h3>
                    <p className="text-green-700 bg-green-50 px-3 py-1 rounded-full text-sm font-medium mt-2">
                      {costureiro.categoria}
                    </p>
                    <div className="flex items-center gap-1 mt-3 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-semibold text-gray-900">{costureiro.rating}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50">
                    <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                      <MapPin className="w-4 h-4" />
                      {costureiro.cidade}, {costureiro.estado}
                    </div>
                  </div>
                </CardContent>
                <div className="p-4 border-t border-gray-100">
                  <Button className="w-full flex items-center justify-center gap-2 bg-[#006D5B] hover:bg-[#005a4b] text-white">
                    <MessageCircle className="w-4 h-4" />
                    Entrar em Contato
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};