import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TourDetail from "../components/ui/tours/TourDetail";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { BASE_URL } from "../utils/constants";
import Review from "../components/ui/reviews/Review";
import "../styles/searchbar.css";

function Search() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const city = params.get("city");
  const distance = Number(params.get("distance")) || 0;
  const maxGroupSize = Number(params.get("maxGroupSize")) || 1;

  useEffect(() => {
    if (!city) {
      setError("Please enter a city to search.");
      setLoading(false);
      return;
    }

    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/tours/search/getTourBySearch?city=${city}&maxGroupSize=${maxGroupSize}&distance=${distance}`
        );
        setTours(response.data.data || []);
      } catch (err) {
        console.error("Search error", err);
        setError("No tours found.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [city, distance, maxGroupSize]);

  return (
    <Container fluid className="search-wrapper">
      <Row className="min-vh-100">
        {/* Left panel: Scrollable list */}
        <Col
          md={6}
          className="border-end search-results"
          style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
        >
          <h5 className="text-center mb-3">Search Results</h5>
          {showReviews ? (
            <Review tourId={selectedTour._id} />
          ) : (
            <>
              {loading && (
                <Spinner animation="border" className="d-block mx-auto" />
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              {!loading && !error && tours.length === 0 && (
                <Alert variant="info">No results found</Alert>
              )}

              {tours.map((tour) => (
                <Card
                  key={tour._id}
                  className="mb-2 clickable-card"
                  onClick={() => setSelectedTour(tour)}
                >
                  <Card.Body>
                    <Card.Title>{tour.title}</Card.Title>
                    <Card.Text>
                      {tour.city} • ₹{tour.price} • Group: {tour.maxGroupSize}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </Col>

        {/* Right panel: Tour details */}
        <Col md={6} className="p-4">
          {selectedTour ? (
            <TourDetail
              tour={selectedTour}
              toggleReview={() => setShowReviews((prev) => !prev)}
              showReviews={showReviews}
            />
          ) : (
            <div className="text-center text-muted mt-5">
              <h4>Select a tour to see details ➡️</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
