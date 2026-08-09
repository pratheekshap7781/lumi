import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // We never store the raw password — only its bcrypt hash.
    // `select: false` means this field is left out of query results
    // by default, so it can't accidentally end up in an API response.
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically adds and manages createdAt / updatedAt fields
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
