import './home.css';
import Logo from '../../assets/Logo.png';


export default function Home(){

    return(
      <div className='home-container'>

        <div className='login-area'>
            <img src={Logo}/>
        </div>
        
        <span>A sua loja online de suplementos</span>

      </div>
    )
  }
  