// src/components/Filters/PriceFilter.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setPriceFilter } from "../../redux/slices/productSlice";
import styled from "styled-components";

// Styled Components for input fields
const FilterContainer = styled.div`
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

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem; /* Gap between the two input fields */
`;

const Input = styled.input`
  width: 100%; /* Full width of the container for each input */
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

const PriceFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const handlePriceChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newPriceRange = [...priceRange] as [number, number];
    newPriceRange[index] = parseInt(event.target.value);
    setPriceRange(newPriceRange);
    dispatch(setPriceFilter(newPriceRange));
  };

  return (
    <FilterContainer>
      <Label>Price Range: </Label>
      <InputContainer>
        <Input
          type="number"
          value={priceRange[0]}
          onChange={(e) => handlePriceChange(e, 0)}
          min="0"
        />
        <Input
          type="number"
          value={priceRange[1]}
          onChange={(e) => handlePriceChange(e, 1)}
          min="0"
        />
      </InputContainer>
    </FilterContainer>
  );
};

export default PriceFilter;
