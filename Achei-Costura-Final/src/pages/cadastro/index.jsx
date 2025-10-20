import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SpeechButton from '../../components/SpeechButton';
import './style.css';

function CadastroPage() {
  // REMOVIDO: O estado 'userType' não é mais necessário.
  // const [userType, setUserType] = useState('Profissional');

  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    // REMOVIDO: 'nomeEmpresa' não é mais necessário.
    telefone: '',
    email: '',
    senha: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // REMOVIDO: A função 'handleUserTypeChange' não é mais necessária.

  const handleSubmit = (e) => {
    e.preventDefault();
    // A lógica de envio agora é mais simples.
    console.log({ userType: 'Profissional', ...formData });
    alert('Primeira etapa concluída! Redirecionando para a próxima etapa...');
    navigate('/cadastrostep2'); 
  };
  
  const textoTitulo = "Crie sua Conta";
  // Textos desnecessários foram removidos.
  const textoNome = "Nome";
  const textoSobrenome = "Sobrenome";
  const textoTelefone = "Número de telefone";
  const textoEmail = "Email";
  const textoSenha = "Senha";

  return (
    <div className="cadastro-container">
      <form onSubmit={handleSubmit} className="cadastro-card">
        <div className="form-header">
          <h2>{textoTitulo}</h2>
          <SpeechButton textToSpeak={textoTitulo} />
        </div>

        {/* REMOVIDO: O seletor 'Você é:' (Profissional/Empresa) foi retirado. */}

        {/* Os campos de Nome e Sobrenome agora aparecem diretamente. */}
        <div className="form-group">
          <div className="form-label-container">
            <label htmlFor="nome">{textoNome}</label>
            <SpeechButton textToSpeak={textoNome} />
          </div>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <div className="form-label-container">
            <label htmlFor="sobrenome">{textoSobrenome}</label>
            <SpeechButton textToSpeak={textoSobrenome} />
          </div>
          <input type="text" id="sobrenome" name="sobrenome" value={formData.sobrenome} onChange={handleChange} required />
        </div>

        {/* O resto do formulário continua igual. */}
        <div className="form-group">
          <div className="form-label-container">
            <label htmlFor="telefone">{textoTelefone}</label>
            <SpeechButton textToSpeak={textoTelefone} />
          </div>
          <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <div className="form-label-container">
            <label htmlFor="email">{textoEmail}</label>
            <SpeechButton textToSpeak={textoEmail} />
          </div>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <div className="form-label-container">
            <label htmlFor="senha">{textoSenha}</label>
            <SpeechButton textToSpeak={textoSenha} />
          </div>
          <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn-avancar">Avançar</button>
        
        <p className="login-redirect">
          Já possui uma conta? <Link to="/login">Faça login</Link>
        </p>
      </form>
    </div>
  );
}

export default CadastroPage;