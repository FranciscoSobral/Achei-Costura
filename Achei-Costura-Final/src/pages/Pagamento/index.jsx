import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaQrcode, FaBarcode, FaCheckCircle, FaLock, FaArrowLeft } from 'react-icons/fa';
import './style.css';

const Pagamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 1. RECEBE OS DADOS DA TELA DE PLANOS
  // Se o usuário tentar entrar direto pelo link sem escolher plano, usa um padrão.
  const produto = location.state || { 
    nome: "Item Desconhecido", 
    preco: "R$ 0,00", 
    tipo: "desconhecido" 
  };

  const [metodo, setMetodo] = useState('pix'); // Começa selecionado no PIX
  const [loading, setLoading] = useState(false);
  const [opcoesParcelamento, setOpcoesParcelamento] = useState([]);

  // --- CÁLCULO DE PARCELAS (Roda ao abrir a tela) ---
  useEffect(() => {
    // Limpa a string de preço (Ex: "R$ 290,00" vira 290.00)
    const valorLimpo = produto.preco
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();
    
    const valorNumerico = parseFloat(valorLimpo);

    if (!isNaN(valorNumerico) && valorNumerico > 0) {
      const opcoes = [];
      const parcelaMinima = 5.00; // Mínimo de 5 reais por parcela

      for (let i = 1; i <= 12; i++) {
        const valorParcela = valorNumerico / i;
        
        // Se a parcela ficar muito barata, para de dividir
        if (valorParcela < parcelaMinima && i > 1) break;

        opcoes.push({
          qtd: i,
          texto: `${i}x de R$ ${valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${i === 1 ? '(à vista)' : 'sem juros'}`
        });
      }
      setOpcoesParcelamento(opcoes);
    } else {
        setOpcoesParcelamento([{ qtd: 1, texto: `1x de ${produto.preco} (à vista)` }]);
    }
  }, [produto.preco]);

  // --- SIMULAÇÃO DE PAGAMENTO ---
  const handleFinalizar = (e) => {
    e.preventDefault();
    setLoading(true);

    // AQUI ENTRARIA O CÓDIGO DO GATEWAY (Mercado Pago, Stripe, etc)
    // Por enquanto, vamos simular que deu certo após 2 segundos
    setTimeout(() => {
      setLoading(false);
      alert(`Sucesso! Você comprou: ${produto.nome} via ${metodo.toUpperCase()}`);
      
      // Aqui você mandaria para uma tela de "Obrigado" ou voltaria para Home
      navigate('/'); 
    }, 2000);
  };

  return (
    <div className="pagamento-container">
      <div className="pagamento-card">
        
        {/* CABEÇALHO */}
        <div className="pagamento-header">
          <button className="btn-voltar" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <h2>Finalizar Pagamento</h2>
          
          <div className="resumo-compra">
            <span className="produto-nome">{produto.nome}</span>
            <span className="produto-preco">{produto.preco}</span>
          </div>
          
          <p className="seguranca-msg">
            <FaLock size={12} /> Ambiente Criptografado e Seguro
          </p>
        </div>

        {/* ABAS DE SELEÇÃO */}
        <div className="metodos-tab">
          <button 
            className={`tab-item ${metodo === 'pix' ? 'ativo' : ''}`}
            onClick={() => setMetodo('pix')}
          >
            <FaQrcode size={20} />
            <span>PIX</span>
          </button>

          <button 
            className={`tab-item ${metodo === 'cartao' ? 'ativo' : ''}`}
            onClick={() => setMetodo('cartao')}
          >
            <FaCreditCard size={20} />
            <span>Cartão</span>
          </button>

          <button 
            className={`tab-item ${metodo === 'boleto' ? 'ativo' : ''}`}
            onClick={() => setMetodo('boleto')}
          >
            <FaBarcode size={20} />
            <span>Boleto</span>
          </button>
        </div>

        {/* CONTEÚDO DINÂMICO (CORPO) */}
        <div className="pagamento-body">
          
          {/* --- OPÇÃO PIX --- */}
          {metodo === 'pix' && (
            <div className="conteudo-aba fade-in">
              <div className="destaque-verde">
                <FaCheckCircle className="icon-sucesso" />
                <p className="titulo-destaque">Aprovação Imediata!</p>
                <p className="desc-destaque">Libera seu acesso em segundos.</p>
              </div>
              <button className="btn-pagar btn-pix" onClick={handleFinalizar} disabled={loading}>
                {loading ? "Gerando Código..." : "Gerar PIX Copia e Cola"}
              </button>
            </div>
          )}

          {/* --- OPÇÃO CARTÃO --- */}
          {metodo === 'cartao' && (
            <form className="conteudo-aba fade-in" onSubmit={handleFinalizar}>
              <div className="input-group">
                <label>Número do Cartão</label>
                <input type="text" placeholder="0000 0000 0000 0000" required />
              </div>
              
              <div className="row-dupla">
                <div className="input-group">
                  <label>Validade</label>
                  <input type="text" placeholder="MM/AA" required />
                </div>
                <div className="input-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" required />
                </div>
              </div>

              <div className="input-group">
                <label>Nome no Cartão</label>
                <input type="text" placeholder="COMO ESTÁ NO CARTÃO" required />
              </div>

              {/* SELETOR DE PARCELAS */}
              <div className="input-group">
                <label>Parcelamento</label>
                <select>
                  {opcoesParcelamento.map((op) => (
                    <option key={op.qtd} value={op.qtd}>{op.texto}</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn-pagar btn-cartao" disabled={loading}>
                {loading ? "Processando..." : "Finalizar Pedido"}
              </button>
            </form>
          )}

          {/* --- OPÇÃO BOLETO --- */}
          {metodo === 'boleto' && (
            <div className="conteudo-aba fade-in">
              <div className="aviso-laranja">
                <strong>Atenção:</strong> Compensação em até 3 dias úteis.
              </div>
              <ul className="lista-info">
                <li>Pague em qualquer lotérica ou app bancário.</li>
                <li>Não ocupa limite do seu cartão de crédito.</li>
              </ul>
              <button className="btn-pagar btn-boleto" onClick={handleFinalizar} disabled={loading}>
                {loading ? "Gerando..." : "Gerar Boleto"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Pagamento;