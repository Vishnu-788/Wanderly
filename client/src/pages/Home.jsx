// src/pages/Home.jsx
import React from "react";
import { Container } from "react-bootstrap";
import ToursList from "../components/ui/tours/ToursList";

import "../styles/home.css";
import { useUserLocation } from "../hooks/useUserLocation";

const Home = () => {
  // Get the user location and upadte the global state
  useUserLocation(); // It updates Redux internally

  return (
    <Container fluid className="split-view">
      <ToursList />
    </Container>
  );
};

export default Home;
