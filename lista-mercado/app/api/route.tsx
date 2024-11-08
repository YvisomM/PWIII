

import { db } from '../firebaseConfig'; 
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';


export const carregarItens = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "items"));
    const itensCarregados = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return itensCarregados;
  } catch (error) {
    console.error('Erro ao carregar os itens:', error);
    throw error;
  }
};


export const adicionarItem = async (nome: string) => {
  try {
    await addDoc(collection(db, 'items'), { name: nome });
  } catch (error) {
    console.error('Erro ao adicionar o item:', error);
    throw error;
  }
};


export const atualizarItem = async (id: string, nome: string) => {
  try {
    const itemRef = doc(db, 'items', id);
    await updateDoc(itemRef, { name: nome });
  } catch (error) {
    console.error('Erro ao atualizar o item:', error);
    throw error;
  }
};


export const deletarItem = async (id: string) => {
  try {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
  } catch (error) {
    console.error('Erro ao deletar o item:', error);
    throw error;
  }
};
