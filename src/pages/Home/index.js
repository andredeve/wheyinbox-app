import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import './home.css';
import { useNavigate } from 'react-router-dom';

export default function Home(){

  const { user, products, adicionarItem} = useContext(AuthContext);
  const navigate = useNavigate();

  return(
    <div>
      <Header/>
      <h3 className="grid-title">Minha informações - {user.nome}</h3> 
    </div>
  )
}