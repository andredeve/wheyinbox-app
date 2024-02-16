import React from 'react';
import logo1 from '../../assets/logo1.png'; // Importe as logos aqui
import logo2 from '../../assets/logo2.png';
import logo3 from '../../assets/logo3.png';
import logo4 from '../../assets/logo4.png';
import logo5 from '../../assets/logo5.png';
import logo6 from '../../assets/logo6.png';
import './marcas.css'; // Importe o CSS para estilização

//teste
function Marcas() {
  return (
    <div className="brand-grid-container"> 
        <h3 className="brand-grid-title">As Melhores Marcas</h3>
        <div className="brand-grid">
            <img src={logo1} alt="Logo 1" className="brand-logo" />
            <img src={logo2} alt="Logo 2" className="brand-logo" />
            <img src={logo3} alt="Logo 3" className="brand-logo" />
            <img src={logo4} alt="Logo 4" className="brand-logo" />
            <img src={logo5} alt="Logo 5" className="brand-logo" />
            <img src={logo6} alt="Logo 6" className="brand-logo" />
        </div>
    </div>
  );
}

export default Marcas;
