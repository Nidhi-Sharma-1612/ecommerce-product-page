// src/components/Checkout/Checkout.tsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import styled from "styled-components";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

// Styled Components
const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 6rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  margin: 2rem 0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #555;
  }

  input,
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    color: #333;
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;
`;

const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  gap: 1rem;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 8px;
`;

const CartItemName = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const CartItemPrice = styled.p`
  font-size: 1rem;
  color: #888;
`;

const QuantityAndRemove = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  text-align: center;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const CartButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 40px;

  &:hover {
    background-color: #c82333;
  }
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
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1.25rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "USA",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    alert("Payment successful! Your order is complete.");
    dispatch(clearCart()); // Clear the cart
    navigate("/"); // Redirect to the product listing page
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <CheckoutContainer>
      <h1>Checkout</h1>

      {/* Order Summary */}
      <SectionContainer>
        <SectionTitle>Order Summary</SectionTitle>
        {cartItems.map((item) => (
          <CartItemContainer key={item.id}>
            <CartItemDetails>
              <CartItemImage src={item.image} alt={item.name} />
              <div>
                <CartItemName>{item.name}</CartItemName>
                <CartItemPrice>
                  ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </CartItemPrice>
              </div>
            </CartItemDetails>
            <QuantityAndRemove>
              <QuantityInput
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  handleQuantityChange(item.id, Number(e.target.value))
                }
              />
              <CartButton onClick={() => handleRemoveItem(item.id)}>
                Remove
              </CartButton>
            </QuantityAndRemove>
          </CartItemContainer>
        ))}
        <CartSummary>Total: ${totalPrice.toFixed(2)}</CartSummary>
      </SectionContainer>

      {/* Shipping Form */}
      <SectionContainer>
        <SectionTitle>Shipping Address</SectionTitle>
        <FormGroup>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={shippingAddress.name}
            onChange={handleShippingChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            value={shippingAddress.address}
            onChange={handleShippingChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            type="text"
            value={shippingAddress.city}
            onChange={handleShippingChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="zip">ZIP Code</label>
          <input
            id="zip"
            name="zip"
            type="text"
            value={shippingAddress.zip}
            onChange={handleShippingChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={shippingAddress.country}
            onChange={handleShippingChange}
          >
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
          </select>
        </FormGroup>
      </SectionContainer>

      {/* Payment Form */}
      <SectionContainer>
        <SectionTitle>Payment Information</SectionTitle>
        <FormGroup>
          <label htmlFor="cardName">Name on Card</label>
          <input
            id="cardName"
            name="cardName"
            type="text"
            value={paymentInfo.cardName}
            onChange={handlePaymentChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="text"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            name="cvv"
            type="text"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
          />
        </FormGroup>
      </SectionContainer>

      {/* Checkout Button */}
      <CheckoutButton onClick={handleCheckout}>
        Complete Purchase
      </CheckoutButton>
    </CheckoutContainer>
  );
};

export default Checkout;
