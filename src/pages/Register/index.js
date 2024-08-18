import { useState, useContext } from 'react';
import './register.css';
import Logo from '../../assets/Logo.png';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classificao, setClassificacao] = useState('');
    const [primeiraOpcao, setPrimeiraOpcao] = useState('');
    const [segundaOpcao, setSegundaOpcao] = useState('');

    const cidades = [
      'Nova Andradina',
      'Três Lagoas',
      'Dourados',
      'Coxim',
      'Aquidauana',
      'Jardim',
      'Ponta Porã'
    ];

    const { signUp, loadingauth  } = useContext(AuthContext);


    async function handlerSubmit(e){
        e.preventDefault();
        if (nome !== '' && email !== '' && password !== ''){
          await signUp(email, password, nome, classificao, primeiraOpcao, segundaOpcao);
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
              placeholder='Nome Completo'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
          />

          <input
              type='text'
              placeholder='Classificação'
              value={classificao}
              onChange={(e) => setClassificacao(e.target.value)}
          />

          <label htmlFor="primeiraOpcao">1ª Opção: </label>
          <select
            id="primeiraOpcao"
            value={primeiraOpcao}
            onChange={(e) => setPrimeiraOpcao(e.target.value)}
          >
            <option value="">Selecione uma cidade</option>
            {cidades.map((cidade, index) => (
              <option key={index} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>

          <label htmlFor="segundaOpcao">2ª Opção: </label>
          <select
            id="segundaOpcao"
            value={segundaOpcao}
            onChange={(e) => setSegundaOpcao(e.target.value)}
          >
            <option value="">Selecione uma cidade</option>
            {cidades
              .filter((cidade) => cidade !== primeiraOpcao) // Filtra a primeira opção para não permitir seleção duplicada
              .map((cidade, index) => (
                <option key={index} value={cidade}>
                  {cidade}
                </option>
              ))}
          </select>

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
  