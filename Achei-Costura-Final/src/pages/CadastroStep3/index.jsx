import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SpeechButton from '../../components/SpeechButton';
import './style.css';

function CadastroStep3Page() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Recupera os dados acumulados dos passos anteriores
  const previousData = location.state?.previousData || {};

  const [formData, setFormData] = useState({
    tempoExperiencia: '',
    numCostureiros: '',
    disponibilidade: '',
    especialidade: '',
    maquinas: '',
    faccoes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();

    // Validação simples
    if (!formData.tempoExperiencia || !formData.numCostureiros) {
        alert('Por favor, preencha o tempo de experiência e tamanho da equipe.');
        return;
    }

    // Junta os dados
    const currentData = { ...previousData, ...formData };
    console.log('➡️ Indo para o Passo 4 com:', currentData);

    // Navega para o passo 4
    navigate('/cadastro-step4', { 
        state: { previousData: currentData } 
    });
  };

  const textos = {
    exp: "Há quanto tempo você trabalha com costura?",
    equipe: "Quantos costureiros trabalham com você?",
    disp: "Qual seu nível de disponibilidade para produção?",
    esp: "Sua especialidade",
    maq: "Suas Máquinas",
    fac: "Sua Facção"
  };

  const opcoesExp = ["De 0 a 2 anos", "De 2 a 5 anos", "De 5 a 10 anos", "Mais de 10 anos"];
  const opcoesEquipe = ["Trabalho sozinho(a)", "2 costureiros", "De 3 a 5 costureiros", "De 6 a 10 costureiros", "10 ou mais costureiros"];
  const opcoesDisp = ["Geral (Manhã e Tarde)", "Manhã", "Tarde", "Apenas Finais de semana"];

  return (
    <div className="cadastro-step3-container">
      <div className="cadastro-card">
        
        <div className="form-header">
            <h2>Detalhes Profissionais</h2>
            <SpeechButton textToSpeak="Conte um pouco mais sobre sua experiência e estrutura de trabalho." />
        </div>

        {/* Barra de Progresso Padronizada */}
        <div className="form-progress">
            <div className="progress-step completed"><span>✓</span><p>Básico</p></div>
            <div className="progress-step completed"><span>✓</span><p>Endereço</p></div>
            <div className="progress-step active"><span>3</span><p>Detalhes</p></div>
            <div className="progress-step"><span>4</span><p>Mídia</p></div>
        </div>

        <form onSubmit={handleNextStep}>
            
            {/* Pergunta 1: Tempo de Experiência */}
            <div className="form-group">
                <div className="form-label-container">
                    <label>{textos.exp}</label>
                    <SpeechButton textToSpeak={textos.exp} />
                </div>
                <div className="radio-group">
                    {opcoesExp.map(opcao => (
                    <label key={opcao} className={`radio-option ${formData.tempoExperiencia === opcao ? 'selected' : ''}`}>
                        <input type="radio" name="tempoExperiencia" value={opcao} onChange={handleChange} checked={formData.tempoExperiencia === opcao} />
                        {opcao}
                    </label>
                    ))}
                </div>
            </div>

            {/* Pergunta 2: Tamanho da Equipe */}
            <div className="form-group">
                <div className="form-label-container">
                    <label>{textos.equipe}</label>
                    <SpeechButton textToSpeak={textos.equipe} />
                </div>
                <div className="radio-group">
                    {opcoesEquipe.map(opcao => (
                    <label key={opcao} className={`radio-option ${formData.numCostureiros === opcao ? 'selected' : ''}`}>
                        <input type="radio" name="numCostureiros" value={opcao} onChange={handleChange} checked={formData.numCostureiros === opcao} />
                        {opcao}
                    </label>
                    ))}
                </div>
            </div>

            {/* Pergunta 3: Disponibilidade */}
            <div className="form-group">
                <div className="form-label-container">
                    <label>{textos.disp}</label>
                    <SpeechButton textToSpeak={textos.disp} />
                </div>
                <div className="radio-group">
                    {opcoesDisp.map(opcao => (
                    <label key={opcao} className={`radio-option ${formData.disponibilidade === opcao ? 'selected' : ''}`}>
                        <input type="radio" name="disponibilidade" value={opcao} onChange={handleChange} checked={formData.disponibilidade === opcao} />
                        {opcao}
                    </label>
                    ))}
                </div>
            </div>

            {/* Campos de Texto */}
            <div className="form-group">
                <div className="form-label-container">
                    <label htmlFor="especialidade">{textos.esp}</label>
                    <SpeechButton textToSpeak={textos.esp} />
                </div>
                <input 
                    type="text" 
                    id="especialidade" 
                    name="especialidade" 
                    value={formData.especialidade} 
                    onChange={handleChange} 
                    placeholder="Ex.: Malhas, modinha, bonés..." 
                    className="input-text"
                />
            </div>

            <div className="form-group">
                <div className="form-label-container">
                    <label htmlFor="maquinas">{textos.maq}</label>
                    <SpeechButton textToSpeak={textos.maq} />
                </div>
                <input 
                    type="text" 
                    id="maquinas" 
                    name="maquinas" 
                    value={formData.maquinas} 
                    onChange={handleChange} 
                    placeholder="Ex.: Reta, Overloque..." 
                    className="input-text"
                />
            </div>

            <div className="form-group">
                <div className="form-label-container">
                    <label htmlFor="faccoes">{textos.fac}</label>
                    <SpeechButton textToSpeak={textos.fac} />
                </div>
                <input 
                    type="text" 
                    id="faccoes"       
                    name="faccoes"     
                    value={formData.faccoes}
                    onChange={handleChange} 
                    placeholder="Ex.: Lavanderia, Corte..." 
                    className="input-text"
                />
            </div>

            <div className="form-navigation">
                <button 
                    type="button" 
                    className="btn-voltar" 
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </button>
                <button type="submit" className="btn-avancar">
                    Avançar para Mídia
                </button>
            </div>

        </form>
      </div>
    </div>
  );
}

export default CadastroStep3Page;