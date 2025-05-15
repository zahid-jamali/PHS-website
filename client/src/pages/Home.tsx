import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Products from "@/components/Products";
import Wholesale from "@/components/Wholesale";
import Halotherapy from "@/components/Halotherapy";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import CallToAction from "@/components/CallToAction";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <About />
      <Products />
      <Wholesale />
      <Halotherapy />
      <Testimonials />
      <Blog />
      <CallToAction />
      <Contact />
    </div>
  );
}
