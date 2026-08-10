import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import Navbar from "@/components/landing/navbar";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Ecommerce | Home",
  description: "Ecommerce app",

};

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Header/>
      <Footer/>
    </main>
  );
}
