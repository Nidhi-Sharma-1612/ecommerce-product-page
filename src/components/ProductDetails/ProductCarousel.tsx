// src/components/ProductDetails/ProductCarousel.tsx
import React from "react";
import styled from "styled-components";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  max-width: 400px; /* Set a max width for the regular image */
`;

interface ProductCarouselProps {
  images: string[];
  altText: string; // Add altText prop for customizable alt description
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  images,
  altText,
}) => {
  return (
    <CarouselContainer>
      <ImageWrapper>
        <Zoom zoomMargin={40}>
          <img
            src={images[0]} // Use the first image in the array
            alt={altText} // Use descriptive alt text passed via prop
            style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          />
        </Zoom>
      </ImageWrapper>
    </CarouselContainer>
  );
};

export default ProductCarousel;
