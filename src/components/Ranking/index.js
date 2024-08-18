import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs } from "firebase/firestore";
import './ranking.css';

export default function Ranking({ fetchCityRanking }) {
  const [firstOptionRanking, setFirstOptionRanking] = useState([]);
  const [secondOptionRanking, setSecondOptionRanking] = useState([]);

  // Função para buscar o ranking das cidades
  async function fetchRanking() {
    const firstOptionCount = {};
    const secondOptionCount = {};
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const primeiraOpcao = data.cidadeprimeira;
      const segundaOpcao = data.cidadesegunda;

      if (primeiraOpcao) {
        firstOptionCount[primeiraOpcao] = (firstOptionCount[primeiraOpcao] || 0) + 1;
      }
      if (segundaOpcao) {
        secondOptionCount[segundaOpcao] = (secondOptionCount[segundaOpcao] || 0) + 1;
      }
    });

    const sortedFirstOptionCities = Object.keys(firstOptionCount)
      .map((city) => ({
        name: city,
        count: firstOptionCount[city],
      }))
      .sort((a, b) => b.count - a.count);

    const sortedSecondOptionCities = Object.keys(secondOptionCount)
      .map((city) => ({
        name: city,
        count: secondOptionCount[city],
      }))
      .sort((a, b) => b.count - a.count);

    setFirstOptionRanking(sortedFirstOptionCities);
    setSecondOptionRanking(sortedSecondOptionCities);
  }

  useEffect(() => {
    fetchRanking();
  }, [fetchCityRanking]);

  return (
    <div className="ranking-container">
      <h1 className="ranking-title">Ranking das Cidades</h1>
      
      <div className="ranking-content">
        <div className="ranking-section">
          <h4 className="ranking-subtitle">1ª Opção</h4>
          <ul className="ranking-list">
            {firstOptionRanking.map((city, index) => (
              <li key={index} className="ranking-item">
                <span className="ranking-position">{index + 1}º</span>
                <span className="city-name">{city.name}</span>
                <span className="city-count">
                  {city.count} {city.count === 1 ? "escolha" : "escolhas"}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ranking-section">
          <h4 className="ranking-subtitle">2ª Opção</h4>
          <ul className="ranking-list">
            {secondOptionRanking.map((city, index) => (
              <li key={index} className="ranking-item">
                <span className="ranking-position">{index + 1}º</span>
                <span className="city-name">{city.name}</span>
                <span className="city-count">
                  {city.count} {city.count === 1 ? "escolha" : "escolhas"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
