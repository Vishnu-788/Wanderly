import React, { useState } from "react";
import BookingModal from "../bookings/BookingModal";
import { Button } from "react-bootstrap";
import { FiMapPin, FiUsers, FiCompass } from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";
import { useSelector } from "react-redux";

import "./tours.css";
import { calculateDistance } from "../../../utils/distanceCalc";

const TourDetail = ({ tour, toggleReview, showReviews }) => {
  const user = useSelector((state) => state.auth.user);
  const userLocation = useSelector((state) => state.location);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { photo, title, city, desc, price, maxGroupSize, latitude, longitude } =
    tour;
  // Get the distance between the user and the tour
  const distanceBetween = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    latitude,
    longitude
  );

  return (
    <div className="tour-detail">
      {showBookingModal && (
        <BookingModal
          show={showBookingModal}
          closeModal={() => setShowBookingModal(false)}
          tourName={title}
        />
      )}

      <div className="tour-detail-image-wrapper">
        <img
          src={`/assets/${photo}`}
          alt={title}
          className="tour-detail-image"
        />
      </div>

      <div className="tour-detail-body">
        <div>
          <div className="tour-header d-flex justify-content-between align-items-center">
            <h2 className="tour-detail-title">{title}</h2>
            <h5 className="price">
              <BsCurrencyRupee className="me-1" />
              {price}
            </h5>
          </div>

          <p className="text-muted">
            <FiMapPin className="me-1" /> {city} · <FiUsers className="me-1" />{" "}
            Max Group: {maxGroupSize} · <FiCompass className="me-1" />{" "}
            {distanceBetween} km
          </p>

          <div className="flex-grow-1">
            <p className="tour-desc">{desc}</p>
          </div>
        </div>

        {/* Stack buttons vertically on the left */}
        <div className="action-btns-vertical mt-4">
          <Button className="wander-btn" onClick={toggleReview}>
            {showReviews ? "Close Reviews" : "Show Reviews"}
          </Button>
          {user && (
            <Button
              className="wander-btn"
              onClick={() => setShowBookingModal(true)}
            >
              Book
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
