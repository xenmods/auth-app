'use client';

import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Placeholder from "@tiptap/extension-placeholder";
import { Editor as NovelEditor } from "novel-without-ai";
import { Share } from "lucide-react";
import { defaultEditorContent } from "../_content/default-content";
import { generateShortUUID } from "@/lib/utils"
import { useUser } from '@clerk/nextjs';
import { useState } from "react";

const Title = Heading.extend({
  name: "heading",
  group: "heading",
  parseHTML: () => [{ tag: "h1:first-child" }],
}).configure({ levels: [1] });

const DocumentWithTitle = Document.extend({
  content: "heading block+",
});

function hasHeading(obj) {
  if (obj.content && Array.isArray(obj.content)) {
    const firstItem = obj.content[0];
    return firstItem.type === 'heading' && 'content' in firstItem;
  }
  return false;
}

export default function Editor() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [processing, setProcessing] = useState(false);

  const publishSticky = () => {
    if (processing) {
      return;
    }
    setProcessing(true);
    var perma = generateShortUUID(8);
    const user_id = user ? user.id : generateShortUUID(8);
    const anonymous = user ? false : true;
    if (hasHeading(JSON.parse(localStorage.getItem("sticky_content"))) === false) {
      var content = JSON.parse(localStorage.getItem("sticky_content"));
      content.content[0].content = [{"type":"text","text":"Untitled"}];
      localStorage.setItem("sticky_content", JSON.stringify(content));
    }
    fetch('/api/share', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id: perma,
        content: localStorage.getItem("sticky_content"),
        user_id: user_id,
        anonymous: anonymous,
      }),
    }).then((response) => response.json())
    .then((data) => {
      setProcessing(false);
      window.location.href = "/"+perma
    })
}

  return (
    <div className="w-full max-w-screen-lg">
      {processing ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <div className="flex items-center justify-center h-20 w-20 rounded-full">
            {/* <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div> */}
            <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] mx-auto"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          </div>
        </div>
      ) : null}
    <div className="relative w-full max-w-screen-lg">
      <button onClick={publishSticky} className="flex flex-row absolute right-5 top-5 z-10 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 dark:bg-white dark:text-black hover:dark:bg-secondary hover:dark:text-white transition-all ease-in-out duration-500">
        <Share className="h-4 w-4 mr-1"/> Share
      </button>
      <NovelEditor
        className="w-full h-screen mt-5"
        storageKey="sticky_content"
        defaultValue={ defaultEditorContent }
        extensions={[DocumentWithTitle, Title, Placeholder.configure({
          showOnlyCurrent: false,
          placeholder: ({ node }) => {
            if (node.type.name === "heading") {
              return "What's the title?";
            }
  
            return "What's the content?";
          },
        })]}
      />
    </div>
        </div>
  );
}