import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './layout/footer/Footer';
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
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
