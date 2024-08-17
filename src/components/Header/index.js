import { useContext } from "react";
import './header.css'; 
import { AuthContext } from '../../contexts/auth';
import Logo from '../../assets/Logo.png';
import {Link} from 'react-router-dom';

export default function Header(){

    const {logout} = useContext(AuthContext);

    async function handlerLogout(){
      await logout();
    }

    return(
        <header>
            <div className="header-content">
                <div className="logo-container">
                    <img src={Logo} alt="Logo" className="logo" />
                </div>
            
                <button className="logout-button" onClick={logout}>
                     Sair
                </button>
            </div>
        </header>
    )
}