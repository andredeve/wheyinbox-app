import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs } from "firebase/firestore";
import './ranking.css';

export default function RankingCidades() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    async function fetchCityRanking() {
      const citiesCount = {};
      const querySnapshot = await getDocs(collection(db, "users"));

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const primeiraOpcao = data.cidadeprimeira;
        const segundaOpcao = data.cidadesegunda;

        // Contando as escolhas das cidades
        if (primeiraOpcao) {
          citiesCount[primeiraOpcao] = (citiesCount[primeiraOpcao] || 0) + 1;
        }
        if (segundaOpcao) {
          citiesCount[segundaOpcao] = (citiesCount[segundaOpcao] || 0) + 1;
        }
      });

      // Convertendo o objeto em array de cidades com contagem e ordenando
      const sortedCities = Object.keys(citiesCount)
        .map((city) => ({
          name: city,
          count: citiesCount[city],
        }))
        .sort((a, b) => b.count - a.count);

      setRanking(sortedCities);
    }

    fetchCityRanking();
  }, []);

  return (
    <div className="ranking-container">
      <h3 className="ranking-title">Ranking de Escolhas das Cidades</h3>
      <ul className="ranking-list">
        {ranking.map((city, index) => (
          <li key={index} className="ranking-item">
            <span className="ranking-position">{index + 1}º</span>
            <span className="city-name">{city.name}</span>
            <span className="city-count">{city.count} {city.count === 1 ? 'escolha' : 'escolhas'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
