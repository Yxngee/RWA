import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const token = req.cookies.get("token")?.value;
    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    const { items, total } = await req.json();
    await connectToDatabase();

    const order = await Order.create({
      userId: user.id,
      items,
      total
    });

    return NextResponse.json({ message: "Order created", order });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}
