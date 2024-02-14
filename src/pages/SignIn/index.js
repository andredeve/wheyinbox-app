import { useState, useContext} from 'react';
import './signin.css';
import Logo from '../../assets/Logo.png';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';


export default function SignIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useContext(AuthContext);


    function handlerSubmit(e){
        e.preventDefault();
        if (email !== '' && password !== ''){
            signIn(email, password);
        }
    }

    return(
      <div className='home-container'>

        <div className='login-area'>
            <img src={Logo}/>
        </div>
      
        <form className='form' onSubmit={handlerSubmit}>
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
  