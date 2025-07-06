import React from "react";
import { FiMapPin } from "react-icons/fi";
import { BsCurrencyRupee } from "react-icons/bs";
import "./tours.css";

const TourCard = ({ tour, onClick, active }) => {
  const { photo, title, city, price } = tour;

  return (
    <div
      className={`tour-card ${active ? "card-active" : ""}`}
      onClick={onClick}
    >
      <div className="tour-card-img-wrapper">
        <img src={`/assets/${photo}`} alt={title} className="tour-card-img" />
      </div>
      <div className="tour-card-body">
        <h6 className="tour-title">{title}</h6>
        <p className="tour-city">
          <FiMapPin className="me-1" />
          {city}
        </p>
        <p className="tour-price">
          <BsCurrencyRupee className="me-1" />
          {price}
        </p>
      </div>
    </div>
  );
};

export default TourCard;
