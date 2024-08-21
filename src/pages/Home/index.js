import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import './home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CandidatosCount from '../../components/CandidatosCount';

import { db } from '../../services/firebaseConection';
import { doc, updateDoc } from 'firebase/firestore';

export default function Home() {
  const { user, setUser, storageUser, loadingauth, setLoadingAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nome, setNome] = useState(user && user.nome);
  const [classificacao, setClassificacao] = useState(user && user.classificacao);
  const [primeiraOpcao, setPrimeiraOpcao] = useState(user && user.cidadeprimeira);
  const [segundaOpcao, setSegundaOpcao] = useState(user && user.cidadesegunda);
  const [fetchCityRanking, setFetchCityRanking] = useState(false);

  const cidades = [
    'Nova Andradina',
    'Três Lagoas',
    'Dourados',
    'Coxim',
    'Aquidauana',
    'Jardim',
    'Ponta Porã'
  ];

  async function handlerSubmit(e) {
    e.preventDefault();
    
    // Remove o último espaço do nome, se houver
    const trimmedNome = nome.endsWith(' ') ? nome.slice(0, -1) : nome;
  
    if (trimmedNome !== '' && classificacao !== '' && primeiraOpcao !== '' && segundaOpcao !== '' && primeiraOpcao !== segundaOpcao && segundaOpcao !== primeiraOpcao) {
  
      const docRef = doc(db, "users", user.uid);
  
      setLoadingAuth(true);
      await updateDoc(docRef, {
        nome: trimmedNome,
        classificacao: classificacao,
        cidadeprimeira: primeiraOpcao,
        cidadesegunda: segundaOpcao
      })
      .then(() => {
        let data = {
          ...user,
          nome: trimmedNome,
          classificacao: classificacao,
          cidadeprimeira: primeiraOpcao,
          cidadesegunda: segundaOpcao
        };
  
        setLoadingAuth(false);
        setUser(data);
        storageUser(data);
        toast.success("Informações Atualizadas!", { className: 'toast-success' });
        setFetchCityRanking(prev => !prev); // Atualiza o ranking após o salvamento
      })
      .catch((error) => {
        setLoadingAuth(false);
        toast.error("Erro ao atualizar as informações!", { className: 'toast-error' });
      });
    } else {
      toast.error("Preencha todos os campos!", { className: 'toast-error' });
    }
  }
  

  return (
    <div className="container">
      <Header/>
      <h1>Total de Candidatos que Preencheram</h1>
      <h4><CandidatosCount/></h4>
      <h3 className="grid-title">Minhas Informações - {user.nome}</h3>

      <form className="form" onSubmit={handlerSubmit}>
        <label htmlFor="nome" className="label">Nome: </label>
        <input
          type='text'
          placeholder='Nome Completo'
          value={nome}
          onChange={(e) => setNome(e.target.value.toUpperCase())}
          disabled
        />


        <label htmlFor="classificacao" className="label">Classificação (De acordo com a   
            <a href="https://docs.google.com/spreadsheets/d/1lvVJMEKE9whOroYyZJvaxIbcD0vpRqQo/edit#gid=1820733924" target="_blank" rel="noopener noreferrer" className="link">
            Planilha
            </a>
            ): 
        </label>
        <input
          type="number" // Mantém o tipo como number para limitar a entrada
          placeholder="Classificação"
          value={classificacao}
          onChange={(e) => {
            const value = e.target.value;
            // Permite apenas números inteiros maiores que 0 e menores que 645
            if (/^\d+$/.test(value) && value > 0 && value < 645) {
              setClassificacao(value);
            }
          }}
          className="input"
        />


        <label htmlFor="primeiraOpcao" className="label">1ª Opção: </label>
        <select
          id="primeiraOpcao"
          value={primeiraOpcao}
          onChange={(e) => setPrimeiraOpcao(e.target.value)}
          className="select"
        >
          <option value="">Selecione uma cidade</option>
          {cidades.map((cidade, index) => (
            <option key={index} value={cidade}>
              {cidade}
            </option>
          ))}
        </select>

        <label htmlFor="segundaOpcao" className="label">2ª Opção: </label>
        <select
          id="segundaOpcao"
          value={segundaOpcao}
          onChange={(e) => setSegundaOpcao(e.target.value)}
          className="select"
        >
          <option value="">Selecione uma cidade</option>
          {cidades
            .filter((cidade) => cidade !== primeiraOpcao)
            .map((cidade, index) => (
              <option key={index} value={cidade}>
                {cidade}
              </option>
            ))}
        </select>

        <button type="submit" className="button" disabled={loadingauth}>
          {loadingauth ? 'Carregando..' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
