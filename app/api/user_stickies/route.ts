import { getPastesByUser } from "@/lib/pastes";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const pastes = await getPastesByUser("anonymous");
    return Response.json(pastes);
}

export async function POST(request: Request) {
    var data = await request.json();
    const user_id = data.user_id
    const pastes = await getPastesByUser(user_id);
    return Response.json(pastes);    
}