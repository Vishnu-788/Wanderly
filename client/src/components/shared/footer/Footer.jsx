// src/components/FooterComponent.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="travel-footer text-white py-5">
      <Container>
        <Row className="gy-4">
          {/* Column 1: Brand & Social */}
          <Col md={3}>
            <h5>WanderLy</h5>
            <p>
              Find your perfect stay, anywhere on Earth (and maybe Mars soon).
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="footer-icon">
                <FaFacebookF />
              </a>
              <a href="#" className="footer-icon">
                <FaTwitter />
              </a>
              <a href="#" className="footer-icon">
                <FaInstagram />
              </a>
              <a href="mailto:support@wanderly.com" className="footer-icon">
                <FaEnvelope />
              </a>
            </div>
          </Col>

          {/* Column 2: Company */}
          <Col md={3}>
            <h6>Company</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </Col>

          {/* Column 3: Support */}
          <Col md={3}>
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Cancellation Options</a>
              </li>
              <li>
                <a href="#">Safety Information</a>
              </li>
              <li>
                <a href="#">Contact Support</a>
              </li>
            </ul>
          </Col>

          {/* Column 4: Newsletter */}
          <Col md={3}>
            <h6>Stay Updated</h6>
            <p>Subscribe to get the latest travel deals and updates.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control mb-2"
            />
            <button className="btn btn-outline-light w-100">Subscribe</button>
          </Col>
        </Row>
        <hr className="border-light mt-4" />
        <p className="text-center mb-0 small">
          © {new Date().getFullYear()} WanderLy • All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
