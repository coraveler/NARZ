<<<<<<< Updated upstream
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './layout/footer/Footer';
import TravelHeader from './layout/header/TravelHeader';
=======
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import Calendar from "./pages/Calendar";
import HomePage from "./pages/HomePage";
>>>>>>> Stashed changes

function Header() {
  return (
    <TravelHeader/>
  );
}

function App() {
  return (
    <BrowserRouter>
<<<<<<< Updated upstream
     <Header/>
     <Footer/>
=======
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/calendar" element={<Calendar/>}/>
      </Routes>
      <Footer />
>>>>>>> Stashed changes
    </BrowserRouter>
  );
}

export default App;
