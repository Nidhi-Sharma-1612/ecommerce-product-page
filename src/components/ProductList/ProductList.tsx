// src/components/ProductList/ProductList.tsx
import React, { useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/slices/productSlice";
import CategoryFilter from "../Filters/CategoryFilter";
import PriceFilter from "../Filters/PriceFilter";
import SearchBar from "../Filters/SearchBar";
import SortDropdown from "../Filters/SortDropdown";
import styled from "styled-components";
import Navbar from "../Navbar/Navbar"; // Import your navbar component

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: hidden;
`;

const Sidebar = styled.div`
  width: 250px;
  padding: 1.5rem;
  background-color: #f8f8f8;
  border-right: 1px solid #ccc;
  position: fixed;
  top: 60px; /* Adjust the sidebar position based on the navbar */
  bottom: 0;
`;

const MainContent = styled.div`
  margin-left: 250px;
  width: calc(100% - 250px);
  padding-top: 150px;
  height: 100vh;
  overflow-y: auto;
`;

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  position: fixed;
  top: 60px; /* Below the navbar */
  left: 250px;
  right: 0;
  background-color: white;
  z-index: 1000;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const SearchBarContainer = styled.div`
  flex-shrink: 0;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1.5rem;
  width: 100%;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: #555;
`;

const ErrorText = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: red;
`;

const NoResultText = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #555;
  padding: 2rem;
`;

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.products.filteredProducts
  );
  const status = useSelector((state: RootState) => state.products.status);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingText>Loading products...</LoadingText>;
  }

  if (status === "failed") {
    return (
      <ErrorText>Failed to load products. Please try again later.</ErrorText>
    );
  }

  return (
    <>
      {/* Navbar */}
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>

      <PageContainer>
        <Sidebar>
          <CategoryFilter />
          <PriceFilter />
          <SortDropdown />
        </Sidebar>

        <MainContent>
          <HeaderContainer>
            <Heading>Our Products</Heading>
            <SearchBarContainer>
              <SearchBar />
            </SearchBarContainer>
          </HeaderContainer>

          {/* Product Grid or No Result Message */}
          {products.length > 0 ? (
            <ProductGrid>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <NoResultText>Result not found!</NoResultText>
          )}
        </MainContent>
      </PageContainer>
    </>
  );
};

export default ProductList;
