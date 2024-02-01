import { useState } from 'react';
import './home.css';

import {Link} from 'react-router-dom';

export default function Home(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
      <div className='home-container'>
        <h1>WheyInBox</h1>
        <span>A sua loja online de suplementos</span>
        <form className='form'>
          <input
            type='text'
            placeholder='E-mail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />

        <input
            autoComplete={false}
            type='password'
            placeholder='Senha' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />
        
        <button type='submit'>Entrar</button>
        </form>

        <Link
         className='button-link'
         to="/register"
        >
          Não possuí uma conta? Cadastre-se
        </Link>

      </div>
    )
  }
  