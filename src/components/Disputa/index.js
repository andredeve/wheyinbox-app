import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs } from "firebase/firestore";
import './disputa.css';

export default function Ranking({ fetchCityRanking }) {
  const [rankings, setRankings] = useState({});
  const [selectedCity, setSelectedCity] = useState(""); // Estado para a cidade selecionada

  const cityVagas = {
    "Dourados": 120,
    "Três Lagoas": 120,
    "Aquidauana": 50,
    "Nova Andradina": 50,
    "Coxim": 55,
    "Jardim": 55,
    "Ponta Porã": 50 // Adicionando a cidade de Ponta Porã
  };

  async function fetchRanking() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const candidatesByCity = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const primeiraOpcao = data.cidadeprimeira;
      const segundaOpcao = data.cidadesegunda;
      const nome = data.nome;
      const classificacao = data.classificacao;

      if (primeiraOpcao) {
        if (!candidatesByCity[primeiraOpcao]) {
          candidatesByCity[primeiraOpcao] = [];
        }
        candidatesByCity[primeiraOpcao].push({
          name: nome,
          classificacao,
          source: 'primeiraOpcao',
          segundaOpcao,
          primeiraOpcao
        });
      }

      if (segundaOpcao) {
        if (!candidatesByCity[segundaOpcao]) {
          candidatesByCity[segundaOpcao] = [];
        }
        candidatesByCity[segundaOpcao].push({
          name: nome,
          classificacao,
          source: 'segundaOpcao',
          primeiraOpcao,
          segundaOpcao
        });
      }
    });

    setRankings(candidatesByCity);
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
    const noVagasList = {};

    cities.forEach((city) => {
      const allCandidates = rankings[city] || [];

      // Separar candidatos por primeira e segunda opção
      const firstOptionCandidates = allCandidates.filter(c => c.source === 'primeiraOpcao');
      const secondOptionCandidates = allCandidates.filter(c => c.source === 'segundaOpcao');

      // Ordenar candidatos por classificação para a primeira opção
      const sortedFirstOptionCandidates = firstOptionCandidates.sort((a, b) => a.classificacao - b.classificacao);

      // Identificar candidatos que conseguiram vaga na primeira opção
      const successfulFirstOptionCandidates = sortedFirstOptionCandidates
        .map((candidate, index) => ({
          ...candidate,
          finalPosition: index + 1,
          vagasDisponiveis: cityVagas[city],
          status: verificarVagaPorPosicao(index + 1, cityVagas[city]) ? 'Conseguiu a vaga' : 'Não conseguiu a vaga',
          noFirstOption: verificarVagaPorPosicao(index + 1, cityVagas[city]) ? 'Não' : 'Sim'
        }));

      // Candidatos que não conseguiram vaga na primeira opção
      const noFirstOptionCandidates = successfulFirstOptionCandidates
        .filter(candidate => candidate.noFirstOption === 'Sim');

      // Combinar candidatos que não conseguiram na primeira opção com os candidatos da segunda opção
      const combinedCandidates = [
        ...secondOptionCandidates,
        ...noFirstOptionCandidates
      ];

      // Ordenar candidatos combinados por classificação
      const sortedCombinedCandidates = combinedCandidates.sort((a, b) => a.classificacao - b.classificacao);

      // Identificar candidatos que conseguiram vaga na segunda opção
      const successfulCombinedCandidates = sortedCombinedCandidates
        .map((candidate, index) => ({
          ...candidate,
          finalPosition: index + 1,
          vagasDisponiveis: cityVagas[city],
          status: verificarVagaPorPosicao(index + 1, cityVagas[city]) ? 'Conseguiu a vaga' : 'Não conseguiu a vaga',
          noFirstOption: candidate.source === 'primeiraOpcao' ? 'Sim' : candidate.noFirstOption
        }));

      // Garantir que candidatos que conseguiram vaga em uma opção não sejam listados na outra
      const uniqueCandidates = successfulFirstOptionCandidates
        .filter(candidate => candidate.status === 'Conseguiu a vaga')
        .sort((a, b) => a.classificacao - b.classificacao);

      // Candidatos que não conseguiram vaga em nenhuma opção
      const noVagasCandidates = sortedCombinedCandidates
        .filter(candidate => !successfulFirstOptionCandidates.some(c => c.name === candidate.name))
        .map((candidate, index) => ({
          ...candidate,
          finalPosition: index + 1,
          vagasDisponiveis: cityVagas[city],
          status: 'Não conseguiu a vaga',
          noFirstOption: 'Sim'
        }));

      finalRankings[city] = uniqueCandidates;
      noVagasList[city] = noVagasCandidates
        .filter((candidate, index, self) =>
          index === self.findIndex((t) => (
            t.name === candidate.name
          )))
        .sort((a, b) => a.classificacao - b.classificacao);
    });

    return { finalRankings, noVagasList };
  };

  const { finalRankings, noVagasList } = getFinalRanking();

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

      <div className="city-select-container">
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
        <div className="ranking-list">
          {Object.keys(finalRankings).map((city, index) => (
            <div key={index} className="ranking-column">
              <h4 className="ranking-subtitle">{city}</h4>
              <ul className="ranking-list">
                {finalRankings[city].map((candidate, idx) => (
                  <li key={idx} className="ranking-item">
                    <div className="candidate-box">
                      <div className="candidate-header">
                        <span className="ranking-position">{idx + 1}º</span>
                        <span className="candidate-name">{candidate.name}</span>
                      </div>
                      <div className="candidate-details">
                        <p><strong>Classificação:</strong> {candidate.classificacao}</p>
                        <p><strong>Status:</strong> {candidate.status}</p>
                        <p><strong>Fonte:</strong> {candidate.source === 'primeiraOpcao' ? 'Primeira Opção' : 'Segunda Opção'}</p>
                        <p><strong>Primeira Opção:</strong> {candidate.primeiraOpcao || 'Não aplicável'}</p>
                        <p><strong>Segunda Opção:</strong> {candidate.segundaOpcao || 'Não aplicável'}</p>
                        {candidate.noFirstOption === 'Sim' && (
                          <p><strong>Observação:</strong> Não conseguiu na primeira opção</p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="no-vagas-column">
          <h4 className="ranking-subtitle">Candidatos Sem Vaga</h4>
          {Object.keys(noVagasList).map((city, index) => (
            <div key={index} className="no-vagas-section">
              <h5>{city}</h5>
              <ul className="ranking-list no-vagas-list">
                {noVagasList[city].map((candidate, idx) => (
                  <li key={idx} className="ranking-item">
                    <div className="candidate-box">
                      <div className="candidate-header">
                        <span className="ranking-position">{idx + 1}º</span>
                        <span className="candidate-name">{candidate.name}</span>
                      </div>
                      <div className="candidate-details">
                        <p><strong>Classificação:</strong> {candidate.classificacao}</p>
                        <p><strong>Status:</strong> {candidate.status}</p>
                        <p><strong>Primeira Opção:</strong> {candidate.primeiraOpcao || 'Não aplicável'}</p>
                        <p><strong>Segunda Opção:</strong> {candidate.segundaOpcao || 'Não aplicável'}</p>
                      </div>
                    </div>
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
