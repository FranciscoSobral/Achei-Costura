import React, { useState } from 'react';
import './style.css';

function CadastroStep2() {
  // Estados para TODAS as perguntas
  const [experiencia, setExperiencia] = useState('');
  const [especialidades, setEspecialidades] = useState('');
  const [maquinas, setMaquinas] = useState('');
  const [numCostureiros, setNumCostureiros] = useState('');
  const [disponibilidade, setDisponibilidade] = useState('');

  return (
    <div className="cadastro-step2-container">
      
      {/* --- Pergunta de Tempo de Trabalho --- */}
      <div className="form-group">
        <label>Há quanto tempo você trabalha com costura?</label>
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" id="exp1" name="experiencia" value="0-2" onChange={(e) => setExperiencia(e.target.value)} />
            <label htmlFor="exp1">de 0 a 2 anos</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="exp2" name="experiencia" value="3-5" onChange={(e) => setExperiencia(e.target.value)} />
            <label htmlFor="exp2">de 3 a 5 anos</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="exp3" name="experiencia" value="6-10" onChange={(e) => setExperiencia(e.target.value)} />
            <label htmlFor="exp3">de 6 a 10 anos</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="exp4" name="experiencia" value="10+" onChange={(e) => setExperiencia(e.target.value)} />
            <label htmlFor="exp4">mais de 10 anos</label>
          </div>
        </div>
      </div>

      {/* --- Pergunta de Quantidade de Costureiros --- */}
      <div className="form-group">
        <label>Quantos costureiros trabalham com você?</label>
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" id="qt1" name="quantidade" value="sozinho" onChange={(e) => setNumCostureiros(e.target.value)} />
            <label htmlFor="qt1">Trabalho sozinho(a)</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="qt2" name="quantidade" value="2" onChange={(e) => setNumCostureiros(e.target.value)} />
            <label htmlFor="qt2">2 costureiros</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="qt3" name="quantidade" value="3-5" onChange={(e) => setNumCostureiros(e.target.value)} />
            <label htmlFor="qt3">De 3 a 5 costureiros</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="qt4" name="quantidade" value="6-9" onChange={(e) => setNumCostureiros(e.target.value)} />
            <label htmlFor="qt4">de 6 a 9 costureiros</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="qt5" name="quantidade" value="10+" onChange={(e) => setNumCostureiros(e.target.value)} />
            <label htmlFor="qt5">10 ou mais costureiros</label>
          </div>
        </div>
      </div>

      {/* --- Pergunta de Disponibilidade --- */}
      <div className="form-group">
        <label>Qual a sua disponibilidade para produção?</label>
        <div className="radio-group">
          <div className="radio-option">
            <input type="radio" id="disp1" name="disponibilidade" value="geral" onChange={(e) => setDisponibilidade(e.target.value)} />
            <label htmlFor="disp1">Geral (manhã e tarde)</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="disp2" name="disponibilidade" value="manha" onChange={(e) => setDisponibilidade(e.target.value)} />
            <label htmlFor="disp2">Manhã</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="disp3" name="disponibilidade" value="tarde" onChange={(e) => setDisponibilidade(e.target.value)} />
            <label htmlFor="disp3">Tarde</label>
          </div>
          <div className="radio-option">
            <input type="radio" id="disp4" name="disponibilidade" value="fds" onChange={(e) => setDisponibilidade(e.target.value)} />
            <label htmlFor="disp4">Apenas finais de semana</label>
          </div>
        </div>
      </div>

      {/* --- Pergunta de Especialidades --- */}
      <div className="form-group">
        <label htmlFor="especialidades">Suas especialidades:</label>
        <input 
          type="text" 
          id="especialidades" 
          placeholder="Ex.: Malha, moda praia, etc"
          value={especialidades}
          onChange={(e) => setEspecialidades(e.target.value)} 
        />
        <p className="dica">Dica: Para múltiplas respostas, separe-as por vírgula (,)</p>
      </div>

      {/* --- Pergunta de Máquinas --- */}
      <div className="form-group">
        <label htmlFor="maquinas">Suas Maquinas:</label>
        <input 
          type="text" 
          id="maquinas"
          placeholder="Ex.: Reta, Overloque, ponto conjugado, etc" 
          value={maquinas}
          onChange={(e) => setMaquinas(e.target.value)}
        />
        <p className="dica">Dica: Para múltiplas respostas, separe-as por vírgula (,)</p>
      </div>

      {/* --- BOTÃO DE CADASTRO ADICIONADO AQUI --- */}
      <button type="submit" className="btn-cadastrar">Cadastrar</button>
    </div>
  );
}

export default CadastroStep2;