// src/components/ProductDetails/RelatedProducts.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProductCard from "../ProductCard/ProductCard";
import styled from "styled-components";

const RelatedProductsContainer = styled.div`
  margin-top: 4rem;
  padding: 2rem 1rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const RelatedProductsHeading = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Adjust spacing between the cards */
  padding: 0 2rem;
  gap: 2rem; /* Add gap between the rows and columns */
`;

const ProductCardWrapper = styled.div`
  flex: 1 1 calc(45% - 2rem); /* Adjusted for better spacing */
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex: 1 1 calc(50% - 2rem); /* 2 cards per row on smaller screens */
  }

  @media (max-width: 480px) {
    flex: 1 1 100%; /* 1 card per row on very small screens */
  }
`;

const RelatedProducts: React.FC<{ category: string }> = ({ category }) => {
  const products = useSelector((state: RootState) => state.products.products);
  const relatedProducts = products
    .filter((prod) => prod.category === category)
    .slice(0, 4); // Limit to 4 related products

  return (
    <RelatedProductsContainer>
      <RelatedProductsHeading>Related Products</RelatedProductsHeading>
      <ProductsGrid>
        {relatedProducts.map((product) => (
          <ProductCardWrapper key={product.id}>
            <ProductCard product={product} />
          </ProductCardWrapper>
        ))}
      </ProductsGrid>
    </RelatedProductsContainer>
  );
};

export default RelatedProducts;
