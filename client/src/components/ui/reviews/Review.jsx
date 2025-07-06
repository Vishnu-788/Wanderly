import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { Container, Button, Row, Col, Alert } from "react-bootstrap";
import "./review.css";

function Review({ tourId }) {
  const [reviews, setReviews] = useState([]);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/v1/review/${tourId}`,
        { withCredentials: true }
      );
      setReviews(res.data.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    if (tourId) fetchReviews();
  }, [tourId]);

  return (
    <Container className="my-4 review-section">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="mb-0 text-primary-pink">User Reviews</h4>
        </Col>

        <Col xs="auto">
          <Button
            className={isReviewFormOpen ? "wander-btn-outline" : "wander-btn"}
            onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
          >
            {isReviewFormOpen ? "Close Review Form" : "Add Review 📝"}
          </Button>
        </Col>
      </Row>

      {isReviewFormOpen && (
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <ReviewForm
              tourId={tourId}
              closeForm={() => setIsReviewFormOpen(false)}
              onSubmitSuccess={fetchReviews}
            />
          </Col>
        </Row>
      )}

      <Row>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Col key={review._id} xs={12} className="mb-4">
              <ReviewCard review={review} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info" className="text-center">
              No reviews yet. Be the first to write one! 🌟
            </Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Review;
