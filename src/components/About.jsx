import { motion } from "framer-motion";
import React from "react";
import BlurText from "./animations/BlurText";


import { aboutImages } from "../assets/aboutConfig";

function About() {
  const [profile, setProfile] = React.useState(aboutImages);
  const [profileFlipped, setProfileFlipped] = React.useState(false);


  const education = [
    {
      degree: "MCA – Computer Applications",
      period: "2024-2026",
      inst: "Bharathiar University",
      result: "75% (Up to 2nd Semester)",
      icon: "🎓"
    },
    {
      degree: "B.Sc. – Computer Science",
      period: "2021-2024",
      inst: "Yadava College (Autonomous)",
      result: "64%",
      icon: "📜"
    }
  ];

  const internship = [
    {
      role: "MERN Stack Developer",
      company: "REVAMP Academy",
      period: "2026 - Present",
      icon: "💻"
    }
  ];

  const fallbackSVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'%3E%3Crect width='400' height='500' fill='%23111'/%3E%3Ccircle cx='200' cy='180' r='80' fill='%23222'/%3E%3Cpath d='M100 420 Q200 320 300 420' stroke='%23222' stroke-width='40' fill='none'/%3E%3Ctext x='50%25' y='90%25' font-family='sans-serif' font-size='20' fill='%23444' text-anchor='middle'%3EPhoto Placeholder%3C/text%3E%3C/svg%3E";

  return (
    <section id="about" style={{ padding: "80px 32px", background: "#0D0D0D" }}>
      <div className="about-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* LEFT — Profile Photos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          {/* Gold Glow behind photo */}
          <div style={{
            position: "absolute", width: "90%", height: "90%",
            background: "radial-gradient(circle, rgba(212,168,83,0.3) 0%, transparent 70%)",
            filter: "blur(40px)", top: "5%", left: "5%", zIndex: 0
          }} />

          {/* 3D Flip Card Container */}
          <motion.div
            initial="front"
            animate={profileFlipped ? "back" : "front"}
            onClick={() => setProfileFlipped(!profileFlipped)}
            onHoverStart={() => setProfileFlipped(true)}
            onHoverEnd={() => setProfileFlipped(false)}
            style={{
              position: "relative", width: "clamp(260px, 28vw, 360px)", aspectRatio: "4/5",
              perspective: 1200, zIndex: 1, cursor: "pointer"
            }}
          >
            <motion.div
              variants={{
                front: { rotateY: 0 },
                back: { rotateY: profile.image2 ? 180 : 0 }
              }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100, damping: 15 }}
              style={{
                width: "100%", height: "100%", position: "relative",
                transformStyle: "preserve-3d"
              }}
            >
              {/* FRONT FACE */}
              <div style={{
                position: "absolute", inset: 0, backfaceVisibility: "hidden",
                borderRadius: 28, overflow: "hidden", padding: 10,
                background: "#111"
              }}>
                <img src={profile.image1 || fallbackSVG} alt="Anbumani K" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 20 }} />
              </div>

              {/* BACK FACE */}
              <div style={{
                position: "absolute", inset: 0, backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: 28, overflow: "hidden", padding: 10,
                background: "#111"
              }}>
                {profile.image2 ? (
                  <img src={profile.image2} alt="Profile 2" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 20 }} />
                ) : (
                  <img src={fallbackSVG} alt="Fallback" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 20 }} />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Experience Badge */}
          <div style={{
            position: "absolute", top: 20, right: -20, background: "linear-gradient(135deg,#D4A853,#A87D2E)",
            padding: "10px 20px", borderRadius: 12, color: "#fff", fontWeight: 800, fontSize: 13,
            boxShadow: "0 8px 16px rgba(0,0,0,0.4)", zIndex: 4, transform: "rotate(3deg)"
          }}>
            Full Stack Developer
          </div>
        </motion.div>

        {/* RIGHT — Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: 32 }}
        >
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#D4A853", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
              About Me
            </div>
            <h2 style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "clamp(36px, 4vw, 54px)",
              color: "#fff", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1
            }}>
              <BlurText text="ANBUMANI K" delay={100} />
            </h2>
            <p style={{ color: "#888", fontSize: 16, lineHeight: 1.7, maxWidth: 500 }}>
              Architecting the next generation of <span style={{ color: "#D4A853", fontWeight: 700 }}>Scalable Web Applications</span>. As a performance-driven <span style={{ color: "#D4A853", fontWeight: 700 }}>Full Stack Developer</span>, I blend deep technical expertise with sophisticated design to build seamless, high-impact digital experiences.
            </p>
          </div>

          {/* Internship Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>
              Experience / Internship
            </h3>
            <div style={{ display: "grid", gap: 16 }}>
              {internship.map((job, idx) => (
                <div key={idx} className="animated-border-wrapper" style={{ borderRadius: 18 }}>
                  <div className="animated-border-inner" style={{
                    padding: "20px", borderRadius: 17, display: "flex", gap: 20, alignItems: "start",
                    width: "100%"
                  }}>
                    <div style={{ fontSize: 24, background: "rgba(212,168,83,0.1)", width: 50, height: 50, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {job.icon}
                    </div>
                    <div>
                      <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>{job.role}</h4>
                      <div style={{ color: "#D4A853", fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{job.period}</div>
                      <div style={{ color: "#777", fontSize: 13 }}>{job.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 1, textTransform: "uppercase" }}>
              Education
            </h3>
            <div style={{ display: "grid", gap: 16 }}>
              {education.map((edu, idx) => (
                <div key={idx} className="animated-border-wrapper" style={{ borderRadius: 18 }}>
                  <div className="animated-border-inner" style={{
                    padding: "20px", borderRadius: 17, display: "flex", gap: 20, alignItems: "start",
                    width: "100%"
                  }}>
                    <div style={{ fontSize: 24 }}>{edu.icon}</div>
                    <div>
                      <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: "0 0 4px" }}>{edu.degree}</h4>
                      <div style={{ color: "#D4A853", fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{edu.period} · {edu.inst}</div>
                      <div style={{ color: "#555", fontSize: 13 }}>Result: <span style={{ color: "#aaa" }}>{edu.result}</span></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#666", marginRight: 8 }}>Languages:</span>
            {["English", "தமிழ்"].map(lang => (
              <span key={lang} style={{
                background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)",
                color: "#D4A853", padding: "6px 14px", borderRadius: 50, fontSize: 12, fontWeight: 600
              }}>{lang}</span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default React.memo(About);