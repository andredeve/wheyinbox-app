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
      const classificacao = data.classificacao; // Supondo que há uma propriedade de classificação no banco de dados

      if (primeiraOpcao) {
        if (!candidatesByFirstCity[primeiraOpcao]) {
          candidatesByFirstCity[primeiraOpcao] = [];
        }
        candidatesByFirstCity[primeiraOpcao].push({
          name: nome,
          classificacao,
          source: 'primeiraOpcao',
          position: candidatesByFirstCity[primeiraOpcao].length + 1,
        });
      }

      if (segundaOpcao) {
        if (!candidatesBySecondCity[segundaOpcao]) {
          candidatesBySecondCity[segundaOpcao] = [];
        }
        candidatesBySecondCity[segundaOpcao].push({
          name: nome,
          classificacao,
          source: 'segundaOpcao',
          position: candidatesBySecondCity[segundaOpcao].length + 1,
        });
      }
    });

    setFirstOptionRankings(candidatesByFirstCity);
    setSecondOptionRankings(candidatesBySecondCity);
  }

  useEffect(() => {
    fetchRanking();
  }, [fetchCityRanking]);

  const verificarVagaPorPosicao = (posicao, vagasDisponiveis) => {
    return posicao <= vagasDisponiveis;
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const getFinalRanking = () => {
    const cities = selectedCity ? [selectedCity] : Object.keys(cityVagas);
    const finalRankings = {};

    cities.forEach((city) => {
      const firstOptionCandidates = firstOptionRankings[city] || [];
      const secondOptionCandidates = secondOptionRankings[city] || [];

      // Ordenar candidatos por classificação para a primeira opção e segunda opção
      const sortedFirstOptionCandidates = firstOptionCandidates.sort((a, b) => a.classificacao - b.classificacao);
      const sortedSecondOptionCandidates = secondOptionCandidates.sort((a, b) => a.classificacao - b.classificacao);

      const combinedCandidates = sortedFirstOptionCandidates
        .map((candidate, index) => ({
          ...candidate,
          finalPosition: index + 1,
          vagasDisponiveis: cityVagas[city],
          status: verificarVagaPorPosicao(index + 1, cityVagas[city]) ? 'Conseguiu a vaga' : 'Não conseguiu a vaga',
          alsoGotIn: secondOptionCandidates.some(c => c.name === candidate.name) ? 'Sim, na segunda opção' : 'Não',
        }))
        .concat(
          sortedSecondOptionCandidates
            .filter(candidate => !sortedFirstOptionCandidates.some(c => c.name === candidate.name))
            .map((candidate, index) => ({
              ...candidate,
              finalPosition: index + 1,
              vagasDisponiveis: cityVagas[city],
              status: verificarVagaPorPosicao(index + 1, cityVagas[city]) ? 'Conseguiu a vaga' : 'Não conseguiu a vaga',
              alsoGotIn: 'Não aplicável',
            }))
        );

      finalRankings[city] = combinedCandidates;
    });

    return finalRankings;
  };

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Ranking dos Candidatos por Cidade</h1>
      
      <div className="city-list">
        <ul>
          {Object.entries(cityVagas).map(([city, vagas]) => (
            <li key={city}>{city}: {vagas}</li>
          ))}
        </ul>
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
        {Object.keys(getFinalRanking()).map((city, index) => (
          <div key={index} className="ranking-column">
            <h4 className="ranking-subtitle">{city}</h4>
            <ul className="ranking-list">
              {getFinalRanking()[city].map((candidate, idx) => (
                <li key={idx} className="ranking-item">
                  <span className="ranking-position">{idx + 1}º</span>
                  <span className="candidate-name">{candidate.name}</span>
                  <span className="candidate-classificacao">
                    Classificação: {candidate.classificacao}
                  </span>
                  <span className={`vaga-status ${candidate.status === 'Conseguiu a vaga' ? 'success' : 'fail'}`}>
                    {candidate.status}
                  </span>
                  <span className={`candidate-source ${candidate.source}`}>
                    {candidate.source === 'primeiraOpcao' ? 'Primeira Opção' : 'Segunda Opção'}
                  </span>
                  <span className="also-got-in">
                    Também conseguiu na outra opção: {candidate.alsoGotIn}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
