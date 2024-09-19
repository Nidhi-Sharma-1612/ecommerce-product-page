// src/components/ProductCard/ProductCard.tsx
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { Product } from "../../types/Product";
import { CartItem } from "../../types/CartItem";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Helper function to truncate the product name
const truncate = (text: string, length: number) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

// Helper function to render star ratings
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ color: "#f0c040", display: "flex" }}>
      {" "}
      {/* Gold color for stars */}
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`full-${index}`} />
        ))}
      {hasHalfStar && <FaStarHalfAlt />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} />
        ))}
    </div>
  );
};

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.p`
  font-size: 1.1rem;
  color: #007bff;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 2rem;

  &:hover {
    background-color: #218838;
  }
`;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.image, // Ensure the product image is passed to the cart
    };
    dispatch(addToCart(cartItem));
  };

  const handleNavigateToDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card onClick={handleNavigateToDetails}>
      <Image src={product.image} alt={product.title} />
      <Title>{truncate(product.title, 50)}</Title>{" "}
      {/* Truncated product name */}
      <Price>${product.price}</Price>
      {renderStars(product.rating?.rate || 0)} {/* Render stars for ratings */}
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </Card>
  );
};

export default ProductCard;
