import React from "react";
import styled from "styled-components";

const SearchBar = () => {
  return (
    <SearchForm>
      <Label htmlFor="searchInput" className="visually-hidden">
        어디로, 어떤 여행을 떠날 예정인가요?
      </Label>
      <SearchInput
        type="text"
        id="searchInput"
        placeholder="어디로, 어떤 여행을 떠날 예정인가요?"
      />
      <SearchButton type="submit" aria-label="Search">
        <SearchIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3d0b10c021ae5b658c9777a314a48078e66b82e7c53bbca628055f42fda7c9b?placeholderIfAbsent=true&apiKey=c7f1d91a917e4e2ba5370da6919a77db" alt="" />
      </SearchButton>
    </SearchForm>
  );
};

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  min-width: 240px;
  font-size: 16px;
  color: #767676;
  font-weight: 300;
  margin: auto 0;
`;

const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 13px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  @media (max-width: 991px) {
    padding-right: 20px;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
`;

const SearchIcon = styled.img`
  width: 31px;
  height: 31px;
`;

export default SearchBar;