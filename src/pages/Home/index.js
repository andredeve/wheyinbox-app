import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Marcas from "../../components/Marcas";

export default function Home(){

  return(
    <div>
      <Header/>
      <Marcas/>
    </div>
  )
}