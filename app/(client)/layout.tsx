
import Footer from "@/components/landing/footer";
import Navbar from "@/components/landing/navbar";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
        <div>
          <Navbar/>
          <main>{children}</main>
          <Footer/>
        </div>
    </>
  );
};

export default Layout;
