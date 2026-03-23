import React, { lazy, Suspense } from "react";
import Background3D from "../components/animations/Background3D";
import Hero from "../components/Hero";
import SplashCursor from "../components/animations/SplashCursor";

// Lazy-load sections below the fold
const About = lazy(() => import("../components/About"));
const Projects = lazy(() => import("../components/Projects"));
const CreativeSolutions = lazy(() => import("../components/CreativeSolutions"));
const Contact = lazy(() => import("../components/Contact"));
const Footer = lazy(() => import("../components/Footer"));

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
        <Suspense fallback={<div style={{ padding: "100px", textAlign: "center", color: "#D4A853" }}>Loading...</div>}>
          <About />
          <Projects />
          <CreativeSolutions />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
