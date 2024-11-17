import { Footer } from "@/components/footer";
import { Header } from "@/components/header";


interface ProtectedLayoutProps {
    children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
    return (
        <>
        <Header />
        <div className="grid flex-1 pt-16">
            {children}
        </div>
        <Footer />
        </>
    );
}

export default ProtectedLayout;