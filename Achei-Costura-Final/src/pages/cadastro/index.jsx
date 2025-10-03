import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';

function CadastroPage() {
  const [tipoDeCadastro, setTipoDeCadastro] = useState('profissional');
  const navigate = useNavigate();

  const irParaEtapa2 = (evento) => {
    evento.preventDefault(); 
    navigate('/cadastrostep2'); 
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={irParaEtapa2}>
        <h1>Crie sua Conta</h1>
        
        <div className="form-group tipo-cadastro-container">
          <label>Você é:</label>
          <div className="botoes-tipo">
            <button 
              type="button"
              className={`tipo-cadastro-btn ${tipoDeCadastro === 'profissional' ? 'active' : ''}`}
              onClick={() => setTipoDeCadastro('profissional')}
            >
              Profissional
            </button>
            <button 
              type="button"
              className={`tipo-cadastro-btn ${tipoDeCadastro === 'empresa' ? 'active' : ''}`}
              onClick={() => setTipoDeCadastro('empresa')}
            >
              Empresa
            </button>
          </div>
        </div>

        {tipoDeCadastro === 'profissional' && (
          <>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" required />
            </div>
            <div className="form-group">
              <label htmlFor="sobrenome">Sobrenome:</label>
              <input type="text" id="sobrenome" name="sobrenome" required />
            </div>
          </>
        )}

        {tipoDeCadastro === 'empresa' && (
          <div className="form-group">
            <label htmlFor="nomeEmpresa">Nome da sua empresa:</label>
            <input type="text" id="nomeEmpresa" name="nomeEmpresa" required />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="telefone">Número (telefone):</label>
          <input type="tel" id="telefone" name="telefone" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group">
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" required />
        </div>

        <button type="submit" className="btn-cadastrar">Avançar</button>

        <div className="links-auxiliares-cadastro">
            <span>Já possui uma conta? </span>
            <Link to="/login">Faça login</Link>
        </div>
      </form>
    </div>
  );
}

export default CadastroPage;