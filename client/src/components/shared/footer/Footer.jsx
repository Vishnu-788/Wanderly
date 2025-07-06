// src/components/FooterComponent.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="travel-footer text-white py-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>WanderCorp™</h5>
            <p>Empowering pigeons to explore the globe since 1903.</p>
            <p>Now carbon-free and gluten-free.</p>
          </Col>

          <Col md={4}>
            <h5>Important-ish Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Privacy Bubble</a>
              </li>
              <li>
                <a href="#">Cookie Crumbs</a>
              </li>
              <li>
                <a href="#">Banana Republic</a>
              </li>
              <li>
                <a href="#">Unsubscribe from Life</a>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Subscribe to Nothing</h5>
            <p>
              Sign up for weekly updates about the moon's mood and cloud gossip.
            </p>
            <input
              type="email"
              placeholder="Your Email (we won't read it)"
              className="form-control mb-2"
            />
            <button className="btn btn-outline-light w-100">Vanish ✨</button>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center mb-0">
          © {new Date().getFullYear()} WanderCorp™ | All rights reserved and
          then some.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
