import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProfileCard from "./Includes/personalPage/ProfileCard";
import Footer from "./layout/footer/Footer";
import TravelHeader from "./layout/header/TravelHeader";
import CalendarPage from "./pages/CalendarPage";
import EditProfilePage from "./pages/EditProfilePage";
import FestivalPage from "./pages/FestivalPage";
import FollowerPage from "./pages/FollowPages/FollowerPage";
import FollowingPage from "./pages/FollowPages/FollowingPage";
import HomePage from "./pages/HomePage";
import LocalBoard from "./pages/LocalBoard";
import LoginFormPage from "./pages/LoginFormPage";
import MapSharePage from "./pages/MapSharePage";
import PasswordResetPage from "./pages/PasswordResetPage";
import AchievementPage from "./pages/Personal/AchievementPage";
import MapPage from "./pages/Personal/MapPage";
import PersonalPage from "./pages/Personal/PersonalPage";
import TravelogPage from "./pages/Personal/TravelogPage";
import PostPage from "./pages/PostPage";
import RankingPage from "./pages/RankingPage";
import ShopHistory from './pages/ShopPage/ShopHistory';
import ShopPage from "./pages/ShopPage/ShopPage";
import ShopPurchase from "./pages/ShopPage/ShopPurchase";
import SignUpFormPage from "./pages/SignUpFormPage";
import TravelWritePage from "./pages/TravelWritePage";
import { AuthProvider } from "./context/AuthContext";

// function Header({board, local}) {
//   console.log(board+"/"+local);
//   return <TravelHeader board={board} local={local}/>;
// }

function App() {
  const [selectedBadge, setSelectedBadge] = useState('여행 초보자');
  const [board, setBoard] = useState(null);
  const [local, setLocal] = useState(null);
  const [travelogUserId, setTravelogUserId] = useState(null);

  return (
    <AuthProvider>
    <BrowserRouter>
      <TravelHeader board={board} local={local} userId={travelogUserId}/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/board/:board/:local"  element={<LocalBoard 
                                            selectedBadge={selectedBadge}
                                            onParamsChange={(boardParam, localParam, travelogUserIdParam) => {
                                            setBoard(boardParam);
                                            setLocal(localParam);
                                            setTravelogUserId(travelogUserIdParam);
                                           }}/>}/>
        <Route path="/SignUpFormPage" element={<SignUpFormPage />} />
        <Route path="/PasswordResetPage" element={<PasswordResetPage />} />
        <Route path="/LoginFormPage" element={<LoginFormPage />} />
        <Route path="/TravelWritePage" element={<TravelWritePage />} />
        <Route path="/TravelEditPage" element={<TravelWritePage />} />
        <Route path="/ranking" element={<RankingPage />} /> 
        <Route path="/postpage/:postId" element={<PostPage />} />
        <Route path="/festival" element={<FestivalPage/>}/>
        <Route path="/mapShare" element={<MapSharePage/>}/>
        {/*쇼핑관련*/}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/purchase" element={<ShopPurchase />} />
        <Route path="/shop/history" element={<ShopHistory />} />
        {/*개인페이지관련*/}
        <Route path="/personal" element={<PersonalPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/:urlUserId" element={<PersonalPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/EditProfilePage" element={<EditProfilePage selectedBadge={selectedBadge} />} />
        <Route path="/profile" element={<ProfileCard selectedBadge={selectedBadge} />} />
        <Route path="/personal/AchievementPage" element={<AchievementPage selectedBadge={selectedBadge} onBadgeSelect={setSelectedBadge} />} />
        <Route path="/personal/map" element={<MapPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/map/:urlUserId" element={<MapPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/follower" element={<FollowerPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/following" element={<FollowingPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/follower/:urlUserId" element={<FollowerPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/following/:urlUserId" element={<FollowingPage selectedBadge={selectedBadge} />} />
        <Route path="/personal/travelog" element={<TravelogPage selectedBadge={selectedBadge}/>} />
        {/* 랭킹페이지 관련 */}
        <Route path="/ranking/popular" element={<RankingPage initialRank="인기 게시글 랭킹" />} />
        <Route path="/ranking/user-activity" element={<RankingPage initialRank="유저 활동 랭킹" />} />
        <Route path="/ranking/hall-of-fame" element={<RankingPage initialRank="명예의 전당" />} />

        {/* <Route path="/board/bookmark/:local" element={<LocalBoard />}/> */}
      </Routes>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
