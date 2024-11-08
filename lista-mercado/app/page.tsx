"use client";

import React, { useState, useEffect } from 'react';
import { carregarItens, adicionarItem, atualizarItem, deletarItem } from './api/route'; 

const App = () => {
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState('');
  const [itemEditando, setItemEditando] = useState<string | null>(null);

  // Carregar os itens do Firestore
  useEffect(() => {
    const carregarItensDoFirestore = async () => {
      try {
        const itensCarregados = await carregarItens(); 
        setItens(itensCarregados);
      } catch (error) {
        console.error('Erro ao carregar os itens:', error);
      }
    };

    carregarItensDoFirestore();
  }, []);

  const adicionarItemHandler = async () => {
    if (!nome) {
      alert('Erro: Por favor, preencha o campo de nome.');
      return;
    }

    try {
      await adicionarItem(nome);
      alert('Sucesso: Item adicionado com sucesso!');
      setNome('');
      
      const itensCarregados = await carregarItens();
      setItens(itensCarregados);
    } catch (error) {
      alert('Erro: Houve um erro ao adicionar o item.');
    }
  };

  const editarItemHandler = (item: any) => {
    setNome(item.name);
    setItemEditando(item.id);
  };

  const atualizarItemHandler = async () => {
    if (!nome) {
      alert('Erro: Por favor, preencha o campo de nome.');
      return;
    }

    try {
      await atualizarItem(itemEditando as string, nome); 
      alert('Sucesso: Item atualizado com sucesso!');
      setItemEditando(null);
      setNome('');
      
      const itensCarregados = await carregarItens();
      setItens(itensCarregados);
    } catch (error) {
      alert('Erro: Houve um erro ao atualizar o item.');
    }
  };

  const deletarItemHandler = async (id: string) => {
    try {
      await deletarItem(id); 
      alert('Sucesso: Item deletado com sucesso!');
      
      const itensCarregados = await carregarItens();
      setItens(itensCarregados);
    } catch (error) {
      alert('Erro: Houve um erro ao deletar o item.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input
        placeholder="Nome do item"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        style={{ height: '40px', borderColor: 'gray', borderWidth: '1px', marginBottom: '10px', width: '100%' }}
      />
      {itemEditando ? (
        <button onClick={atualizarItemHandler} style={{ marginBottom: '20px' }}>Atualizar Item</button>
      ) : (
        <button onClick={adicionarItemHandler} style={{ marginBottom: '20px' }}>Adicionar Item</button>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Nome do Item</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {itens.length === 0 ? (
            <tr>
              <td colSpan={2} style={{ padding: '10px', textAlign: 'center' }}>Nenhum item encontrado.</td>
            </tr>
          ) : (
            itens.map((item: any) => (
              <tr key={item.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => editarItemHandler(item)} style={{ marginRight: '10px' }}>Editar</button>
                  <button onClick={() => deletarItemHandler(item.id)}>Deletar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
