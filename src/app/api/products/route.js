import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb.js";
import Product from "@/models/Product.js";

export async function GET() {
  try {
    await connectToDatabase();

    const products = await Product.find();

    return NextResponse.json({ products }, { status: 200 });
  } catch (err) {
    console.error("PRODUCTS API ERROR:", err);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

