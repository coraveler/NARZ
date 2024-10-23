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
import MapPage from "./pages/MapPage";
import FollowingPage from "./pages/FollowPages/FollowingPage";
import FollowerPage from "./pages/FollowPages/FollowerPage";

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
        <Route path="/localboard/:local" element={<LocalBoard />} />
        <Route path="/SignUpFormPage" element={<SignUpFormPage />} />
        <Route path="/PasswordResetPage" element={<PasswordResetPage />} />
        <Route path="/LoginFormPage" element={<LoginFormPage />} />
        <Route path="/TravelWritePage" element={<TravelWritePage />} />
        <Route path="/ranking" element={<RankingPage />} /> 
        <Route path="/postpage/:postId" element={<PostPage />} />
        {/*쇼핑관련*/}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/purchase" element={<ShopPurchase />} />
        <Route path="/history" element={<ShopHistory />} />
        {/*개인페이지관련*/}
        <Route path="/personal" element={<PersonalPage selectedBadge={selectedBadge} />} />
        <Route path="/EditProfilePage" element={<EditProfilePage selectedBadge={selectedBadge} />} />
        <Route path="/profile" element={<ProfileCard selectedBadge={selectedBadge} />} />
        <Route path="/AchievementPage" element={<AchievementPage selectedBadge={selectedBadge} onBadgeSelect={setSelectedBadge} />} />
        <Route path="/map" element={<MapPage selectedBadge={selectedBadge} />} />
        <Route path="/follower" element={<FollowerPage selectedBadge={selectedBadge} />} />
        <Route path="/following" element={<FollowingPage selectedBadge={selectedBadge} />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
