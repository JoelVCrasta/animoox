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
        <div className="flex bg-indigo-50" style={{width:'100vw'}}>
            <SessionProvider session={session}>
            <div className="bg-white py-5 " style={{width:'18%'}}><Sidebar /></div>
            <div style={{width:'82%'}}>
                <AdminHeader  />
                {children}
            </div>
            </SessionProvider>
        </div>
    );
}

