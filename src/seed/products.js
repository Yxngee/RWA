
// Load environment variables
import dotenv from "dotenv";
dotenv.config({ path: "C:/RWA/.env.local" });

// Load MongoDB connection + Product model
import { connectToDatabase } from "../lib/mongodb.js";
import Product from "../models/Product.js";

async function seedProducts() {
  try {
    console.log("Using MONGODB_URI:", process.env.MONGODB_URI);

    await connectToDatabase();

    console.log("Clearing existing products...");
    await Product.deleteMany();

    console.log("Inserting new products...");
    await Product.insertMany([
      {
        title: "Big Mac",
        description: "Two beef patties with Big Mac sauce.",
        price: 5.99,
        imageUrl: "https://mcdonalds.com/bigmac.jpg"
      },
      {
        title: "McChicken",
        description: "Crispy chicken sandwich with mayo.",
        price: 4.49,
        imageUrl: "https://mcdonalds.com/mcchicken.jpg"
      },
      {
        title: "Large Fries",
        description: "Golden crispy McDonald's fries.",
        price: 2.99,
        imageUrl: "https://mcdonalds.com/fries.jpg"
      },
      {
        title: "Chicken Nuggets (10pc)",
        description: "10 crispy chicken nuggets.",
        price: 4.99,
        imageUrl: "https://mcdonalds.com/nuggets.jpg"
      }
    ]);

    console.log("🌟 Products successfully inserted!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seedProducts();
