import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Footer from './layout/footer/Footer';
import TravelHeader from './layout/header/TravelHeader';
import TravelForm from './layout/TravelForm/TravelForm';

function Header() {
  return <TravelHeader />;
}

function App() {
  return (
    <BrowserRouter>
     <Header/>
     <TravelForm/>
     <Footer/>
    </BrowserRouter>
  );
}

export default App;
