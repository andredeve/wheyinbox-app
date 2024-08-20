import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs } from "firebase/firestore";
import './candidatosCount.css'; // Inclua o CSS se necessário

const UserCount = () => {
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [lowRankedUserCount, setLowRankedUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        let totalUsers = 0;
        let lowRankedUsers = 0;

        userSnapshot.forEach((doc) => {
          totalUsers += 1;
          const classificacao = doc.data().classificacao;
          if (classificacao < 500) {
            lowRankedUsers += 1;
          }
        });

        setTotalUserCount(totalUsers);
        setLowRankedUserCount(lowRankedUsers);
      } catch (error) {
        console.error("Erro ao obter o total de usuários:", error);
      }
    };

    fetchUserCounts();
  }, []);

  return (
    <div className="user-count">
      <h3>Total de Candidatos: {totalUserCount}</h3>
      <h3>Candidatos com Classificação menor que 500: {lowRankedUserCount}</h3>
    </div>
  );
};

export default UserCount;
