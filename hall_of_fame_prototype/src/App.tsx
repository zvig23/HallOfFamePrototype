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
import HomeIcon from '@mui/icons-material/Home';
import ClosedCaptionOffIcon from '@mui/icons-material/ClosedCaptionOff';
import CollectionsIcon from '@mui/icons-material/Collections';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import { Page, createPage } from "./modules/Page";

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);




const App = () => {
  const pages: Array<Page> = [
    createPage("Home", "LandingPage", <HomeIcon />),
    createPage("Memes", "MemesGallery", <ClosedCaptionOffIcon />),
    createPage("memories", "MemoriessGallery", <CollectionsIcon />),
    createPage("Quotes", "QuotesWall", <FormatQuoteIcon />),
    createPage("Members", "HallOfFameMembers", <Diversity2Icon />)]
  
  
  return (
    <BrowserRouter>
      <NavBar pages={pages}/>
      <Routes>
          <Route path="Memes" element={<MemesGallery />} />
          <Route path="memories" element={<MemoriessGallery />} />
          <Route path="HallOfFameMembers" element={<HallOfFameMembers />} />
          <Route path="QuotesWall" element={<QuotesWall />} />
          <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>)
}

export default App
