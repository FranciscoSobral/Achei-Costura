import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home';
import InfoEmpresaPage from '../pages/info-empresa';
import InfoCostureiroPage from '../pages/info-costureiro';
import AnunciePage from '../pages/Anuncie';
import CadastroPage from '../pages/cadastro';
import CadastroStep2Page from '../pages/CadastroStep2';
import CadastroStep3Page from '../pages/CadastroStep3'; 
import LoginPage from '../pages/login';
import EsqueciSenhaPage from '../pages/EsqueciSenha';
import PlanosPage from '../pages/Planos';
import SobreNosPage from '../pages/SobreNos';
import PagamentoPage from '../pages/Pagamento';
import ContatoPage from '../pages/Contato';
import MeuPerfilPage from '../pages/MeuPerfil';
import { AuthProvider } from '../context/AuthContext';

function AppRoutes() {
  return (
    <AuthProvider> {/* AuthProvider DEVE envolver tudo que usa useAuth */}
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planos" element={<PlanosPage />} />
      <Route path="/sobre-nos" element={<SobreNosPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/anuncie" element={<AnunciePage />} />
      <Route path="/meu-perfil" element={<MeuPerfilPage />} />
      <Route path="/empresas/:id" element={<InfoEmpresaPage />} />
      <Route path="/costureiros/:id" element={<InfoCostureiroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/esqueci-senha" element={<EsqueciSenhaPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />
      <Route path="/cadastrostep2" element={<CadastroStep2Page />} />
      <Route path="/cadastrostep3" element={<CadastroStep3Page />} /> 
      <Route path="/pagamento" element={<PagamentoPage />} />
    </Routes>
    </AuthProvider>
  );
}

export default AppRoutes;