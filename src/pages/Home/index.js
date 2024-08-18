import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import './home.css';
import { useNavigate } from 'react-router-dom';

import {db, storage} from '../../services/firebaseConection';
import {doc, updateDoc} from 'firebase/firestore';

export default function Home(){

  const { user, setUser, storageUser, loadingauth} = useContext(AuthContext);
  const navigate = useNavigate();


  const [nome, setNome] = useState(user && user.nome);
  const [classificacao, setClassificacao] = useState(user && user.classificacao );
  const [primeiraOpcao, setPrimeiraOpcao] = useState(user && user.cidadeprimeira);
  const [segundaOpcao, setSegundaOpcao] = useState(user && user.cidadesegunda);

  console.log(user.classificacao);


  const cidades = [
    'Nova Andradina',
    'Três Lagoas',
    'Dourados',
    'Coxim',
    'Aquidauana',
    'Jardim',
    'Ponta Porã'
  ];

  async function handlerSubmit(e){
      e.preventDefault();
      if (nome !== '' && classificacao !== '' && primeiraOpcao!== '' && segundaOpcao!== ''){

        const docRef = doc(db, "users", user.uid)


        await updateDoc(docRef, {
          nome: nome,
          classificacao
        })
        .then(() =>{
          let data ={
            ...user, 
            nome: nome,
          }

          setUser(data);
          storageUser(data);
        })
      }
  }

  return(
    <div>
      <Header/>
      <h3 className="grid-title">Minha informações - {user.nome}</h3> 

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

          <button type='submit'>{loadingauth  ? 'Carregando.. ' : 'Salvar'}</button>
        </form> 
    </div>
  )
}