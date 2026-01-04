import React from 'react';
import { Link } from 'react-router-dom'; // Trocando 'a' por 'Link'
import SpeechButton from '../../components/SpeechButton'; // Nosso botão de áudio
import './style.css'; 

export function LoginPage() {
  const textoTitulo = "Login";
  const textoEmail = "Email";
  const textoSenha = "Senha";

  // No futuro, você pode adicionar a lógica de login aqui
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login simulado!');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        
        <div className="form-header">
          <h1>{textoTitulo}</h1>
          <SpeechButton textToSpeak={textoTitulo} />
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="form-label-container">
              <label htmlFor="email">{textoEmail}</label>
              <SpeechButton textToSpeak={textoEmail} />
            </div>
            <input type="email" id="email" name="email" required />
          </div>
          
          <div className="input-group">
            <div className="form-label-container">
              <label htmlFor="senha">{textoSenha}</label>
              <SpeechButton textToSpeak={textoSenha} />
            </div>
            <input type="password" id="senha" name="senha" required />
          </div>
          
          <button type="submit" className="auth-button">
            Entrar
          </button>
        </form>

        <div className="auth-links">
          {/* Usando <Link> em vez de <a> */}
          <Link to="/esqueci-senha">Esqueceu a sua senha?</Link>
          <Link to="/cadastro">Não possui um cadastro?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;