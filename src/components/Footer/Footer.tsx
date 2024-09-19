// src/components/Footer/Footer.tsx
import React from "react";
import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Social media icons

// Full-width footer
const FooterContainer = styled.footer`
  background-color: #007bff; /* Same background as the navbar */
  padding: 2rem 1rem;
  border-top: 1px solid #e0e0e0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: left;
  justify-items: center;
  width: 100%; /* Ensure full width */
  color: white; /* Make text white for contrast */

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Stack on smaller screens */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Stack in one column on mobile */
  }
`;

const FooterSection = styled.div`
  max-width: 300px;
`;

const FooterHeading = styled.h4`
  font-size: 1.25rem;
  color: white; /* White text color */
  margin-bottom: 1rem;
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  color: #d1d1d1; /* Lighter shade for body text */
  line-height: 1.6;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const IconLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #d1d1d1; /* Change color on hover */
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      {/* Company Info */}
      <FooterSection>
        <FooterHeading>About Us</FooterHeading>
        <FooterText>
          We are a modern company focused on delivering the best products to our
          customers. Our goal is to provide high-quality service with the latest
          technology.
        </FooterText>
      </FooterSection>

      {/* Quick Links */}
      <FooterSection>
        <FooterHeading>Quick Links</FooterHeading>
        <FooterText>
          <ul>
            <li>
              <a href="#home" style={{ color: "#d1d1d1" }}>
                Home
              </a>
            </li>
            <li>
              <a href="#shop" style={{ color: "#d1d1d1" }}>
                Shop
              </a>
            </li>
            <li>
              <a href="#about" style={{ color: "#d1d1d1" }}>
                About
              </a>
            </li>
            <li>
              <a href="#contact" style={{ color: "#d1d1d1" }}>
                Contact
              </a>
            </li>
          </ul>
        </FooterText>
      </FooterSection>

      {/* Contact Information */}
      <FooterSection>
        <FooterHeading>Contact Us</FooterHeading>
        <FooterText>
          Email: contact@company.com <br />
          Phone: +123 456 7890
        </FooterText>
      </FooterSection>

      {/* Social Media */}
      <FooterSection>
        <FooterHeading>Follow Us</FooterHeading>
        <SocialIcons>
          <IconLink href="https://facebook.com" target="_blank">
            <FaFacebook />
          </IconLink>
          <IconLink href="https://twitter.com" target="_blank">
            <FaTwitter />
          </IconLink>
          <IconLink href="https://instagram.com" target="_blank">
            <FaInstagram />
          </IconLink>
          <IconLink href="https://linkedin.com" target="_blank">
            <FaLinkedin />
          </IconLink>
        </SocialIcons>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
