import React, { useState, useEffect, useRef } from "react";
import { motion, animate } from "framer-motion";
import { Link } from "react-router-dom";
import { projects } from "../assets/projectConfig"; // Import local projects
import BlurText from "./animations/BlurText";
// import Folder from "./animations/Folder";
import { heroImages } from "../assets/heroImage";


const NAV_LINKS = ["About", "Projects", "Services", "Contact"];

const SOCIAL_ICONS = {
  GH: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  LI: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  TW: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  IG: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
};

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(100);
  const [instaFollowers, setInstaFollowers] = useState(0);
  const [instaImage, setInstaImage] = useState("https://ik.imagekit.io/g1241mexj/WhatsApp%20Image%202026-03-21%20at%201.32.40%20PM.jpeg"); // Example from projectConfig

  useEffect(() => {
    let fAnim;
    let pAnim;

    const runStats = () => {
       // 1. Static Targets
       const pTarget = projects.length;
       const fTarget = 1002; // Static local value

       // 2. Start Animations Together
       pAnim = animate(100, pTarget, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate: (v) => setDisplayCount(Math.floor(v))
       });
       fAnim = animate(0, fTarget, {
          duration: 2.2,
          ease: "easeOut",
          onUpdate: (v) => setInstaFollowers(Math.floor(v))
       });
    };

    runStats();

    return () => {
       if (pAnim) pAnim.stop();
       if (fAnim) fAnim.stop();
    };
  }, []);



  return (
    <section style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* ─── TOP HEADER BAND ─── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 32px", borderBottom: "1px solid #222", position: "relative", zIndex: 10
      }}>
        {/* PRO Portfolio badge */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{
              background: "#0F0F0F", border: "1px solid #2A2A2A", borderRadius: 12,
              padding: "10px 24px", display: "flex", alignItems: "center", gap: 10,
              cursor: "pointer"
            }}
            whileHover={{ scale: 1.05, borderColor: "#D4A853" }}
          >
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 22, color: "#fff", letterSpacing: "-0.5px"
            }}>PRO</span>
            <span style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 22,
              background: "linear-gradient(135deg,#F0C96B,#D4A853)", WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>Portfolio</span>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 500, fontSize: 14,
              color: "#aaa", textDecoration: "none", letterSpacing: 1,
              textTransform: "uppercase", transition: "color 0.2s"
            }}
              onMouseEnter={e => e.target.style.color = "#D4A853"}
              onMouseLeave={e => e.target.style.color = "#aaa"}
            >{link}</a>
          ))}
          <a href="#contact" style={{
            background: "linear-gradient(135deg,#D4A853,#A87D2E)", color: "#fff",
            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 13,
            padding: "9px 22px", borderRadius: 30, textDecoration: "none",
            letterSpacing: 0.5, boxShadow: "0 4px 16px rgba(212,168,83,0.3)"
          }}>Hire Me</a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            width: 40, height: 40, display: "none", alignItems: "center", justifyContent: "center"
          }}
        >
          <div style={{ position: "relative", width: 24, height: 14 }}>
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 2, background: "#D4A853", borderRadius: 2 }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ position: "absolute", top: 6, left: 0, width: "100%", height: 2, background: "#D4A853", borderRadius: 2 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 2, background: "#D4A853", borderRadius: 2 }}
            />
          </div>
        </button>

        {/* Mobile Sidebar & Backdrop */}
        <motion.div
          initial={false}
          animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "all" : "none" }}
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(8px)", zIndex: 90
          }}
        />

        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: menuOpen ? 0 : "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          style={{
            position: "fixed", top: 0, right: 0, bottom: 0, width: "300px",
            background: "#0F0F0F", borderLeft: "1px solid #222",
            padding: "80px 40px", display: "flex", flexDirection: "column", gap: 32, zIndex: 100,
            boxShadow: "-10px 0 40px rgba(0,0,0,0.5)"
          }}
        >
          {/* Sidebar Header with Close Icon */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#D4A853", letterSpacing: 3, textTransform: "uppercase" }}>Navigation</span>
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.3)",
                width: 36, height: 36, borderRadius: "50%", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", color: "#D4A853"
              }}
            >
              <span style={{ fontSize: 20, fontWeight: 300 }}>✕</span>
            </button>
          </div>

          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 24,
                color: "#fff", textDecoration: "none", textTransform: "uppercase", letterSpacing: -0.5
              }}
            >{link}</a>
          ))}

          <div style={{ marginTop: "auto", borderTop: "1px solid #222", paddingTop: 32 }}>
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{
              background: "linear-gradient(135deg,#D4A853,#A87D2E)", color: "#fff",
              fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 16,
              padding: "16px", borderRadius: 12, textDecoration: "none", textAlign: "center", display: "block",
              boxShadow: "0 8px 24px rgba(212,168,83,0.3)"
            }}>Hire Me Now</a>

            <div style={{ display: "flex", gap: 24, marginTop: 32, justifyContent: "center", opacity: 0.9 }}>
              {[
                { type: "GH", href: "https://github.com/anbumanik" },
                { type: "LI", href: "https://www.linkedin.com/in/anbumani07" },
                { type: "TW", href: "https://twitter.com" },
                { type: "IG", href: "https://www.instagram.com/mr_anbu_07___?utm_source=qr&igsh=MWpvMDUwd2M3bWw3aA==" }
              ].map(s => (
                <motion.a
                  key={s.type}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.2, color: "#D4A853" }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    color: "#888",
                    textDecoration: "none",
                    transition: "color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {SOCIAL_ICONS[s.type]}
                </motion.a>
              ))}
            </div>

          </div>
        </motion.div>
      </div>

      {/* ─── HERO BODY ─── */}
      <div className="hero-grid" style={{
        minHeight: "calc(100vh - 73px)",
        alignItems: "center", padding: "60px 48px 0", gap: 32, position: "relative"
      }}>

        {/* LEFT — Text Content */}
        <div style={{ position: "relative", zIndex: 5 }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.3)",
              borderRadius: 30, padding: "6px 16px", marginBottom: 24
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#D4A853", boxShadow: "0 0 8px #D4A853" }} />
            <span style={{ color: "#D4A853", fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
              Available for Work
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 900,
              fontSize: "clamp(52px, 6vw, 88px)", lineHeight: 1.0,
              margin: "0 0 12px", color: "#fff", letterSpacing: "-2px"
            }}
          >
            <BlurText text="SOFTWARE" delay={100} />
            <BlurText
              text="ENGINEER"
              delay={300}
              style={{
                background: "linear-gradient(135deg,#F0C96B 0%,#D4A853 50%,#A87D2E 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 17, color: "#888",
              lineHeight: 1.7, maxWidth: 460, margin: "16px 0 36px", fontWeight: 400
            }}
          >
            A multi-disciplinary Software Engineer crafting scalable web apps, high-conversion digital marketing strategies, and premium graphic designs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
          >
            <a href="#projects" style={{
              background: "linear-gradient(135deg,#D4A853,#A87D2E)", color: "#fff",
              fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15,
              padding: "14px 32px", borderRadius: 50, textDecoration: "none",
              boxShadow: "0 8px 24px rgba(212,168,83,0.35)"
            }}>View Projects</a>
            <a href="#contact" style={{
              background: "transparent", color: "#D4A853",
              fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 15,
              padding: "14px 32px", borderRadius: 50, textDecoration: "none",
              border: "1px solid rgba(212,168,83,0.4)"
            }}>Get In Touch</a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{
              display: "flex", gap: "clamp(24px, 6vw, 48px)", marginTop: 48, paddingTop: 32,
              borderTop: "1px solid #222", justifyContent: "flex-start", flexWrap: "wrap", alignItems: "center"
            }}
          >
            {/* Projects Stats */}
            <div style={{ minWidth: 80 }}>
              <div style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 32,
                background: "linear-gradient(135deg,#F0C96B,#D4A853)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>{displayCount}+</div>
              <div style={{ color: "#666", fontSize: 12, fontWeight: 500, letterSpacing: 1 }}>Projects Completed</div>
            </div>

            {/* Instagram Stats */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
               <div style={{
                 width: 62, height: 62, borderRadius: "50%",
                 border: "2px solid #D4A853", overflow: "hidden",
                 padding: 3, background: "rgba(212,168,83,0.1)",
                 boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
               }}>
                 <img src={instaImage} alt="IG" style={{ width: '100%', height: '100%', borderRadius: "50%", objectFit: "cover" }} />
               </div>
               <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 24,
                    color: "#fff", lineHeight: 1
                  }}>{instaFollowers}</div>
                  <div style={{ color: "#D4A853", fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", marginTop: 4 }}>Followers</div>
               </div>
            </div>
          </motion.div>

        </div>

        {/* RIGHT — Sliding Images (Replacing Folder) */}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 500, paddingTop: 80, width: "100%" }}>
          {/* Glow behind images */}
          <div style={{
            position: "absolute", width: "120%", height: "120%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)"
          }} />

          <div style={{ position: "relative", width: "100%", height: "400px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {heroImages.map((img, i) => {
              // 2 from right (indices 0, 1), 2 from left (indices 2, 3)
              const isFromRight = i < 2;
              return (
                <motion.div
                  key={i}
                  initial={{
                    x: isFromRight ? 1000 : -1000,
                    opacity: 0,
                    rotate: isFromRight ? 20 : -20
                  }}
                  animate={{
                    x: (i - 1.5) * 50, // Slight horizontal stagger in center
                    y: (i % 2 === 0 ? -30 : 30), // Slight vertical stagger
                    opacity: 1,
                    rotate: (i - 1.5) * 8 // fan out effect
                  }}
                  transition={{
                    delay: 0.5 + (i * 0.15),
                    duration: 1.2,
                    type: "spring",
                    stiffness: 60,
                    bounce: 0.3
                  }}
                  whileHover={{
                    scale: 1.1,
                    zIndex: 50,
                    rotate: 0,
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    position: "absolute",
                    width: "clamp(200px, 20vw, 280px)",
                    height: "clamp(250px, 25vw, 350px)",
                    background: "rgba(15, 15, 15, 0.4)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(212,168,83,0.25)",
                    borderRadius: "24px",
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    cursor: "pointer",
                    zIndex: i
                  }}
                >
                  <img
                    src={img}
                    alt={`Expertise ${i}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))"
                    }}
                  />

                  {/* Decorative corner accent */}
                  <div style={{
                    position: "absolute", top: 15, right: 15, width: 8, height: 8,
                    borderRadius: "50%", background: "#D4A853", opacity: 0.5
                  }} />
                </motion.div>
              );
            })}
          </div>

          {/* Floating labels to prompt interaction */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", color: "#666", fontSize: 12, fontWeight: 600, letterSpacing: 1, whiteSpace: "nowrap" }}
          >
            HOVER TO EXPLORE MY SKILLS
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Hero);