import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import CalendarPage from "./pages/CalendarPage";
import HomePage from "./pages/HomePage";
import LocalBoard from "./pages/LocalBoard";
import TravelForm from "./pages/TravelForm";
import SignUpForm from "./pages/SignUpForm";

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
        <Route path="/SignUpForm" element={<SignUpForm />}></Route>
        {/* <Route path="/localboard" element={<TravelForm />}></Route> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
