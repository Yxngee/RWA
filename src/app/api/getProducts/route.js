import { NextResponse } from "next/server";
import Product from "@/src/models/Product";
import { connectToDatabase } from "@/src/lib/mongodb";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find();
  return NextResponse.json({ products });
}
