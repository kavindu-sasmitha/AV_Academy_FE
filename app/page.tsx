import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import ToolOrbit from "@/components/home/ToolOrbit";
import Services from "@/components/home/Services";
import Instructor from "@/components/home/Instructor";
import Packages from "@/components/home/Packages";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolOrbit />
        <Services />
        <Instructor />
        <Packages />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
