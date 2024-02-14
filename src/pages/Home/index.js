import './home.css';
import Logo from '../../assets/Logo.png';

export default function Home(){
    return(
      <div className='home-container'>

          <img src={Logo}/>
          <h1>A sua loja online de suplementos</h1> 

      </div>
    )
  }
  