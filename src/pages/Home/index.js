import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";


export default function Home(){

  const {logout} = useContext(AuthContext);

  async function handlerLogout(){
    await logout();
  }
  return(
    <div>
      <h1>Pagina Dashboard</h1>
      <button onClick={handlerLogout}>Sair</button>
    </div>
  )
}