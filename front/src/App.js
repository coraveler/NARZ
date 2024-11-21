import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import ShopHistory from "./pages/ShopPage/ShopHistory";
import ShopPage from "./pages/ShopPage/ShopPage";
import ShopPurchase from "./pages/ShopPage/ShopPurchase";
import SignUpFormPage from "./pages/SignUpFormPage";
import TravelWritePage from "./pages/TravelWritePage";
import ChatWidget from "./layout/nChat/ChatWidget";
import ChatLogin from "./layout/nChat/ChatLogin";
import { getLoginInfo } from "./Includes/common/CommonUtil";
import { AuthProvider } from './context/AuthContext';
import api from "./api/axios";

function Header({board, local}) {
  // console.log(board+"/"+local);
  return <TravelHeader board={board} local={local}/>;
}

function App() {
  const [selectedBadge, setSelectedBadge] = useState("여행 초보자");
  const [board, setBoard] = useState(null);
  const [local, setLocal] = useState(null);
  const [travelogUserId, setTravelogUserId] = useState(null);
  const [chatInstance, setChatInstance] = useState(null);
  let loginInfo = getLoginInfo();
  const loginId = loginInfo?.loginId || null;
  const userNickname = loginInfo?.userNickname || null;
  const [isChatOpen, setIsChatOpen] = useState(false); // 채팅 위젯 상태 추가
  const projectId = "ebd01e35-1e25-4f95-a0c3-3f26ebe44438";
  const apiKey = "050ebb353a64ef3bb8daa191045bcbe02e0c62aeac210c47";
  const [openFromButton, setOpenFromButton] = useState(false);
  // const [chatUserId, setChatUserId] = useState(null);
  const[channel, setChannel] = useState(null);
  const[recipientId, setRecipientId]= useState(null);
  const [channels, setChannels] = useState([]);
  const [isChatLoginSuccessful, setIsChatLoginSuccessful] = useState(false);
  const [chatChange, setChatChange] = useState();  


  const handleChatLoginSuccess = (isSuccessful) => {
    setIsChatLoginSuccessful(isSuccessful);
  };

  const handleChatChange = (state) => {
    setChatChange(state);
  }
  
  useEffect(() => {
    if(loginId){

    
    const initializeChat = async () => {
      if (!chatInstance ) {
        const ncloudchat = window.ncloudchat;
        const newChatInstance = new ncloudchat.Chat();
        await newChatInstance.initialize("ebd01e35-1e25-4f95-a0c3-3f26ebe44438");
        setChatInstance(newChatInstance);
      }
    };
  
    initializeChat();
  }
  }, []);

  useEffect(() => {
    // chatInstance가 존재할 때만 getChannels 호출
    if (chatInstance && isChatLoginSuccessful) {
      getChannels();
      // console.log(channels);
      // const intervalId = setInterval(getChannels, 10000); // 10초마다 새로 고침
      // return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [isChatLoginSuccessful, channel, isChatOpen, openFromButton, chatChange] );

  const toggleChatWindow = (state) => {
    setIsChatOpen(state);
    setOpenFromButton(false);
  };

  // openChatWindow 함수: 항상 채팅 창을 열도록 설정
  const openChatWindow = (recipientId, channel) => {
    // console.log(channel);
    if (recipientId) {
      setRecipientId(recipientId);
      // console.log(recipientId);
      setOpenFromButton(true);
    }else{
      setOpenFromButton(false);
    }
    if(channel){
      // console.log(channel);
      setChannel(channel);
    }else{
      setChannel(null);
    }
    setIsChatOpen(true);
  };

  useEffect(() => {
    // chennal 업데이트가 있을 때 ChatWidget이 렌더링되도록 함
  }, [channel, channels]);


  const getChannels = async () => {
    const filter = { state: true, members: loginId };
    const sort = { created_at: -1 };
    const option = { offset: 0, per_page: 100 };

    try {
      const channels = await chatInstance.getChannels(filter, sort, option);
      // console.log(channels.edges);
    
      // 모든 채널을 순회하면서 멤버를 필터링하고 업데이트
      const updatedChannels = channels.edges.map(channel => {
        const filteredMembers = channel.node.members.filter(member => member !== loginId);
        const membersString = filteredMembers.join(", "); // 배열을 하나의 문자열로 변환
    
        return {
          ...channel.node,  // 기존 채널 정보 그대로 가져오기
          members: membersString, // 필터링된 멤버 문자열로 교체
          unread: 0
        };
      });
    
      // 채널을 last_message.created_at 기준으로 정렬 (내림차순)
      const sortedChannels = updatedChannels.sort((a, b) => {
        const dateA = new Date(a.last_message.created_at); // Date 객체로 변환
        const dateB = new Date(b.last_message.created_at); // Date 객체로 변환
    
        return dateB - dateA; // 내림차순 정렬: 최신 메시지가 위로 오도록
      });
    
      setChannels(sortedChannels);  // 모든 채널 데이터 업데이트
      await getLastChat(sortedChannels);
      // console.log("Updated Channels Data:", sortedChannels); // 결과 출력
    } catch (error) {
      console.error("Error message:", error);
    }
    
  };

  const getLastChat = async (channels) => {
    let unreadCount = 0; 

    for(const channel of channels){
      try {
        const response = await api.get(`chat/getLastChat/${loginId}/${channel.id}`);
        // console.log(response.data);
        const unreadForChannel = await markReadAndGetUnread(response.data ,channel);
        unreadCount += unreadForChannel;
      
      } catch (error) {
        console.error(error);
      }
    }
    // console.log(unreadCount);
    // setTotalUnread(unreadCount);
    await saveTotalUnread(unreadCount);
  }

  const markReadAndGetUnread = async (data, channel) => {
    // console.log(channel);
    let unreadCountForChannel = 0;
    // console.log(data);
    if(data){
      try {
        // 각 메시지에 대해 마크 읽기 처리
        await chatInstance.markRead(data.channelId, {
          user_id: data.senderId,
          message_id: data.messageId,
          sort_id: data.sortId
        });
        // console.log(`Marked message ${message.message_id} as read.`);
      } catch (error) {
        console.error(`Error marking message as read:`, error);
      }
      try {
        const unread = await chatInstance.unreadCount(data.channelId);
        // console.log(`Unread count for channel ${data.channelId}:`, unread);
        setChannels(prevChannels => 
          prevChannels.map(ch => 
            ch.id === channel.id ? { ...ch, unread:unread.unread } : ch
          )
        );
        unreadCountForChannel = unread.unread;
      } catch (error) {
        console.error(`Error getting unread count for channel ${data.channelId}:`, error);
      }
    }else{
      setChannels(prevChannels => 
        prevChannels.map(ch => 
          ch.id === channel.id ? { ...ch, unread: 1 } : ch
        )
      );
      // console.log(`Unread count for channel ${data}:`, 1);
      unreadCountForChannel = 1;
    }
    return unreadCountForChannel;
  };

  const saveTotalUnread = async(unread) => {
    // console.log(unread);
    const data = {
      loginId: loginId,
      totalUnread: unread
    }
    try{
      const response = await api.post(`chat/saveTotalUnread`,data);
      // console.log(response);
    }catch(error){  
      console.error(error);
    }
  }

  useEffect(() => {
    // channels 상태가 업데이트되었을 때
    if (channels && channels.length > 0) {
      // console.log("Updated channels with unread counts:", channels);
    }
  }, [channels]);  

  const [refreshMileage, setRefreshMileage] = useState(false);

  const handleRefreshMileage = () => {
    setRefreshMileage((state) => !state);
  }

  return (
    <AuthProvider>
    <BrowserRouter>
      <TravelHeader board={board} local={local} userId={travelogUserId} refreshMileage={refreshMileage} />
      {chatInstance && loginId && userNickname && (
        <ChatLogin
          nc={chatInstance}
          loginId={loginId}
          userNickname={userNickname}
          handleChatLoginSuccess={handleChatLoginSuccess}
          // key={loginId}
        />
      )}
      <Routes>
        <Route path="/" element={<HomePage nc={chatInstance} />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route
          path="/board/:board/:local"
          element={
            <LocalBoard
              selectedBadge={selectedBadge}
              onParamsChange={(boardParam, localParam, travelogUserIdParam) => {
                setBoard(boardParam);
                setLocal(localParam);
                setTravelogUserId(travelogUserIdParam);
              }}
            />
          }
        />
        <Route path="/SignUpFormPage" element={<SignUpFormPage />} />
        <Route path="/PasswordResetPage" element={<PasswordResetPage />} />
        <Route
          path="/LoginFormPage"
          element={<LoginFormPage nc={chatInstance} />}
        />
        <Route path="/TravelWritePage" element={<TravelWritePage handleRefreshMileage={handleRefreshMileage}/>} />
        <Route path="/TravelEditPage" element={<TravelWritePage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/postpage/:postId" element={<PostPage />} />
        <Route path="/festival" element={<FestivalPage />} />
        <Route path="/mapShare" element={<MapSharePage />} />
        {/*쇼핑관련*/}
        <Route path="/shop/purchase" element={<ShopPage handleRefreshMileage={handleRefreshMileage}/>} />
        <Route path="/shop" element={<ShopPurchase handleRefreshMileage={handleRefreshMileage} />} />
        <Route path="/shop/history" element={<ShopHistory />} />
        {/*개인페이지관련*/}
        <Route
          path="/personal"
          element={<PersonalPage selectedBadge={selectedBadge} handleRefreshMileage={handleRefreshMileage}/>}
        />
        <Route
          path="/personal/:urlUserId"
          element={
            <PersonalPage
              selectedBadge={selectedBadge}
              openChatWindow={openChatWindow}
              nc={chatInstance}
            />
          }
        />
        <Route
          path="/personal/EditProfilePage"
          element={
            <EditProfilePage selectedBadge={selectedBadge} nc={chatInstance} />
          }
        />
        <Route
          path="/profile"
          element={<ProfileCard selectedBadge={selectedBadge} />}
        />
        <Route
          path="/personal/AchievementPage"
          element={
            <AchievementPage
              selectedBadge={selectedBadge}
              onBadgeSelect={setSelectedBadge}
            />
          }
        />
        <Route
          path="/personal/map"
          element={<MapPage selectedBadge={selectedBadge} />}
        />
        <Route
          path="/personal/map/:urlUserId"
          element={<MapPage selectedBadge={selectedBadge} />}
        />
        <Route
          path="/personal/follower"
          element={<FollowerPage selectedBadge={selectedBadge} />}
        />
        <Route
          path="/personal/following"
          element={<FollowingPage selectedBadge={selectedBadge} />}
        />
        <Route
          path="/personal/follower/:urlUserId"
          element={<FollowerPage selectedBadge={selectedBadge} />}
        />
        <Route
          path="/personal/following/:urlUserId"
          element={<FollowingPage selectedBadge={selectedBadge} />}
        />
        <Route
          path="/personal/travelog"
          element={<TravelogPage selectedBadge={selectedBadge} />}
        />
        {/* 랭킹페이지 관련 */}
        <Route
          path="/ranking/popular"
          element={<RankingPage initialRank="인기 게시글 랭킹" />}
        />
        <Route
          path="/ranking/user-activity"
          element={<RankingPage initialRank="유저 활동 랭킹" />}
        />
        <Route
          path="/ranking/hall-of-fame"
          element={<RankingPage initialRank="명예의 전당" />}
        />

        {/* <Route path="/board/bookmark/:local" element={<LocalBoard />}/> */}
      </Routes>
      {isChatLoginSuccessful && (
        <ChatWidget
          nc={chatInstance}
          loginId={loginId}
          recipientId={recipientId}
          projectId={projectId}
          apiKey={apiKey}
          isChatOpen={isChatOpen}
          toggleChatWindow={toggleChatWindow}
          openFromButton={openFromButton}
          channel={channel}
          channels={channels}
          openChatWindow={openChatWindow}
          handleChatChange={handleChatChange}
        />
      )}

      <Footer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
