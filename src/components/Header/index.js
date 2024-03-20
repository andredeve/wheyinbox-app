import { useContext } from "react";
import './header.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
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
                <button className="hamburger-button">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <div className="search-container">
                    <FontAwesomeIcon icon={faQrcode} className="qrcode-icon" />
                    <input type="text" placeholder="Ache seu suplemento" className="search-bar" />
                </div>

                <Link
                    className="cart-button"
                    to="/carrinho"
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> Carrinho
                </Link>

                <Link
                    className="cart-button"
                    to="/qrcodescann"
                >
                    <FontAwesomeIcon icon={faShoppingCart} /> QR CODE
                </Link>

                <button className="logout-button" onClick={logout}>
                    <FontAwesomeIcon icon={faUser} /> Sair
                </button>
            </div>
        </header>
    )
}