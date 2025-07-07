import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Card, Container, Spinner, Alert } from "react-bootstrap";
import { BASE_URL } from "../utils/constants";

function ViewBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.auth.user);
  console.log("User: ", user);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/booking/${user.userId}`, {
        withCredentials: true,
      });
      console.log(response);

      setBookings(response.data.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Unable to fetch bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      fetchBookings();
    }
  }, [user.userId]);

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">My Bookings</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center w-75 mx-auto">
          {error}
        </Alert>
      )}

      {!loading && bookings.length === 0 && (
        <Alert variant="info" className="text-center w-75 mx-auto">
          No bookings found. Time to travel, maybe?
        </Alert>
      )}

      {/* Scrollable area below */}
      <div
        className="booking-scroll-area d-flex flex-column align-items-center gap-4"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          paddingRight: "0.5rem",
        }}
      >
        {bookings.map((booking) => (
          <Card
            key={booking._id}
            className="shadow p-3 w-75"
            style={{ maxWidth: "70%" }}
          >
            <Card.Body>
              <Card.Title className="text-primary fw-bold fs-4">
                {booking.tourName}
              </Card.Title>

              <Card.Text className="mb-0">
                <strong>Full Name:</strong> {booking.fullName}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong>Email:</strong> {booking.userEmail}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong>Phone:</strong> {booking.phone}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong>Guests:</strong> {booking.guestSize}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong>Travel Date:</strong> {formatDate(booking.bookAt)}
              </Card.Text>
              <Card.Text className="mb-0">
                <strong>Booked On:</strong> {formatDate(booking.createdAt)}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default ViewBookings;
