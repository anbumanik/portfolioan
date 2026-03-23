import React from "react";
import { motion } from "framer-motion";
import { projects } from "../assets/projectConfig";
import BlurText from "./animations/BlurText";

export default function Projects() {
  // Duplicate for seamless scroll
  const duplicatedProjects = [...projects, ...projects];

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
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(calc((var(--card-width) + var(--card-gap)) * -${projects.length}), 0, 0); }
        }
        .marquee-container {
          will-change: transform;
          display: flex;
          gap: var(--card-gap);
          padding: 20px 0;
          animation: marquee ${projects.length * 15}s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused !important;
        }
        .project-card-inner {
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }
        .project-card:hover .project-card-inner {
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

      {/* Infinite Auto-Sliding Container */}
      <div style={{ display: "flex", width: "100%", overflow: "hidden", position: "relative" }}>
        <div
          className="marquee-container"
        >
          {duplicatedProjects.map((proj, idx) => (
            <div
              key={idx}
              className="project-card"
              style={{ perspective: 1200, width: "var(--card-width)", height: "var(--card-height)", flexShrink: 0 }}
            >
              <div
                className="project-card-inner"
                style={{
                  width: "100%", height: "100%", position: "relative"
                }}
              >
                {/* ─── FRONT SIDE ─── */}
                <div style={{
                  position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden",
                  background: "#141414", borderRadius: 16, border: "1px solid #222", overflow: "hidden",
                  display: "flex", flexDirection: "column", transform: "translate3d(0,0,0)"
                }}>
                  {/* Image fills the entire card front */}
                  <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
                    <img
                      src={proj.images[0]}
                      alt={proj.title}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)"
                    }} />
                  </div>
                  
                  {/* Text content overlayed at the bottom */}
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
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
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
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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

