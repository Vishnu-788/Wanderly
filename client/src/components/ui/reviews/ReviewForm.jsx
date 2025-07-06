import React, { useState } from "react";
import axios from "axios";
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";

function ReviewForm({ tourId, closeForm, onSubmitSuccess }) {
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewText, setReviewText] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      tour: tourId,
      username: username,
      rating: rating,
      reviewText: reviewText,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/review",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        onSubmitSuccess();
        closeForm();
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Something went wrong while submitting your review.");
    }
  };

  return (
    <div className="p-4 border rounded bg-light">
      <h4 className="mb-3">Write a Review</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <FloatingLabel label="Your Name" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FloatingLabel>

        <FloatingLabel label="Rating (1-5)" className="mb-3">
          <Form.Control
            type="number"
            min="1"
            max="5"
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </FloatingLabel>

        <FloatingLabel label="Your Review" className="mb-3">
          <Form.Control
            as="textarea"
            placeholder="Leave a review here"
            style={{ height: "120px" }}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </FloatingLabel>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={closeForm}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default ReviewForm;
