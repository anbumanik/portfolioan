import Background3D from "../components/animations/Background3D";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";

import CreativeSolutions from "../components/CreativeSolutions";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SplashCursor from "../components/animations/SplashCursor";

export default function Portfolio() {
  return (
    <div className="portfolio-frame noise-bg">
      <SplashCursor
        SIM_RESOLUTION={64}
        DYE_RESOLUTION={512}
        PRESSURE_ITERATIONS={10}
        DENSITY_DISSIPATION={3}
        VELOCITY_DISSIPATION={2}
        SPLAT_RADIUS={0.15}
      />
      <Background3D />
      <div className="portfolio-inner">
        <Hero />
        <About />
        <Projects />
        <CreativeSolutions />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
