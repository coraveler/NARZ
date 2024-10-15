import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import CalendarPage from "./pages/CalendarPage";
import HomePage from "./pages/HomePage";
import LocalBoard from "./pages/LocalBoard";
import SignUpFormPage from "./pages/SignUpFormPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PersonalPage from "./pages/PersonalPage";
import EditProfilePage from "./pages/EditProfilePage";
import LoginFormPage from "./pages/LoginFormPage";



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
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/LoginFormPage" element={<LoginFormPage />} />

        {/* <Route path="/localboard" element={<TravelForm />}></Route> */}

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
 