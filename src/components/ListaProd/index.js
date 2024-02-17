import React from 'react';
import { FaShoppingCart, FaPlus} from 'react-icons/fa';
import './listaprod.css';

const ListaProd = ({ products }) => {
  return (
    <div className="product-list-container">
        <div className="product-list">
            {products.map((product, index) => (
                <div key={index} className="product-box">
                    <button className="add-to-cart">
                        <FaShoppingCart />
                    </button>
                    <div className="product-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-details">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ListaProd;
