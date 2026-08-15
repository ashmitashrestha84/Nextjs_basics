import Sidebar from "@/components/admin/layout/sidebar";
import Header from "@/components/admin/layout/header";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex min-h-screen w-full">
      {/* Sidebar */}
      <section className="w-64 shrink-0 bg-green-950">
        <Sidebar />
      </section>

      {/* Main content */}
      <section className="min-w-0 flex-1">
        <Header />

        <section className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-auto">
          {children}
        </section>
      </section>
    </main>
  );
};

export default Layout;
