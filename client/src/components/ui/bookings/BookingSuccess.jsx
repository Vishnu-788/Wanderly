import React from "react";
import { Modal, Button } from "react-bootstrap";
import { MdCheckCircle } from "react-icons/md";
import { motion } from "framer-motion";
import "./bookings.css"; // custom styles for theme

const BookingSuccess = ({ closeModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Modal.Header closeButton className="booking-success-header">
        <Modal.Title className="w-100 text-center">
          Booking Confirmed!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center py-5">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.2 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10,
            duration: 0.5,
          }}
        >
          <MdCheckCircle className="success-icon" />
        </motion.div>
        <p className="mt-4 fs-5 booking-success-text">
          Your trip has been booked successfully!
        </p>
      </Modal.Body>

      <Modal.Footer className="justify-content-center">
        <Button
          variant="danger"
          onClick={closeModal}
          className="px-4 py-2 rounded-pill"
        >
          Close
        </Button>
      </Modal.Footer>
    </motion.div>
  );
};

export default BookingSuccess;
