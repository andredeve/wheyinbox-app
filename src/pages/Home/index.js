import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Marcas from "../../components/Marcas";
import ListaProd from "../../components/ListaProd";
import './home.css';

export default function Home(){

  const products = [
    {
      id: 1,
      name: "Pré-treino Hor...",
      image: require('../../assets/produtos/horus-300-frutas-vermelhas.png'),
      price: "$19.99"
    },
    {
      id: 2,
      name: "Whey 100% Con...",
      image: require('../../assets/produtos/whey-100-900g-cookies-max.png'),
      price: "$29.99"
    },
    {
      id: 3,
      name: "Coqueteleira Bla...",
      image: require('../../assets/produtos/coqueteleira-duas-divisorias-black-skull.png'),
      price: "$39.99"
    },
    {
      id: 4,
      name: "Creatina Turbo Bl...",
      image: require('../../assets/produtos/creatina-turbo-300-black-skull.png'),
      price: "$49.99"
    },
    {
      id: 5,
      name: "Whey 100%HD Bla...",
      image: require('../../assets/produtos/whey-100-hd-900-black-skull.png'),
      price: "$24.99"
    },
    {
      id: 6,
      name: "Whey Isolado Nutr...",
      image: require('../../assets/produtos/whey-isolado-nutrata-900-chocolate.png'),
      price: "$39.99"
    },
    {
      id: 7,
      name: "Garrafa Mixer Por...",
      image: require('../../assets/produtos/mixer-liquidificador.png'),
      price: "$14.99"
    },
    {
      id: 8,
      name: "Barrinha Brownie Bla...",
      image: require('../../assets/produtos/barrinha-brownie-black-skull.png'),
      price: "$9.99"
    }
  ];

  return(
    <div>
      <Header/>
      <Marcas/>
      <h3 className="grid-title">As melhores marcas</h3> 
      <ListaProd products={products} />
    </div>
  )
}