import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';

// Firebase app config
const firebaseConfig = {
    apiKey: "AIzaSyBL80-q6IR02x6CX0svaD3aibrepOdfPtw",
    authDomain: "meuprimeirofirebase-a2115.firebaseapp.com",
    projectId: "meuprimeirofirebase-a2115",
    storageBucket: "meuprimeirofirebase-a2115.firebasestorage.app",
    messagingSenderId: "530734620375",
    appId: "1:530734620375:web:c7f9db6a7f5482e13b5a92"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const dynamic = 'force-dynamic';

export async function GET() {
    const querySnapshot = await getDocs(collection(db, 'Nomes'));
    const data = querySnapshot
        .docs
        .map(item => ({
            id: item.id,
            nome: item
                .data()
                .nome,
            sobrenome: item
                .data()
                .sobrenome
        }));
    return Response.json(data);
}