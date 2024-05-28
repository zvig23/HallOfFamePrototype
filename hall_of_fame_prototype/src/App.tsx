import { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { firebaseConfig } from './config/firebase';
import { getStorage } from "firebase/storage";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);


function App() {
  const [count, setCount] = useState(0)
  const imagesListRef = ref(storage, "memes/");
  const [imageUrls, setImageUrls] = useState<Array<string>>([]);

  getDocs(collection(db, "memes")).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
    });
  })

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(imageUrls);
          
          setImageUrls([...imageUrls, url]);
        });
      });
    });
  }, []);
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
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}

    </>
  )
}

export default App
