import { useState, useContext } from 'react';
import './register.css';
import Logo from '../../assets/Logo.png';
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function Register(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [classificacao, setClassificacao] = useState('');
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
        if (nome !== '' && email !== '' && password !== '' && classificacao !== '' && primeiraOpcao !== '' && segundaOpcao !== ''){
          await signUp(email, password, nome, classificacao, primeiraOpcao, segundaOpcao);
        }else{
          toast.error("Preencha todos os campos!", { className: 'toast-error' });
        }
    }

    return(
      <div className='home-container'>

        <div className='login-area'>
            <img src={Logo}/>
        </div>
      
        <form className='form' onSubmit={handlerSubmit}>
          <label htmlFor="nome" className="label">Nome: </label>
          <input
              type='text'
              placeholder='Nome Completo'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
          />
          
          <label htmlFor="classificacao" className="label">Classificação (De acordo com a   
           <a href="https://docs.google.com/spreadsheets/d/1lvVJMEKE9whOroYyZJvaxIbcD0vpRqQo/edit#gid=1820733924" target="_blank" rel="noopener noreferrer" className="link">
           Planilha
           </a>
           ): 
          </label>
          <input
              type='text'
              placeholder='Classificação'
              value={classificacao}
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
          
          <label htmlFor="email" className="label">E-mail: </label>
          <input
              type='text'
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
          />
          
          <label htmlFor="senha" className="label">Senha: </label>
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
  