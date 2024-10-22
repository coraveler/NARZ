import { BrowserRouter as BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import CalendarPage from "./pages/CalendarPage";
import EditProfilePage from "./pages/EditProfilePage";
import HomePage from "./pages/HomePage";
import LocalBoard from "./pages/LocalBoard";
import LoginFormPage from "./pages/LoginFormPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PersonalPage from "./pages/PersonalPage";
import PostPage from "./pages/PostPage";
import RankingPage from "./pages/RankingPage";
import ShopHistory from './pages/ShopPage/ShopHistory';
import ShopPage from "./pages/ShopPage/ShopPage";
import ShopPurchase from "./pages/ShopPage/ShopPurchase";
import SignUpFormPage from "./pages/SignUpFormPage";
import TravelWritePage from "./pages/TravelWritePage";
import AchievementPage from "./pages/AchievementPage";
import React, { useState } from "react";
import ProfileCard from "./Includes/personalPage/ProfileCard";

function Header() {
  return <TravelHeader />;
}

function App() {
  const [selectedBadge, setSelectedBadge] = useState('기본 칭호');
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/localboard" element={<LocalBoard />} />
        <Route path="/SignUpFormPage" element={<SignUpFormPage />} />
        <Route path="/PasswordResetPage" element={<PasswordResetPage />} />
        <Route path="/personal" element={<PersonalPage />} />
        <Route path="/EditProfilePage" element={<EditProfilePage />} />
        <Route path="/LoginFormPage" element={<LoginFormPage />} />
        <Route path="/TravelWritePage" element={<TravelWritePage />} />
        <Route path="/ranking" element={<RankingPage />} /> 
        <Route path="/postpage/:postId" element={<PostPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/purchase" element={<ShopPurchase />} />
        <Route path="/profile" element={<ProfileCard selectedBadge={selectedBadge} />} />
        <Route path="/AchievementPage" element={<AchievementPage selectedBadge={selectedBadge} onBadgeSelect={setSelectedBadge} />} />
        
        <Route path="/history" element={<ShopHistory />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
