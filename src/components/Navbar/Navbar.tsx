import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Importing the cart icon

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
`;

const CartLink = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  color: white;

  &:hover {
    color: #ffea00;
  }
`;

const CartIcon = styled(FaShoppingCart)`
  margin-right: 0.5rem;
`;

const Navbar: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <NavbarContainer>
      <Logo onClick={handleLogoClick}>Online Store</Logo>
      <CartLink onClick={handleCartClick}>
        <CartIcon /> Cart ({totalItems})
      </CartLink>
    </NavbarContainer>
  );
};

export default Navbar;
