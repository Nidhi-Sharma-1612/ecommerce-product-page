// src/components/ProductDetails/ProductDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import styled from "styled-components";
import { Product } from "../../types/Product";
import ProductCarousel from "./ProductCarousel";
import RelatedProducts from "./RelatedProducts";
import { addToCart } from "../../redux/slices/cartSlice";
import { CartItem } from "../../types/CartItem";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Icons for star ratings

// Styled Components
const ProductDetailsWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProductDetailsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const ProductInfo = styled.div`
  max-width: 500px;
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
`;

const Price = styled.p`
  font-size: 32px;
  font-weight: bold;
  color: #ff6347;
  margin: 0.5rem 0;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Category = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 0.5rem;
`;

const Stock = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 1rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;

  label {
    font-size: 16px;
  }

  input {
    width: 60px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
  }
`;

const AddToCartButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #218838;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewsContainer = styled.div`
  margin-top: 2rem;
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ReviewTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const ReviewCard = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewRating = styled.div`
  display: flex;
  align-items: center;
  color: #f0c040; /* Gold color for stars */
  margin-bottom: 1rem;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
`;

const RatingText = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-right: 0.5rem;
`;

// Helper function to render star ratings
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <ReviewRating>
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
    </ReviewRating>
  );
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const selectedProduct = products.find((prod) => prod.id === Number(id));
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
  }, [id, products]);

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.title,
      price: product.price,
      quantity,
    };
    dispatch(addToCart(cartItem));
    alert(`${quantity} ${product.title}(s) added to cart!`);
  };

  return (
    <ProductDetailsWrapper>
      <ProductDetailsContainer>
        <ProductCarousel images={[product.image]} altText={product.title} />

        <ProductInfo>
          <Title>{product.title}</Title>
          <RatingText>{renderStars(product.rating.rate)}</RatingText>
          <Price>${product.price}</Price>
          <Description>{product.description}</Description>
          <Category>
            <strong>Category:</strong> {product.category}
          </Category>
          <Stock>
            <strong>Stock:</strong> {product.rating.count} available
          </Stock>

          <QuantitySelector>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min={1}
              max={product.rating.count}
              onChange={handleQuantityChange}
            />
          </QuantitySelector>

          <AddToCartButton onClick={handleAddToCart}>
            Add to Cart
          </AddToCartButton>
        </ProductInfo>
      </ProductDetailsContainer>

      {/* Customer Reviews Section */}
      <ReviewsContainer>
        <ReviewTitle>Customer Reviews:</ReviewTitle>
        <ReviewCard>
          <RatingText>Rating: {product.rating.rate} / 5</RatingText>
          {renderStars(product.rating.rate)}
          <ReviewText>{product.description}</ReviewText>
        </ReviewCard>
      </ReviewsContainer>

      {/* Related Products */}
      <RelatedProducts category={product.category} />
    </ProductDetailsWrapper>
  );
};

export default ProductDetails;
