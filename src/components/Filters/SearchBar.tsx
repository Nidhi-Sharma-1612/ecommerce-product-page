// src/components/Filters/SearchBar.tsx
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/slices/productSlice";
import { FaSearch } from "react-icons/fa"; // Importing search icon

const SearchBarContainer = styled.div`
  position: relative;
  width: 400px; /* Set the width of the container */
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  color: #888;
`;

const SearchInput = styled.input`
  width: 100%; /* Make the input take the full width of the container */
  padding: 0.75rem 1rem 0.75rem 2.75rem; /* Add left padding for the search icon */
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  }
`;

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <SearchBarContainer>
      <SearchIcon />
      <SearchInput
        type="text"
        placeholder="Search products..."
        onChange={handleSearch}
      />
    </SearchBarContainer>
  );
};

export default SearchBar;
