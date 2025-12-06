export async function GET(request) {
  return new Response(JSON.stringify({ message: "GET request OK" }), {
    status: 200,
  });
}

export async function POST(request) {
  const body = await request.json();
  return new Response(JSON.stringify({ message: "POST received", data: body }), {
    status: 200,
  });
}
