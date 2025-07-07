// src/components/BookingModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { FiCalendar, FiPhone, FiUsers } from "react-icons/fi";
import { MdEmail, MdOutlinePerson } from "react-icons/md";
import { BASE_URL } from "../../../utils/constants";
const BookingModal = ({ show, closeModal, tourName }) => {
  // ---------- form state ----------
  const [form, setForm] = useState({
    userEmail: "",
    tourName: tourName ?? "",
    fullName: "",
    guestSize: 1,
    phone: "",
    bookAt: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // ---------- handlers ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/booking/`,
        { ...form },
        { withCredentials: true }
      );
      setSuccess(true);
    } catch (err) {
      console.error("Error booking tour:", err);
      setError("Failed to book the tour. Please try again later.");
    }
  };

  // ---------- auto-close on success ----------
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        closeModal();
        setSuccess(false);
        setForm({
          userEmail: "",
          tourName: tourName ?? "",
          fullName: "",
          guestSize: 1,
          phone: "",
          bookAt: "",
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, closeModal, tourName]);

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Form onSubmit={handleSubmit}>
        {!success ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Book Your Trip</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* User Email */}
              <Form.Group className="mb-3" controlId="bookingEmail">
                <Form.Label>
                  <MdEmail className="me-1" />
                  Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="userEmail"
                  value={form.userEmail}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </Form.Group>

              {/* Full Name */}
              <Form.Group className="mb-3" controlId="bookingName">
                <Form.Label>
                  <MdOutlinePerson className="me-1" />
                  Full Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </Form.Group>

              {/* Tour (read-only) + Guests */}
              <Row className="mb-3">
                <Col md={8}>
                  <Form.Group controlId="bookingTour">
                    <Form.Label>Tour</Form.Label>
                    <Form.Control
                      type="text"
                      name="tourName"
                      value={form.tourName}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="bookingGuests">
                    <Form.Label>
                      <FiUsers className="me-1" />
                      Guests
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="guestSize"
                      min="1"
                      value={form.guestSize}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Phone */}
              <Form.Group className="mb-3" controlId="bookingPhone">
                <Form.Label>
                  <FiPhone className="me-1" />
                  Phone
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91‑98765‑43210"
                  required
                />
              </Form.Group>

              {/* Date */}
              <Form.Group className="mb-1" controlId="bookingDate">
                <Form.Label>
                  <FiCalendar className="me-1" />
                  Travel Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="bookAt"
                  value={form.bookAt}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Modal.Body>

            {error && (
              <Alert variant="danger" className="mx-3">
                {error}
              </Alert>
            )}

            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Confirm Booking
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Booking Confirmed!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center py-4">
              <div
                style={{
                  fontSize: "4rem",
                  color: "#FF385C", // Airbnb pink
                }}
              >
                ✅
              </div>
              <p className="mt-3 fs-5">
                Your trip has been booked successfully!
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={closeModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default BookingModal;
