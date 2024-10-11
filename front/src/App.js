import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import HomePage from "./pages/HomePage";
import LocalBoard from "./pages/LocalBoard";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileIcon from './layout/header/ProfileIcon';  

function Header() {
  return <TravelHeader />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/localboard" element={<LocalBoard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
 