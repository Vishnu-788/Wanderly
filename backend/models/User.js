import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

// Static methods
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

userSchema.statics.register = async function (username, email, password, role) {
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw new Error("ALready one account is associated with this email");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: role,
  });

  return user;
};

export default mongoose.model("User", userSchema);
