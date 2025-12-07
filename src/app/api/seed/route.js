import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import products from "@/data/products";

export async function GET() {
  try {
    await connectToDatabase();

    // Remove old and seed new products
    await Product.deleteMany();
    await Product.insertMany(products);

    return NextResponse.json(
      {
        success: true,
        message: "Database seeded successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("SEED ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
}

