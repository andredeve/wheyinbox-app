import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs } from "firebase/firestore";
import './disputa.css';

export default function Ranking({ fetchCityRanking }) {
  const [firstOptionRankings, setFirstOptionRankings] = useState({});
  const [secondOptionRankings, setSecondOptionRankings] = useState({});
  const [selectedCity, setSelectedCity] = useState(""); // Estado para a cidade selecionada
  
  const cityVagas = {
    "Dourados": 120,
    "Três Lagoas": 120,
    "Aquidauana": 50,
    "Nova Andradina": 50,
    "Coxim": 55,
    "Jardim": 55,
  };

  async function fetchRanking() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const candidatesByFirstCity = {};
    const candidatesBySecondCity = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const primeiraOpcao = data.cidadeprimeira;
      const segundaOpcao = data.cidadesegunda;
      const nome = data.nome;
      const classificacao = data.classificacao;

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

  const verificarVaga = (classificacao, vagasDisponiveis) => {
    return classificacao <= vagasDisponiveis;
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Ranking dos Candidatos por Cidade</h1>
      
      <div>
        <h5 className="ranking-title">
          Dourados: 120 - Três Lagoas: 120 - Aquidauana: 50 - Nova Andradina: 50 - Coxim: 55 - Jardim: 55
        </h5>
      </div>
      
      {/* Select para filtrar por cidade */}
      <div className="city-filter">
        <label htmlFor="citySelect">Selecione a cidade: </label>
        <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
          <option value="">Todas</option>
          {Object.keys(cityVagas).map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div className="ranking-content">
        {/* Seção para a primeira opção */}
        <div className="ranking-column">
          <h4 className="ranking-subtitle">1ª Opção</h4>
          {Object.keys(firstOptionRankings)
            .filter((city) => !selectedCity || city === selectedCity)
            .map((city, index) => (
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
                      <span className={`vaga-status ${verificarVaga(candidate.classificacao, cityVagas[city]) ? 'success' : 'fail'}`}>
                        {verificarVaga(candidate.classificacao, cityVagas[city]) ? 'Conseguiu a vaga' : 'Não conseguiu a vaga'}
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
          {Object.keys(secondOptionRankings)
            .filter((city) => !selectedCity || city === selectedCity)
            .map((city, index) => (
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
                      <span className={`vaga-status ${verificarVaga(candidate.classificacao, cityVagas[city]) ? 'success' : 'fail'}`}>
                        {verificarVaga(candidate.classificacao, cityVagas[city]) ? 'Conseguiu a vaga' : 'Não conseguiu a vaga'}
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
