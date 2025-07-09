import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { FiCalendar, FiPhone, FiUsers } from "react-icons/fi";
import { MdEmail, MdOutlinePerson } from "react-icons/md";
import { BASE_URL } from "../../../utils/constants";
import BookingSuccess from "./BookingSuccess";
import { useSelector } from "react-redux";

const BookingModal = ({ show, closeModal, tourName }) => {
  const user = useSelector((state) => state.auth.user);

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
  const [loading, setLoading] = useState(false);

  // Auto-fill name & email from Redux user when modal opens
  useEffect(() => {
    if (user && show) {
      setForm((prev) => ({
        ...prev,
        userEmail: user.email || "",
        fullName: user.fullName || "",
      }));
    }
  }, [user, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numeric = value.replace(/\D/g, "");
      if (numeric.length <= 10)
        setForm((prev) => ({ ...prev, phone: numeric }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/booking/`, form, { withCredentials: true });
      setSuccess(true);
    } catch (err) {
      console.error("Error booking tour:", err);
      setError("Failed to book the tour. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

            <fieldset disabled={loading} style={{ border: 0, margin: 0 }}>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>
                    <MdEmail className="me-1" /> Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="userEmail"
                    value={form.userEmail}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    <MdOutlinePerson className="me-1" /> Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Row className="mb-3">
                  <Col md={8}>
                    <Form.Group>
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
                    <Form.Group>
                      <Form.Label>
                        <FiUsers className="me-1" /> Guests
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

                <Form.Group className="mb-3">
                  <Form.Label>
                    <FiPhone className="me-1" /> Phone
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    pattern="[6-9]{1}[0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FiCalendar className="me-1" /> Travel Date
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
            </fieldset>

            {error && (
              <Alert variant="danger" className="mx-3">
                {error}
              </Alert>
            )}

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={closeModal}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    Confirming…{" "}
                    <Spinner animation="border" size="sm" className="ms-2" />
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <BookingSuccess />
        )}
      </Form>
    </Modal>
  );
};

export default BookingModal;
