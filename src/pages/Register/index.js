import { useState, useContext } from 'react';
import './register.css';
import Logo from '../../assets/Logo.png';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signUp, loadingauth  } = useContext(AuthContext);


    async function handlerSubmit(e){
        e.preventDefault();
        if (nome !== '' && email !== '' && password !== ''){
          await signUp(email, password, nome);
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
              placeholder='Nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
          />

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
          
          <button type='submit'>{loadingauth  ? 'Carregando.. ' : 'Cadastrar'}</button>
        </form>

        <Link
         className='button-link'
         to="/"
        >
          Já possuí uma conta? Faça o Login.
        </Link>

      </div>
    )
  }
  