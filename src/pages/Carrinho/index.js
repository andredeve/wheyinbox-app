import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './carrinho.css';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

function Carrinho() {
  const { itens, calcularTotal, adicionarItem, removerItem, diminuirQuantidade, alterarQuantidade } = useContext(AuthContext);
  const navigate = useNavigate();

  const finalizarCompra = () => {
    const total = calcularTotal().toFixed(1);
    navigate('/checkout', { state: { total } });
  };

  return (
    <div className="carrinho-de-compras">
      <h2>Carrinho de Compras</h2>
      <ul>
        {itens.map(item => (
          <li key={item.id} className="item">
            <div className='itens-carrinho'>
              <img src={item.imagem} alt={item.nome} className="imagem-produto" />
              <div className='itens-price-descricao'>
                <div className='nome-produto'>
                  <h3>{item.nome}</h3>
                </div>
                <div className='descricao-produto'>
                  <h4>O melhor produto de todos os tempos ...</h4>
                </div>
                <div className='itens-price-acao'>
                  <div className='itens-price'>
                    <h2>R${item.preco.toFixed(2)}</h2>
                  </div>    
                  <div className='itens-acao'>
                    <button className="botao-acao" onClick={() => adicionarItem(item.id)}>+</button>
                    <input className="input-acao" type="text" value={item.quantidade} onChange={(e) => alterarQuantidade(item.id, parseInt(e.target.value) || 1)} />
                    <button className="botao-acao" onClick={() => diminuirQuantidade(item.id)}>-</button>
                    <button className="botao-acao-remover" onClick={() => removerItem(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />  
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="total">Total: R${calcularTotal().toFixed(2)}</p>
      <button className="botao" onClick={() =>  navigate('/home')}>Continuar Comprando</button>
      <button className="botao" onClick={finalizarCompra}>Finalizar Compra</button>
    </div>
  );
}

export default Carrinho;
