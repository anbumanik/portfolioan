import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";
import { projects } from "../assets/projectConfig";
import BlurText from "./animations/BlurText";

export default function Projects() {
  const [flippedIndex, setFlippedIndex] = useState(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Triple projects for infinite illusion
  const duplicatedProjects = [...projects, ...projects, ...projects];
  const cardWidth = 350;
  const cardGap = 32;
  const singleSetWidth = projects.length * (cardWidth + cardGap);

  useAnimationFrame((t, delta) => {
    if (isHovered || isDragging) return;
    
    // Smoothly scroll
    let currentX = x.get();
    currentX -= 0.5; // adjust speed here
    
    // Reset for infinite loop
    if (currentX <= -singleSetWidth) {
      currentX += singleSetWidth;
    }
    x.set(currentX);
  });

  return (
    <section id="projects" style={{ padding: "clamp(60px, 10vw, 100px) 0", background: "#0D0D0D", overflow: "hidden" }}>
      <style>{`
        :root {
          --card-width: 350px;
          --card-height: 460px;
          --card-gap: 32px;
          --card-padding: 20px;
          --card-img-height: 130px;
        }
        @media (max-width: 768px) {
          :root {
            --card-width: 280px;
            --card-height: 380px;
            --card-gap: 20px;
            --card-padding: 16px;
            --card-img-height: 100px;
          }
        }
        
        .project-card-inner {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          position: relative;
        }

        /* Desktop Hover: Card Flips */
        @media (hover: hover) {
          .project-card:hover .project-card-inner {
            transform: rotateY(180deg);
          }
        }
        /* Mobile: Card Flips when state is active */
        .project-card.is-flipped .project-card-inner {
          transform: rotateY(180deg);
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 60, padding: "0 32px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#D4A853", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
          My Featured Work
        </div>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 4vw, 54px)",
          color: "#fff", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1
        }}>
          <BlurText text="CREATIVE" delay={100} />
          <BlurText
            text="PROJECTS"
            delay={300}
            style={{
              background: "linear-gradient(135deg,#F0C96B,#D4A853)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}
          />
        </h2>
      </div>

      {/* Infinite Draggable Slider Container */}
      <div 
        ref={containerRef}
        style={{ width: "100%", overflow: "hidden", position: "relative", cursor: "grab" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          drag="x"
          style={{ 
            x, 
            display: "flex", 
            gap: "var(--card-gap)", 
            width: "max-content", 
            padding: "20px 0" 
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(event, info) => {
            setIsDragging(false);
            // Handle loop reset after drag
            let currentX = x.get();
            if (currentX > 0) x.set(currentX - singleSetWidth);
            if (currentX < -singleSetWidth * 2) x.set(currentX + singleSetWidth);
          }}
          dragElastic={0.05}
          whileTap={{ cursor: "grabbing" }}
        >
          {duplicatedProjects.map((proj, idx) => (
            <div
              key={idx}
              className={`project-card ${flippedIndex === idx ? "is-flipped" : ""}`}
              onClick={() => {
                setFlippedIndex(flippedIndex === idx ? null : idx);
              }}
              style={{ perspective: 1200, width: "var(--card-width)", height: "var(--card-height)", flexShrink: 0 }}
            >
              <div className="project-card-inner">
                {/* ─── FRONT SIDE ─── */}
                <div style={{
                  position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
                  background: "#141414", borderRadius: 16, border: "1px solid #222", overflow: "hidden",
                  display: "flex", flexDirection: "column", transform: "translate3d(0,0,0)"
                }}>
                  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
                    <img
                      src={proj.images[0]}
                      alt={proj.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)"
                    }} />
                  </div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 20px", zIndex: 1 }}>
                    <h3 style={{
                      color: "#fff", fontSize: 20, fontWeight: 900, fontFamily: "'Outfit', sans-serif", margin: 0,
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)"
                    }}>
                      {proj.title}
                    </h3>
                    <div style={{ marginTop: 10, fontSize: 11, color: "#D4A853", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                      View Details 
                      <span style={{ fontSize: 16 }}>→</span>
                    </div>
                  </div>
                </div>

                {/* ─── BACK SIDE ─── */}
                <div style={{
                  position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
                  background: "#1A1A1A", borderRadius: 16, border: "1px solid #D4A853", overflow: "hidden",
                  transform: "rotateY(180deg) translate3d(0,0,0)", display: "flex", flexDirection: "column", padding: "var(--card-padding)"
                }}>
                  <div style={{ height: "var(--card-img-height)", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
                    <img
                      src={proj.images[1] || proj.images[0]}
                      alt={proj.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }}
                    />
                  </div>
                  <h3 style={{ color: "#D4A853", fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{proj.title}</h3>
                  <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6, marginBottom: 16, flexShrink: 0, overflow: "hidden", maxHeight: "72px" }}>
                    {proj.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {proj.tech.map(t => (
                      <span key={t} style={{
                        fontSize: 10, fontWeight: 700, background: "rgba(212,168,83,0.15)",
                        color: "#D4A853", padding: "4px 10px", borderRadius: 4, textTransform: "uppercase"
                      }}>{t}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, borderTop: "1px solid #2A2A2A", paddingTop: 16, marginTop: "auto" }}>
                    <a
                      href={proj.liveLink} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1, textDecoration: "none", display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 6,
                        background: "linear-gradient(135deg, #F0C96B, #D4A853)",
                        color: "#ffffff", fontWeight: 800, fontSize: 12,
                        padding: "9px 12px", borderRadius: 8,
                        boxShadow: "0 4px 14px rgba(212,168,83,0.35)",
                        letterSpacing: 0.5
                      }}
                    >
                      Live Demo
                    </a>
                    <a
                      href={proj.githubLink} target="_blank" rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        flex: 1, textDecoration: "none", display: "flex", alignItems: "center",
                        justifyContent: "center", gap: 6,
                        background: "#161b22", color: "#e6edf3",
                        fontWeight: 700, fontSize: 12,
                        padding: "9px 12px", borderRadius: 8,
                        border: "1px solid #30363d",
                        letterSpacing: 0.5
                      }}
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Simplified background text layer for performance */}
      <div style={{
        width: "100%",
        overflow: "hidden",
        background: "#0D0D0D",
        padding: "40px 0",
        position: "relative",
        zIndex: 1
      }}>
        <style>{`
          @keyframes textMarquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .text-marquee-inner {
            display: flex;
            white-space: nowrap;
            animation: textMarquee 60s linear infinite;
            width: fit-content;
            will-change: transform;
          }
        `}</style>
        <div className="text-marquee-inner" style={{
          fontSize: "clamp(12px, 1.2vw, 16px)",
          color: "#D4A853",
          opacity: 0.3,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 4
        }}>
          {Array(4).fill(projects.map(p => p.title).join("   ✦   ")).map((t, i) => (
            <span key={i} style={{ paddingRight: "100px" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
