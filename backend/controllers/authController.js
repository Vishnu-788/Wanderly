import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* ---------- helpers ---------- */
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d", // 15‑day session
  });

const sendAuthResponse = (user, res, statusCode = 200) => {
  const token = generateToken(user);
  const { password, role, ...rest } = user._doc;

  return res
    .cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false, // HTTPS in prod
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    }) // cookie options :contentReference[oaicite:1]{index=1}
    .status(statusCode)
    .json({ success: true, data: { ...rest }, role });
};

/* ---------- registration ---------- */
export const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
      role: "user",
    });

    return sendAuthResponse(newUser, res, 201); // same shape as login 🚀
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again" });
  }
};

/* ---------- login ---------- */
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect email or password" });

    return sendAuthResponse(user, res);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Failed to login. Try again" });
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
