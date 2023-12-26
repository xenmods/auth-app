import Actions from "@/app/(main)/_components/actions";
import Link from "next/link";

export async function Navbar () {
    return (
        <nav className="top-0 sm:top-4 rounded-none sm:rounded-full border-b sm:border bg-slate-50/30 dark:bg-black/30 border-solid  border-gray-200/60 dark:border-gray-400/10 px-2 py-2 sm:p-2 sm:py-0 z-50 backdrop-blur-md w-full m-auto max-w-3xl flex justify-between items-center sticky">
          <div className="py-3 flex justify-between">
            <Link className="ml-3"
            href={"/"}>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-white">Sticky</span>
            </Link>
          </div>
          <div className="py-3 flex justify-between">
          <div className="sm:mr-1 flex flex-row items-center">
            <Actions />
            </div>
          </div>
        </nav>
      );
}
export default Navbar;