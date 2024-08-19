import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs } from "firebase/firestore";
import './rankingClassificacaoOrdenado.css';

export default function Ranking({ fetchCityRanking }) {
  const [firstOptionRankings, setFirstOptionRankings] = useState({});
  const [secondOptionRankings, setSecondOptionRankings] = useState({});

  // Função para buscar e agrupar o ranking dos candidatos por cidade (primeira e segunda opção)
  async function fetchRanking() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const candidatesByFirstCity = {};
    const candidatesBySecondCity = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const primeiraOpcao = data.cidadeprimeira;
      const segundaOpcao = data.cidadesegunda;
      const nome = data.nome;
      const classificacao = data.classificacao; // Supondo que há uma propriedade de classificação no banco de dados

      if (primeiraOpcao) {
        if (!candidatesByFirstCity[primeiraOpcao]) {
          candidatesByFirstCity[primeiraOpcao] = [];
        }
        candidatesByFirstCity[primeiraOpcao].push({ name: nome, classificacao });
      }

      if (segundaOpcao) {
        if (!candidatesBySecondCity[segundaOpcao]) {
          candidatesBySecondCity[segundaOpcao] = [];
        }
        candidatesBySecondCity[segundaOpcao].push({ name: nome, classificacao });
      }
    });

    // Ordena os candidatos dentro de cada cidade
    const sortedFirstOptionRankings = {};
    for (const city in candidatesByFirstCity) {
      sortedFirstOptionRankings[city] = candidatesByFirstCity[city].sort((a, b) => a.classificacao - b.classificacao);
    }

    const sortedSecondOptionRankings = {};
    for (const city in candidatesBySecondCity) {
      sortedSecondOptionRankings[city] = candidatesBySecondCity[city].sort((a, b) => a.classificacao - b.classificacao);
    }

    setFirstOptionRankings(sortedFirstOptionRankings);
    setSecondOptionRankings(sortedSecondOptionRankings);
  }

  useEffect(() => {
    fetchRanking();
  }, [fetchCityRanking]);

  return (
    <div className="ranking-container">
  <h1 className="ranking-title">Ranking dos Candidatos por Cidade</h1>
  <div><h5 className="ranking-title">Dourados: 120 - Três Lagoas: 120 - Aquidauana: 50 - Nova Andradina: 50 - Coxim: 55 - Jardim: 55</h5></div>
      
  <div className="ranking-content">
    {/* Seção para a primeira opção */}
    <div className="ranking-column">
      <h4 className="ranking-subtitle">1ª Opção</h4>
      {Object.keys(firstOptionRankings).map((city, index) => (
        <div key={index} className="ranking-city">
          <h5 className="city-name">{city}</h5>
          <ul className="ranking-list">
            {firstOptionRankings[city].map((candidate, idx) => (
              <li key={idx} className="ranking-item">
                <span className="ranking-position">{idx + 1}º</span>
                <span className="candidate-name">{candidate.name}</span>
                <span className="candidate-classificacao">
                  Classificação: {candidate.classificacao}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Seção para a segunda opção */}
    <div className="ranking-column">
      <h4 className="ranking-subtitle">2ª Opção</h4>
      {Object.keys(secondOptionRankings).map((city, index) => (
        <div key={index} className="ranking-city">
          <h5 className="city-name">{city}</h5>
          <ul className="ranking-list">
            {secondOptionRankings[city].map((candidate, idx) => (
              <li key={idx} className="ranking-item">
                <span className="ranking-position">{idx + 1}º</span>
                <span className="candidate-name">{candidate.name}</span>
                <span className="candidate-classificacao">
                  Classificação: {candidate.classificacao}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}
