import { createPaste } from "@/lib/pastes";

export async function POST(request: Request) {
  var data = await request.json();
  const content = data.content;
  const id = data.id;
  const user_id = data.user_id
  const anonymous = data.anonymous
  data = { content: content, user_id: user_id, id: id, anonymous: anonymous}
  const paste = await createPaste(data);
  return Response.json(paste);
}
