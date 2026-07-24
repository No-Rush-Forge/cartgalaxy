import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const LandingPage = () => {

  // Placeholder navigation handlers — wire these up to your router
  // (e.g. navigate("/login") and navigate("/register")) once routing is added.
  function goToLogin() {
    console.log("Navigate to /login");
    navigate("/login")
  }

  function goToRegister() {
    console.log("Navigate to /register");
    navigate("/register")
  }


  const { navigate } = useContext(AuthContext)

  return (
    <div className="min-h-screen">
      <Navbar onLogin={goToLogin} onGetStarted={goToRegister} />
      <main>
        <Hero onGetStarted={goToRegister} onLearnMore={() => {
          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
        }} />
        <Features />
        <HowItWorks />
        <Pricing onStartFree={goToRegister} />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


export default LandingPage