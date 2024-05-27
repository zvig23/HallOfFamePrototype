import { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const firebaseConfig = {
  apiKey: "AIzaSyC8iKq3Bsid_xnIqeGUp8K_sr_hV9Da-bU",
  authDomain: "halloffameprototype.firebaseapp.com",
  projectId: "halloffameprototype",
  storageBucket: "halloffameprototype.appspot.com",
  messagingSenderId: "190473257813",
  appId: "1:190473257813:web:515268cf8cade91d8fe5dc",
  measurementId: "G-HK9YNM4EZ3"
}
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


function App() {
  const [count, setCount] = useState(0)
  getDocs(collection(db, "memes")).then((querySnapshot)=>{
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  })
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
