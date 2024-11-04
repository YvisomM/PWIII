// pages/index.js

import { useEffect, useState } from 'react';

export default function Home() {
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api');
      const data = await response.json();
      setNomes(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Nomes</h1>
      <ul>
        {nomes.map(nome => (
          <li key={nome.id}>{nome.nome} {nome.sobrenome}</li>
        ))}
      </ul>
    </div>
  );
}
