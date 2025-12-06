import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/src/models/User";
import { connectToDatabase } from "@/src/lib/mongodb";
import { signToken } from "@/src/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });

    const token = signToken(user);

    const response = NextResponse.json({
      message: "Login successful",
      role: user.role
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/"
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
