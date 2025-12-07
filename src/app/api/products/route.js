import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongodb.js";
import Product from "@/models/Product.js";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find();
  return NextResponse.json({ products });
}
