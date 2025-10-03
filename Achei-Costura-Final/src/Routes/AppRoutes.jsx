import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importações de TODAS as suas páginas
import HomePage from '../pages/home';
import EmpresasPage from '../pages/Empresas';
import InfoEmpresaPage from '../pages/info-empresa';
import CostureirosPage from '../pages/Costureiros';
import InfoCostureiroPage from '../pages/info-costureiro';
import AnunciePage from '../pages/Anuncie';
import CadastroPage from '../pages/cadastro';
import LoginPage from '../pages/login';
import EsqueciSenhaPage from '../pages/EsqueciSenha';
import CadastroStep2Page from '../pages/CadastroStep2'; // Importando a página da etapa 2

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/empresas" element={<EmpresasPage />} />
      <Route path="/empresas/:id" element={<InfoEmpresaPage />} />
      <Route path="/costureiros" element={<CostureirosPage />} />
      <Route path="/costureiros/:id" element={<InfoCostureiroPage />} />
      <Route path="/anuncie" element={<AnunciePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />

      {/* A ROTA QUE ESTAVA FALTANDO FOI ADICIONADA AQUI */}
      <Route path="/cadastrostep2" element={<CadastroStep2Page />} />
    </Routes>
  );
}

export default AppRoutes;