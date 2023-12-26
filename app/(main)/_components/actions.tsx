import { currentUser, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import {Folder} from "lucide-react"

export const Actions = async () => {
    const user = await currentUser();
    return (
        <div>
            {user ?
            <div className="mr-3 flex flex-row items-center">
                        <Link
                        href={"/stickies"}>
                          <button className="mr-3 px-2 py-1 text-black bg-white text-xs rounded-lg hover:bg-black hover:text-white focus:outline-none transition-all">
                            My Stickies
                        </button>
                        </Link>
            <UserButton afterSignOutUrl="/"/> </div> :
              <SignInButton>
            <button className="px-4 py-2 text-black bg-white text-sm rounded-full hover:bg-black hover:text-white focus:outline-none transition-all">
              Sign In
            </button>
            </SignInButton> 
            }
        </div>
    );
    }
export default Actions;