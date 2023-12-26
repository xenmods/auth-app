import { getPaste } from "@/lib/pastes"
import Navbar from '@/app/(main)/_components/Navbar';
import { Editor as NovelEditor } from "novel-without-ai";

export default async function Editor({ params }: { params: { paste: string } }) {
    const paste = await getPaste(params.paste)
    var content = null;
    if (!paste) {
      content = {"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Sticky not found :/"}]},{"type":"paragraph"}]}
    } else {
        content = JSON.parse(paste.content)
    }
    
    
  return (
    <>
  <Navbar />
  <div className='m-3 mt-10 flex flex-col items-center'>
    <div className="relative w-full max-w-screen-lg">
    <NovelEditor
        className="w-full h-screen mt-5"
        defaultValue={content}
        disableLocalStorage={true}
    />
    </div>
    </div>
        </>
  );
}