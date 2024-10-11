import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import TravelHeader from './layout/header/TravelHeader';

function Header() {
  return (
    <TravelHeader/>
  );
}

function App() {
  return (
    <BrowserRouter>
     <Header/>
    </BrowserRouter>
  );
}

export default App;
