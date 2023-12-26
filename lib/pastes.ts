import { currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { generateShortUUID } from "./utils";

// get a single paste from its ID
export async function getPaste(id: string) {
  return db.pastes.findUnique({
    where: { id },
  });
}

// get all pastes from a user
export async function getPastesByUser( user_id: string ) {
  // const user = await currentUser();

  return db.pastes.findMany({
    where: { userId: user_id },
  });
}

// create a new paste
export async function createPaste(data: { id: string , content: string, user_id: any, anonymous: boolean }) {
  const userID = data.anonymous ? "anonymous" : data.user_id;
//   if not user then editcode is random else user id
  const editCode = userID == "anonymous" ? generateShortUUID(8) : userID
//   hard coded for now
  // var title = data.content.split('\n')[0];
  var title = "Untitled"; 

  return db.pastes.create({
    data: {
      id: data.id,
      content: data.content,
      userId: userID,
      editCode: editCode,
      title: title
    },
  });
}

// update a paste
export async function updatePaste(id: string, data: { content: string }) {
  return db.pastes.update({
    where: { id },
    data: {
      content: data.content,
    },
  });
}