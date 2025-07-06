import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ---------- helpers ---------- */
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d", // 15‑day session
  });

//only returns when the response is success
const sendAuthResponse = (user, res, statusCode = 200) => {
  const token = generateToken(user);

  const { _id: userId, username, email, role } = user._doc;

  return res
    .cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // Set to true if using HTTPS in production
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    })
    .status(statusCode)
    .json({
      success: true,
      data: {
        userId,
        username,
        email,
      },
      role,
    });
};

/* ---------- registration ---------- */
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Handler invoked");

  console.log(username, email, password);

  try {
    const user = await User.register(username, email, password);
    console.log("User created");
    sendAuthResponse(user, res);
    console.log("Response send");
  } catch (error) {
    console.log("Error", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------- login ---------- */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    sendAuthResponse(user, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------- logout ---------- */
export const logout = (req, res) => {
  console.log("Logout handler");

  res
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully!" });
};
