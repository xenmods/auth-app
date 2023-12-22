"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
// Import useUser() and useClerk()
import { useUser, useClerk } from "@clerk/nextjs";
// Import Next's router
import { useRouter } from "next/navigation";
// Import the Image element
import {UserRound} from "lucide-react";

export const UserButton = () => {
  // Grab the `isLoaded` and `user` from useUser()
  const { isLoaded, user } = useUser();
  // Grab the signOut and openUserProfile methods
  const { signOut, openUserProfile } = useClerk();
  // Get access to Next's router
  const router = useRouter();

  // Make sure that the useUser() hook has loaded
  if (!isLoaded) return null;
  // Make sure there is valid user data
  if (!user?.id) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex flex-row rounded-full justify-center items-center bg-white/30 dark:bg-black/30 text-black dark:text-white drop-shadow-md focus:outline-none hover:dark:bg-white hover:dark:text-black hover:transition-all border border-black/20 px-3 py-2">
          <UserRound className="mr-2 w-[20px] h-[20px]" />
          {user?.username
            ? user.username
            : user?.primaryEmailAddress?.emailAddress!}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-4 w-52 rounded-xl border border-gray-200 bg-white px-6 py-3 text-black drop-shadow-2xl">
          <DropdownMenu.Label />
          <DropdownMenu.Group className="py-1">
            <DropdownMenu.Item asChild>
              <button onClick={() => openUserProfile()} className="pb-3 hover:outline-none hover:text-blue-500">
                Profile
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
            </DropdownMenu.Item>
          </DropdownMenu.Group>
          <DropdownMenu.Separator className="my-1 h-px bg-gray-500" />
          <DropdownMenu.Item asChild>
            <button
              onClick={() => signOut(() => router.push("/"))}
              className="py-3 hover:text-red-500 hover:border-none hover:outline-none"
            >
              Sign Out{" "}
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};