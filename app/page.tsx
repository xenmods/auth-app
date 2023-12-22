
// import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { UserButton } from "@/components/custombutton";
import { Check } from "lucide-react";
import { currentUser } from '@clerk/nextjs';



export default async function Home() {
  const user = await currentUser();
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
      {/* <Check className="w-[80px] h-[80px]" /> */}
      <Image
        alt={user?.primaryEmailAddress?.emailAddress!}
        src={user?.imageUrl}
        width={80}
        height={80}
        className="mr-2 rounded-full border border-gray-200/20 drop-shadow-sm w-[80px] h-[80px]"
      />
      <h1 className="text-4xl font-bold text-center mb-2">Login Successful!</h1>
      <p className="text-lg text-center mb-2">You have logged in, {user?.firstName}!</p>
      <UserButton />
      </div>
    </div>
  )
}
