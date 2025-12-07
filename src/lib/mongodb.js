import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return;

  const uri = process.env.MONGODB_URI;

  if (!uri) throw new Error("Missing MONGODB_URI");

  await mongoose.connect(uri);
};
