import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../../Includes/common/CommonUtil";

const SearchBar = ({board, local, userId}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 관리
  let loginInfo = getLoginInfo();
  const loginUserId = loginInfo?.userId || null;

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // 입력값 업데이트
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("ASDASDASDASD"+userId);
    console.log("ASDASDASDASD"+loginUserId);
    if (searchTerm.trim() !== "") {
        console.log("Searching for:", searchTerm);
        console.log(board + "/" + local);
        
        const searchParams = new URLSearchParams();
        searchParams.set('searchTerm', searchTerm);
        
        if (board === 'localboard' || board === 'bookmark' || board ==='follow'  ) {              
              navigate(`board/${board}/${local}?${searchParams.toString()}`);
        }else if(board ==='travelog'){  
          if(loginUserId===userId){
            navigate(`board/${board}/${local}?${searchParams.toString()}`);
          }else{
            navigate(`board/${board}/${local}?${searchParams.toString()}`,{state: {travelogId:userId}});
          }
        } 
        else {
            navigate(`board/localboard/all?${searchParams.toString()}`);
        }
        setSearchTerm('');
    }
};

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e); // 엔터 키를 눌렀을 때 검색 수행
      
    }
  };

  return (
    <SearchForm>
      <InputDiv>
        <SearchInput
          type="text"
          id="searchInput"
          placeholder="어디로 여행을 떠날 예정인가요?"
          value={searchTerm}
          onChange={handleInputChange} // 입력값 변경 시 상태 업데이트
          onKeyPress={handleKeyPress} // 키 입력 시 이벤트 처리
        />
        <StyledFaSearch onClick={handleSearch}/>
      </InputDiv>
      
        {/* <InputDiv >
        <SearchInput
          type="text"
          // id="searchInput"
          placeholder="어디로 여행을 떠날 예정인가요?"
          // value={searchTerm}
          // onChange={handleInputChange} // 입력값 변경 시 상태 업데이트
          // onKeyPress={handleKeyPress} // 키 입력 시 이벤트 처리
        />
        <StyledFaSearch/>
      </InputDiv> */}

    </SearchForm>
  );
};

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  min-width: 300px;
  font-size: 16px;
  color: #767676;
  font-weight: 300;
  margin: auto 0;
`;

const InputDiv = styled.div`
  position: relative; /* 아이콘을 입력창에 절대 위치시키기 위해 relative 설정 */
  flex-grow: 1;
  margin-right: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 0px 10px 0px; /* 오른쪽 패딩을 아이콘 크기에 맞춰 조정 */
  border: none; /* 전체 테두리 제거 */
  border-bottom: 1px solid #ccc; /* 밑줄 추가 */
  border-radius: 0; /* 테두리 반경을 0으로 설정 */
  padding-left: 10px; /* 왼쪽 여백 */
  padding-right: 35px;
  padding-bottom: 7px;
  font-size: 16px;

  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;

const StyledFaSearch = styled(FaSearch)`
  position: absolute; /* 아이콘을 입력창 내에 절대 위치 */
  right: 10px; /* 오른쪽 여백 */
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 세로 중앙 정렬을 위한 변환 */
  width: 20px; /* 아이콘 너비 */
  height: 20px; /* 아이콘 높이 */
  color: #767676; /* 기본 아이콘 색상 */

  /* 마우스 오버 시 색상 변경 */
  &:hover {
    color: #FFB74D; /* 호버 시 아이콘 색상을 #FFB74D로 변경 */
  }
`;

export default SearchBar;