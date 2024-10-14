import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import CalendarPage from "./pages/CalendarPage";
import HomePage from "./pages/HomePage";
import LocalBoard from "./pages/LocalBoard";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfileIcon from './layout/header/ProfileIcon';  
import TravelForm from "./pages/TravelForm";
import SignUpFormPage from "./pages/SignUpFormPage";
import PasswordResetPage from "./pages/PasswordResetPage";



function Header() {
  return <TravelHeader />;
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/calendar" element={<CalendarPage />}></Route>
        <Route path="/localboard" element={<LocalBoard />}></Route>
        <Route path="/SignUpFormPage" element={<SignUpFormPage />}></Route>
        <Route path="/PasswordResetPage" element={<PasswordResetPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />} />
    

        {/* <Route path="/localboard" element={<TravelForm />}></Route> */}

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
 