import React from "react";
import Logo from "@/app/(auth)/_components/logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full my-20 flex items-center justify-center flex-col space-y-6">
        <Logo />
        {children}
        </div>
    );
    
}
export default AuthLayout;
