import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { StickyNote } from "lucide-react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
  });

function Logo() {
    return ( <div className="flex flex-col items-center gap-y-4">
    <div className="rounded-full p-1">
    <StickyNote className="w-[80px] h-[80px]" />
    </div>
    <div className={cn(
      "flex flex-col items-center",
      font.className,
    )}>
      <p className="text-xl font-semibold">
        Sticky
      </p>
      <p className="text-sm text-muted-foreground">
        A Markdown Editor
      </p>
    </div>
  </div> );
}

export default Logo;