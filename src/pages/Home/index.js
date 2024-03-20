import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Marcas from "../../components/Marcas";
import ListaProd from "../../components/ListaProd";
import './home.css';
import { useNavigate } from 'react-router-dom';

export default function Home(){

  const { products, adicionarItem} = useContext(AuthContext);
  const navigate = useNavigate();

  function handleAdcionarProd(product){
    adicionarItem(product.id);
    navigate('/carrinho');
  }

  return(
    <div>
      <Header/>
      <Marcas/>
      <h3 className="grid-title">Destaques</h3> 
      <ListaProd products={products} adicionarProduto={handleAdcionarProd} />
    </div>
  )
}