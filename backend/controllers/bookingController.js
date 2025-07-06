import Booking from "../models/Booking.js";

// create new booking
export const createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user.id,
    };

    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

// get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);
    res.status(200).json({
      success: true,
      message: "booking found",
      data: book,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "booking not found" });
  }
};

// get all booking
export const getAllBooking = async (req, res) => {
  try {
    const books = await Booking.find(id);
    res.status(200).json({
      success: true,
      message: "booking found",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server errr" });
  }
};
