import { auth } from "@/auth";
import AdminHeader from "@/components/adminHeader";
import Sidebar from "@/components/side-bar";
import { SessionProvider } from "next-auth/react";


interface ProtectedLayoutProps {
    children: React.ReactNode;
};

export default async function ProtectedLayout ({ children }: ProtectedLayoutProps){
    const session = await auth();
    return (
        <div className="flex bg-indigo-50">
            <SessionProvider session={session}>
            <div className="w-80 bg-white py-5 "><Sidebar /></div>
            <div className="w-full">
                <AdminHeader  />
                {children}
            </div>
            </SessionProvider>
        </div>
    );
}

