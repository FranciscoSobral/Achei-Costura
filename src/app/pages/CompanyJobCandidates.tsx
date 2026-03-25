import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Award, 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  Clock,
  MessageSquare,
  Search
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockCompanyJobs, mockCandidates } from '../data/mockCompanyData';
import { Input } from '../components/ui/input';
import { ApplicationWithSeamstress } from '../types';

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'accepted':
      return <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">Aprovado</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejeitado</Badge>;
    default:
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100">Pendente</Badge>;
  }
};

export const CompanyJobCandidates = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Find job details
  const job = mockCompanyJobs.find(j => j.id === id);
  
  // Find candidates for this job
  const candidates = mockCandidates[id || ''] || [];

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Vaga não encontrada</h2>
        <Button onClick={() => navigate('/empresa/dashboard')}>Voltar ao Painel</Button>
      </div>
    );
  }

  // Filter candidates based on tab and search
  const filteredCandidates = candidates.filter(app => {
    const matchesTab = activeTab === 'all' || app.status === activeTab;
    const matchesSearch = app.seamstress.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 hover:pl-2 transition-all" 
        onClick={() => navigate('/empresa/dashboard')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para Vagas
      </Button>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidatos: {job.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {job.contractType}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.city} - {job.state}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Prazo: {job.deadline} dias
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
             <div className="text-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
               <span className="block text-2xl font-bold text-blue-700">{candidates.length}</span>
               <span className="text-xs text-blue-600 font-medium">TOTAL</span>
             </div>
             <div className="text-center px-4 py-2 bg-green-50 rounded-lg border border-green-100">
               <span className="block text-2xl font-bold text-green-700">{candidates.filter(c => c.status === 'accepted').length}</span>
               <span className="text-xs text-green-600 font-medium">APROVADOS</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar (Mobile: Top, Desktop: Left) */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Buscar candidato..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <Tabs defaultValue="all" onValueChange={setActiveTab} orientation="vertical" className="w-full">
                  <TabsList className="flex flex-col h-auto w-full bg-transparent gap-2 p-0">
                    <TabsTrigger 
                      value="all" 
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                    >
                      Todos os candidatos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pending" 
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700"
                    >
                      Pendentes
                    </TabsTrigger>
                    <TabsTrigger 
                      value="accepted" 
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                    >
                      Aprovados
                    </TabsTrigger>
                    <TabsTrigger 
                      value="rejected" 
                      className="w-full justify-start px-4 py-2 data-[state=active]:bg-red-50 data-[state=active]:text-red-700"
                    >
                      Rejeitados
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Candidates List */}
        <div className="lg:col-span-3 space-y-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((application) => (
              <CandidateCard key={application.id} application={application} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Nenhum candidato encontrado</h3>
              <p className="text-gray-500 mt-1">Nenhum candidato corresponde aos filtros selecionados.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CandidateCard = ({ application }: { application: ApplicationWithSeamstress }) => {
  const { seamstress } = application;
  
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left: Profile Summary */}
        <div className="p-6 md:w-1/3 bg-gray-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
          <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-sm">
            <AvatarImage src={seamstress.avatar} alt={seamstress.name} />
            <AvatarFallback>{seamstress.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-bold text-gray-900 text-center">{seamstress.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 mb-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">{seamstress.rating.toFixed(1)}</span>
            <span className="text-gray-400 text-sm">({seamstress.completedJobs} jobs)</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
            <MapPin className="w-3 h-3" />
            {seamstress.city} - {seamstress.state}
          </div>
          
          <div className="w-full flex justify-center">
             {getStatusBadge(application.status)}
          </div>
        </div>

        {/* Right: Details & Portfolio */}
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Mensagem do Candidato</h4>
                <div className="bg-blue-50 p-3 rounded-lg text-gray-700 text-sm italic border-l-4 border-blue-400">
                  "{application.message}"
                </div>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                {new Date(application.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Especialidades</h4>
              <div className="flex flex-wrap gap-2">
                {seamstress.specialties.map((spec, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {seamstress.portfolio && seamstress.portfolio.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Portfólio Recente</h4>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {seamstress.portfolio.slice(0, 3).map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Portfolio ${idx}`} 
                      className="w-20 h-20 object-cover rounded-md border border-gray-200 hover:scale-105 transition-transform cursor-pointer" 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white gap-2">
              <MessageSquare className="w-4 h-4" />
              Contatar
            </Button>
            {application.status === 'pending' && (
              <>
                <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Aprovar
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-2">
                  <XCircle className="w-4 h-4" />
                  Recusar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
