import mongoose from "mongoose";

// Connects to MongoDB using the MONGODB_URI environment variable.
// The server should not start silently without a database connection,
// so we fail loudly and exit if something is wrong.
export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      "Missing MONGODB_URI environment variable. " +
        "Copy server/.env.example to server/.env and set your MongoDB Atlas connection string."
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
}
