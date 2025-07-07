import React from "react";
import { Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa"; // Install react-icons if not added

const ReviewCard = ({ review }) => {
  const { username, rating, reviewText, createdAt } = review;

  return (
    <Card className="shadow-sm rounded-4 h-100" style={{ height: "250px" }}>
      <Card.Body className="d-flex flex-column">
        {/* Username */}
        <Card.Title className="mb-2 fw-bold fs-5 text-primary">
          {username}
        </Card.Title>

        {/* Rating as stars */}
        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              size={16}
              color={i < rating ? "#ffc107" : "#e4e5e9"}
              className="me-1"
            />
          ))}
        </div>

        {/* Review text scrollable box */}
        <div
          className="text-muted fs-6 mb-2"
          style={{
            maxHeight: "100px",
            overflowY: "auto",
            paddingRight: "4px",
          }}
        >
          {reviewText}
        </div>

        {/* Optional date */}
        <div className="mt-auto text-end">
          <small className="text-secondary">
            {new Date(createdAt).toLocaleDateString()}
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
