export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    return Response.json({ message: `Hello ${name || "World"}!` });
}