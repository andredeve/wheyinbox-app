import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import './rankingclassificacaopage.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import RankingPorClassificacao from "../../components/RankingClassificacao";

import { db } from '../../services/firebaseConection';
import { doc, updateDoc } from 'firebase/firestore';

export default function RankingClassificacaoPage() {

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
      <RankingPorClassificacao/>
    </div>
  );
}
