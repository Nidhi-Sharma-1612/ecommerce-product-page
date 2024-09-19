// src/components/Filters/SortDropdown.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { setSortOption } from "../../redux/slices/productSlice";
import styled from "styled-components";

// Styled Components for dropdown
const DropdownContainer = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem; /* Add space between label and input */
  display: block; /* Ensure label is on its own line */
  color: #333;
`;

const Select = styled.select`
  width: 100%; /* Full width */
  padding: 0.75rem; /* Increased padding for a better look */
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  }
`;

const SortDropdown: React.FC = () => {
  const dispatch = useDispatch();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(event.target.value));
  };

  return (
    <DropdownContainer>
      <Label>Sort by: </Label>
      <Select onChange={handleSortChange}>
        <option value="">Select...</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </Select>
    </DropdownContainer>
  );
};

export default SortDropdown;
