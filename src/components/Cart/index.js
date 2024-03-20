import React from 'react';

class Cart extends React.Component {
  render() {
    const { itens } = this.props;

    return (
      <div>
        <h2>Carrinho de Compras</h2>
        <ul>
          {itens.map(item => (
            <li key={item.id}>
              {item.nome} - R${item.preco.toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Total: R${this.calcularTotal().toFixed(2)}</p>
      </div>
    );
  }

  calcularTotal() {
    const { itens } = this.props;
    return itens.reduce((total, item) => total + item.preco, 0);
  }
}

export default Cart;
