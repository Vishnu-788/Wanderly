import Booking from "../models/Booking.js";

// create new booking
export const createBooking = async (req, res) => {
  try {
    const bookingData = {
      ...req.body,
      userId: req.user.id,
    };
    console.log("Booking called");

    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

    res.status(200).json({
      success: true,
      message: "your tour is booked",
      data: savedBooking,
    });
  } catch (err) {
    console.log("Error in createBooking: ", err);

    res.status(500).json({ success: false, message: "internal server error" });
  }
};

// get single booking
export const getBooking = async (req, res) => {
  const userId = req.params.id;
  try {
    const bookings = await Booking.find({ userId: userId });
    res.status(200).json({
      success: true,
      message: "booking found",
      data: bookings,
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
