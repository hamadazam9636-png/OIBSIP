import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Menu from "./Menu";
import PizzaBuilder from "../components/pizza/PizzaBuilder";
import WhyChoose from "../components/WhyChoose";
import HowItWorks from "../components/HowItWorks";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
function Home() {
  return (
    <main className="min-h-screen bg-dark-950 text-pizza-cream">
      <Navbar />

      <Hero />

      <Menu  limit={8}/>

      <PizzaBuilder />

      <WhyChoose/>

      <HowItWorks/>

      <FinalCTA/>

      <Footer/>
    </main>
  );
}

export default Home;