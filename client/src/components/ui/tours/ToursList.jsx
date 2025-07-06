// src/components/TourList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TourCard from "./TourCard";
import { Col, Row } from "react-bootstrap";
import "./tours.css";
import TourDetail from "./TourDetail";
import Review from "../reviews/Review";
import QuoteCarousel from "../carousel/QuoteCaraousel";
import { BASE_URL } from "../../../utils/constants";

const TourList = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [nonFeaturedTours, setNonFeaturedTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tours`);
        const allTours = res.data.data;

        const featured = allTours.filter((tour) => tour.featured === true);
        const nonFeatured = allTours.filter((tour) => tour.featured === false);

        setFeaturedTours(featured);
        setNonFeaturedTours(nonFeatured);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };

    fetchTours();
  }, []);

  return (
    <Row>
      {/* Left section */}
      <Col md={6} className="list-pane">
        {showReviews ? (
          <Review tourId={selectedTour._id} />
        ) : (
          <>
            <div className="tour-sections">
              {/* Featured */}
              {featuredTours.length > 0 && (
                <section>
                  <h5 className="section-title">🌟 Featured</h5>
                  <div className="horizontal-scroll">
                    {featuredTours.map((tour) => (
                      <TourCard
                        key={tour._id}
                        tour={tour}
                        onClick={() => setSelectedTour(tour)}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* All Tours */}
              <section>
                <h5 className="section-title">🗺️ All Tours</h5>
                <div className="horizontal-scroll">
                  {nonFeaturedTours.map((tour) => (
                    <TourCard
                      key={tour._id}
                      tour={tour}
                      onClick={() => setSelectedTour(tour)}
                    />
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </Col>

      {/* Right section */}
      <Col md={6} className="detail-pane">
        {selectedTour ? (
          <TourDetail
            tour={selectedTour}
            toggleReview={() => setShowReviews((prev) => !prev)}
            showReviews={showReviews}
          />
        ) : (
          <QuoteCarousel />
        )}
      </Col>
    </Row>
  );
};

export default TourList;
