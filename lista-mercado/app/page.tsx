"use client";

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';

const App = () => {
  const [itens, setItens] = useState([]);
  const [nome, setNome] = useState(''); 
  const [itemEditando, setItemEditando] = useState<string | null>(null); 

  // Carregar os itens do Firestore
  const carregarItens = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itensCarregados = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Itens carregados:", itensCarregados); 
      setItens(itensCarregados);
    } catch (error) {
      console.error('Erro ao carregar os itens:', error);
    }
  };

  useEffect(() => {
    carregarItens(); 
  }, []);

  const adicionarItem = async () => {
    if (!nome) {
      alert('Erro: Por favor, preencha o campo de nome.');
      return;
    }

    try {
      await addDoc(collection(db, 'items'), {
        name: nome,
      });
      alert('Sucesso: Item adicionado com sucesso!');
      setNome('');
      carregarItens(); 
    } catch (error) {
      console.error(error);
      alert('Erro: Houve um erro ao adicionar o item.');
    }
  };

  const editarItem = (item: any) => {
    setNome(item.name);
    setItemEditando(item.id);
  };

  const atualizarItem = async () => {
    if (!nome) {
      alert('Erro: Por favor, preencha o campo de nome.');
      return;
    }

    try {
      const itemRef = doc(db, 'items', itemEditando as string);
      await updateDoc(itemRef, {
        name: nome,
      });
      alert('Sucesso: Item atualizado com sucesso!');
      setItemEditando(null);
      setNome('');
      carregarItens(); 
    } catch (error) {
      console.error(error);
      alert('Erro: Houve um erro ao atualizar o item.');
    }
  };

  const deletarItem = async (id: string) => {
    try {
      const itemRef = doc(db, 'items', id);
      await deleteDoc(itemRef);
      alert('Sucesso: Item deletado com sucesso!');
      carregarItens(); 
    } catch (error) {
      console.error(error);
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
        <button onClick={atualizarItem} style={{ marginBottom: '20px' }}>Atualizar Item</button>
      ) : (
        <button onClick={adicionarItem} style={{ marginBottom: '20px' }}>Adicionar Item</button>
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
                  <button onClick={() => editarItem(item)} style={{ marginRight: '10px' }}>Editar</button>
                  <button onClick={() => deletarItem(item.id)}>Deletar</button>
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
