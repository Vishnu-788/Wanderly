import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  // const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });

  try {
    const savedReview = await newReview.save();

    // after creating a new review now update the review array of the tour
    await Tour.findByIdAndUpdate(savedReview.tourId, {
      $push: { reviews: savedReview._id },
    });

    res
      .status(201)
      .json({ success: true, message: "Review submitted", data: savedReview });
  } catch (err) {
    console.log("Error in creating review:", err);

    res.status(500).json({ success: false, message: "Review not submitted" });
  }
};

export const getReviews = async (req, res) => {
  const tourId = req.params.tourId;

  try {
    const reviews = await Review.find({ tourId: tourId });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching reviews.",
      error: err.message,
    });
  }
};
