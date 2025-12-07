import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    items: [
      {
        productId: String,
        title: String,
        price: Number,
        quantity: Number
      }
    ],
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
