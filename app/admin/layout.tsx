import Sidebar from "@/components/admin/layout/sidebar";
import Header from "@/components/admin/layout/header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex min-h-screen">
      <section className="w-70 border-r border-gray-500 pt-10  bg-green-950 min-h-screen" >
        <Sidebar />
      </section>

      <section className="w-full h-full relative">
        <Header />
        <section className="h-[calc(h-screen-64px)] top-16 z-1 overflow-y-auto">
          {children}
        </section>
      </section>
    </main>
  );
};

export default Layout;
