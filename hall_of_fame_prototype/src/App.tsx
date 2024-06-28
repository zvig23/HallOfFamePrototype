import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { HallOfFameMembers } from "./components/HallOfFameMembers";
import { LandingPage } from "./components/LandingPage";
import { MemesGallery } from "./components/MemesGallery";
import { MemoriessGallery } from "./components/MemoriessGallery";
import { NavBar } from "./components/NavBar";
import { QuotesWall } from "./components/QuotesWall";
import { firebaseConfig } from './config/firebase';

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);


const App = () => {
  return (
    <BrowserRouter>
     <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="blogs" element={<MemesGallery />} />
          <Route path="contact" element={<MemoriessGallery />} />
          <Route path="HallOfFameMembers" element={<HallOfFameMembers />} />
          <Route path="QuotesWall" element={<QuotesWall />} />
          <Route path="*" element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>)
}

export default App
