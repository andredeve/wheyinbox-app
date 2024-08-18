import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Ranking from "../../components/Ranking";
import './home.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    if (nome !== '' && classificacao !== '' && primeiraOpcao !== '' && segundaOpcao !== '' && primeiraOpcao !== segundaOpcao && segundaOpcao !== primeiraOpcao ) {

      const docRef = doc(db, "users", user.uid);

      setLoadingAuth(true);
      await updateDoc(docRef, {
        nome: nome,
        classificacao: classificacao,
        cidadeprimeira: primeiraOpcao,
        cidadesegunda: segundaOpcao
      })
      .then(() => {
        let data = {
          ...user,
          nome: nome,
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
    }else{
      toast.error("Preencha todos os campos!", { className: 'toast-error' });
    }
  }

  return (
    <div className="container">
      <Header/>
      <Ranking fetchCityRanking={fetchCityRanking} />
      <h3 className="grid-title">Minhas Informações - {user.nome}</h3>

      <form className="form" onSubmit={handlerSubmit}>
        <label htmlFor="nome" className="label">Nome: </label>
        <input
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="input"
        />

        <label htmlFor="classificacao" className="label">Classificação (De acordo com a   
            <a href="https://docs.google.com/spreadsheets/d/1lvVJMEKE9whOroYyZJvaxIbcD0vpRqQo/edit#gid=1820733924" target="_blank" rel="noopener noreferrer" className="link">
            Planilha
            </a>
            ): 
        </label>
        <input
          type="text"
          placeholder="Classificação"
          value={classificacao}
          onChange={(e) => setClassificacao(e.target.value)}
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
