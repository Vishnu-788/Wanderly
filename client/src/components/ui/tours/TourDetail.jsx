import React, { useState } from "react";
import BookingModal from "../bookings/BookingModal";
import { Button } from "react-bootstrap";
import { FiMapPin, FiUsers, FiCompass } from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";
import "./tours.css";

const TourDetail = ({ tour, toggleReview, showReviews }) => {
  if (!tour) return <p>No tour selected.</p>;
  const [showBookingModal, setShowBookingModal] = useState(false);

  const { photo, title, city, desc, price, maxGroupSize, distance } = tour;

  return (
    <div className="tour-detail">
      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          show={showBookingModal}
          closeModal={() => setShowBookingModal(false)}
          tourName={title}
        />
      )}
      {/* Image Banner */}
      <div className="tour-detail-image-wrapper">
        <img
          src={`/assets/${photo}`}
          alt={title}
          className="tour-detail-image"
        />
      </div>

      {/* Body */}
      <div className="tour-detail-body">
        <div className="tour-header d-flex justify-content-between align-items-center">
          <h2 className="tour-detail-title">{title}</h2>
          <h5 className="price">
            <BsCurrencyRupee className="me-1" />
            {price}
          </h5>
        </div>

        <p className="text-muted">
          <FiMapPin className="me-1" /> {city} · <FiUsers className="me-1" />{" "}
          Max Group: {maxGroupSize} · <FiCompass className="me-1" /> {distance}
          km
        </p>

        {/* Flex wrapper for desc + buttons */}
        <div className="d-flex justify-content-between flex-wrap gap-3">
          <p className="tour-desc flex-grow-1">{desc}</p>

          <div className="action-btns d-flex flex-column gap-2">
            <Button className="wander-btn" onClick={toggleReview}>
              {showReviews ? "Close Reviews" : "Show Reviews"}
            </Button>

            <Button
              className="wander-btn"
              onClick={() => setShowBookingModal(true)}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetail;
