import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order.js";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { userEmail, items, total } = body;

    const order = await Order.create({
      userEmail,
      items,
      total
    });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

