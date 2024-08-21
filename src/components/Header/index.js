import { useContext } from "react";
import './header.css';
import { AuthContext } from '../../contexts/auth';
import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

export default function Header() {
    const { logout } = useContext(AuthContext);

    async function handlerLogout() {
        await logout();
    }

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-container">
                    <Link to="/">
                        <img src={Logo} alt="Logo" className="logo" />
                    </Link>
                </div>
             
                <nav className="nav-menu">
                    <ul>
                        <li>
                            <Link to="/home">Início</Link>
                        </li>
                        <li>
                            <Link to="/ranking-das-cidades">Ranking das Cidades</Link>
                        </li>
                        <li>
                            <Link to="/ranking-por-cidades-por-classificado">Ranking dos Candidatos por Cidade</Link>
                        </li>
                        <li>
                            <Link to="/disputa">Disputa</Link>
                        </li>
                        <li>
                            <Link to="/documentos">Documentos</Link>
                        </li>
                        <li>
                            <Link to="/profile">Perfil</Link>
                        </li>
                    </ul>
                </nav>


                <button className="logout-button" onClick={handlerLogout}>
                    Sair
                </button>
            </div>
        </header>
    );
}
