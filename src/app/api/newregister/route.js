import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/src/models/User";
import { connectToDatabase } from "@/src/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role: "customer"
    });

    return NextResponse.json({ message: "User registered", user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
