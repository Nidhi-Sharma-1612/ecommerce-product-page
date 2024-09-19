// src/components/Cart/Cart.tsx
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 6rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const CartHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CartItemDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
`;

const CartItemText = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItemName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CartItemPrice = styled.p`
  font-size: 1rem;
  color: #555;
`;

const CartItemQuantity = styled.p`
  font-size: 1rem;
  color: #888;
`;

const CartSummary = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: right;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: #28a745;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
  }
`;

const EmptyCartMessage = styled.p`
  font-size: 1.5rem;
  color: #666;
  text-align: center;
  padding: 3rem 0;
`;

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>;
  }

  return (
    <CartContainer>
      <CartHeading>Your Shopping Cart</CartHeading>
      {cartItems.map((item) => (
        <CartItemContainer key={item.id}>
          <CartItemDetails>
            {/* Display product image */}
            <CartItemImage src={item.image} alt={item.name} />
            <CartItemText>
              <CartItemName>{item.name}</CartItemName>
              <CartItemPrice>${item.price.toFixed(2)}</CartItemPrice>
              <CartItemQuantity>Quantity: {item.quantity}</CartItemQuantity>
            </CartItemText>
          </CartItemDetails>
        </CartItemContainer>
      ))}

      <CartSummary>Total: ${totalPrice.toFixed(2)}</CartSummary>

      <CheckoutButton onClick={handleCheckout}>
        Proceed to Checkout
      </CheckoutButton>
    </CartContainer>
  );
};

export default Cart;
