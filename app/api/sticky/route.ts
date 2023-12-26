import {getPaste} from "@/lib/pastes";

export async function POST(request: Request) {
    var data = await request.json();
    const id = data.id;
    const paste = await getPaste(id);
    return Response.json(paste);   
}