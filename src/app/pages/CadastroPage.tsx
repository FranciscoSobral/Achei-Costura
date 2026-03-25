import React from 'react';
import { Link } from 'react-router';
import { useCadastro, CadastroProvider } from '../context/CadastroContext';
import Step1CriarConta from '../components/Step1CriarConta';
import Step2InformacoesBasicas from '../components/Step2InformacoesBasicas';
import Step3PerfilProfissional from '../components/Step3PerfilProfissional';

const CadastroContent: React.FC = () => {
  const { currentStep, setCurrentStep, loading, error } = useCadastro();

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4">
      <div className="cadastro-card w-full max-w-2xl bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="form-header text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-4 flex items-center justify-center text-white text-2xl">
            👕
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crie sua Conta</h1>
          <p className="text-gray-600">Junte-se à nossa plataforma de costura</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Progress Indicator */}
        <div className="form-progress flex justify-between items-center mb-8 relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 -z-10">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
            />
          </div>

          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`progress-step flex flex-col items-center ${
                currentStep >= step ? 'active' : ''
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  currentStep >= step
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {step}
              </div>
              <p
                className={`text-xs mt-2 ${
                  currentStep >= step ? 'text-green-600 font-medium' : 'text-gray-500'
                }`}
              >
                {step === 1 && 'Criar Conta'}
                {step === 2 && 'Informações'}
                {step === 3 && 'Finalizar'}
              </p>
            </div>
          ))}
        </div>

        {/* Steps Content */}
        <div className="steps-content">
          {currentStep === 1 && <Step1CriarConta />}
          {currentStep === 2 && <Step2InformacoesBasicas onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <Step3PerfilProfissional onBack={handleBack} />}
        </div>

        {/* Footer */}
        {currentStep === 1 && (
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <span className="text-gray-600">Já tem uma conta? </span>
            <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
              Entrar
            </Link>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mb-4"></div>
              <p className="text-gray-700">Processando...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const CadastroPage: React.FC = () => {
  return (
    <CadastroProvider>
      <CadastroContent />
    </CadastroProvider>
  );
};
