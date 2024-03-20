import React from 'react';
import { FaShoppingCart, FaPlus} from 'react-icons/fa';
import './listaprod.css';

const ListaProd = ({ products, adicionarProduto }) => {

  return (
    <div className="product-list-container">
        <div className="product-list">
            {products.map((product, index) => (
                <div key={index} className="product-box">
                    <button className="add-to-cart" onClick={() => adicionarProduto(product)}>
                        <FaShoppingCart />
                    </button>
                    <div className="product-image">
                        <img src={product.imagem} alt={product.nome} />
                    </div>
                    <div className="product-details">
                        <h3 className="product-name">{product.nome}</h3>
                        <p className="product-price">{product.preco}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ListaProd;
