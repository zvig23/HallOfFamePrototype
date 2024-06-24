import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import './App.css'
import { firebaseConfig } from './config/firebase';
import { getStorage } from "firebase/storage";
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { MemesGallery } from "./components/MemesGallery";
import { MemoriessGallery } from "./components/MemoriessGallery";
import { HallOfFameMembers } from "./components/HallOfFameMembers";
import { QuotesWall } from "./components/QuotesWall";
import { NavBar } from "./components/NavBar";

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
