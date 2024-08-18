import React, { useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import { collection, getDocs } from "firebase/firestore";
import './candidatosCount.css'; // Inclua o CSS se necessário

const UserCount = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        // Substitua "users" pelo nome da coleção onde os usuários são armazenados
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const totalUsers = userSnapshot.size; // Obtém o número total de documentos
        setUserCount(totalUsers);
      } catch (error) {
        console.error("Erro ao obter o total de usuários:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="user-count">
      <h2>{userCount}</h2>
    </div>
  );
};

export default UserCount;
