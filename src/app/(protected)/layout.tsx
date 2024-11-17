import { Header } from "@/components/header";
import { Navbar } from "./_components/navbar";
import { Footer } from "@/components/footer";

interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <>
        <Header />
        <Navbar />
        <div className="grid flex-1 pt-16">
            {children}
        </div>
        <Footer />
        </>
    );
}

export default ProtectedLayout;