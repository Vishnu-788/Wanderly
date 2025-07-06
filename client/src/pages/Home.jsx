// src/pages/Home.jsx
import React from "react";
import { Container } from "react-bootstrap";
import ToursList from "../components/ui/tours/ToursList";

import "../styles/split-view.css";

const Home = () => {
  return (
    <Container fluid className="split-view">
      <ToursList />
    </Container>
  );
};

export default Home;
