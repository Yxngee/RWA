import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const city = "Dublin";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing WEATHER_API_KEY" },
        { status: 500 }
      );
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Weather fetch failed" }, { status: 500 });
  }
}
