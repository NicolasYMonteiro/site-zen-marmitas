import Hero from "@/components/hero/hero";
import Services from "@/components/services/services";
import About from "@/components/about/about";
import Contact from "@/components/contact/contact";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}
