import React from "react";
import { motion } from "framer-motion";
import BlurText from "./animations/BlurText";
import ScrollStack, { ScrollStackItem } from "./animations/ScrollStack";

/* ── Devicon CDN base ── */
const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

/* ── Skill → logo + brand glow color ── */
const LOGO_MAP = {
  "React": { src: `${DI}/react/react-original.svg`, bg: "#0C1720", glow: "#61DAFB" },
  "Next.js": { src: `${DI}/nextjs/nextjs-original.svg`, bg: "#111", glow: "#ffffff", invert: true },
  "HTML5": { src: `${DI}/html5/html5-original.svg`, bg: "#200A00", glow: "#E34F26" },
  "CSS3": { src: `${DI}/css3/css3-original.svg`, bg: "#001525", glow: "#1572B6" },
  "JavaScript": { src: `${DI}/javascript/javascript-original.svg`, bg: "#1C1700", glow: "#F7DF1E" },
  "TypeScript": { src: `${DI}/typescript/typescript-original.svg`, bg: "#001525", glow: "#3178C6" },
  "Tailwind CSS": { src: `${DI}/tailwindcss/tailwindcss-original.svg`, bg: "#001C22", glow: "#06B6D4" },
  "Bootstrap": { src: `${DI}/bootstrap/bootstrap-original.svg`, bg: "#180035", glow: "#7952B3" },
  "Node.js": { src: `${DI}/nodejs/nodejs-original.svg`, bg: "#061800", glow: "#8CC84B" },
  "Express.js": { src: `${DI}/express/express-original.svg`, bg: "#111", glow: "#cccccc", invert: true },
  "Python": { src: `${DI}/python/python-original.svg`, bg: "#001525", glow: "#3776AB" },
  "MongoDB": { src: `${DI}/mongodb/mongodb-original.svg`, bg: "#041604", glow: "#4DB33D" },
  "MongoDB Atlas": { src: `${DI}/mongodb/mongodb-original.svg`, bg: "#030F03", glow: "#4DB33D" },
  "MySQL": { src: `${DI}/mysql/mysql-original.svg`, bg: "#001A2C", glow: "#00618A" },
  "Git": { src: `${DI}/git/git-original.svg`, bg: "#1C0600", glow: "#F05032" },
  "GitHub": { src: `${DI}/github/github-original.svg`, bg: "#0D0D0D", glow: "#dddddd", invert: true },
  "Postman": { src: `${DI}/postman/postman-original.svg`, bg: "#1C0D00", glow: "#FF6C37" },
  "Canva": { src: `${DI}/canva/canva-original.svg`, bg: "#001818", glow: "#00C4CC" },
  "Adobe Photoshop": { src: `${DI}/photoshop/photoshop-original.svg`, bg: "#001A2C", glow: "#31A8FF" },
  "SEO": { emoji: "🔍", bg: "#0D1600", glow: "#A3E635" },
  "Meta Ads": { emoji: "📊", bg: "#001235", glow: "#1877F2" },
  "CapCut": { emoji: "🎬", bg: "#0A0A0A", glow: "#eeeeee" },
};

const SERVICES = [
  {
    title: "Frontend Development",
    desc: "Pixel-perfect, responsive UIs with modern frameworks and clean semantic markup.",
    tech: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "Bootstrap"],
    icon: "🎨", accent: "#61DAFB",
  },
  {
    title: "Backend Engineering",
    desc: "Robust REST APIs and server-side logic with Node.js and Python for scalable apps.",
    tech: ["Node.js", "Express.js", "Python", "TypeScript"],
    icon: "⚙️", accent: "#8CC84B",
  },
  {
    title: "Database & Cloud",
    desc: "Efficient data models and cloud-hosted databases for production applications.",
    tech: ["MongoDB", "MongoDB Atlas", "MySQL"],
    icon: "🗄️", accent: "#4DB33D",
  },
  {
    title: "Tools & Workflow",
    desc: "Professional version control, API testing, and collaborative development.",
    tech: ["Git", "GitHub", "Postman"],
    icon: "🛠️", accent: "#F05032",
  },
  {
    title: "Digital Marketing",
    desc: "Driving growth through strategic SEO and targeted Meta Ads campaigns.",
    tech: ["SEO", "Meta Ads"],
    icon: "📣", accent: "#1877F2",
  },
  {
    title: "Graphic Design",
    desc: "Stunning visuals, brand assets, social content, and short-form video edits.",
    tech: ["Canva", "Adobe Photoshop", "CapCut"],
    icon: "✏️", accent: "#00C4CC",
  },
];

/* ─── Premium 3D Skill Logo Card ─── */
function SkillLogo({ name }) {
  const info = LOGO_MAP[name] || { emoji: "⚡", bg: "#1A1A1A", glow: "#D4A853" };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <motion.div
        whileHover={{ rotateX: -20, rotateY: 15, scale: 1.12, z: 40 }}
        whileTap={{ rotateX: -20, rotateY: 15, scale: 1.12, z: 40 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        style={{
          position: "relative",
          width: 54, height: 54,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          /* ── 3D Coin Body ── */
          background: `linear-gradient(135deg, #111 0%, #050505 100%)`,

          /* ── 3D Layered Edge (Thickness) ── */
          boxShadow: `
            0 1px 0 #fff1,
            0 2px 0 ${info.glow}22,
            0 3px 0 ${info.glow}33,
            0 4px 0 ${info.glow}44,
            0 8px 16px rgba(0,0,0,0.9)
          `,

          cursor: "default",
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      >
        {/* Shine overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, ${info.glow}10 0%, transparent 70%)`,
          pointerEvents: "none"
        }} />

        {/* ── Logo Icon ── */}
        <div style={{
          transform: "translateZ(8px)",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          {info.emoji ? (
            <span style={{ fontSize: 26, lineHeight: 1 }}>{info.emoji}</span>
          ) : (
            <img
              src={info.src}
              alt={name}
              loading="lazy"
              style={{
                width: 28, height: 28,
                objectFit: "contain",
                filter: `drop-shadow(0 0 10px ${info.glow}40)`,
              }}
              onError={e => { e.target.style.display = "none"; }}
            />
          )}
        </div>
      </motion.div>

      {/* ── Pedestal Glow ── */}
      <div style={{
        width: 30, height: 3,
        background: info.glow,
        borderRadius: "50%",
        filter: "blur(5px)",
        opacity: 0.3,
        marginTop: -6,
        marginBottom: 4,
      }} />

      {/* ── Label ── */}
      <span style={{
        fontSize: 8.5,
        fontWeight: 800,
        color: "#555",
        textAlign: "center",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        maxWidth: 60,
        lineHeight: 1.2
      }}>
        {name}
      </span>
    </div>
  );
}

/* ─── Main Section ─── */
function CreativeSolutions() {
  return (
    <section style={{ padding: "64px 24px 48px", borderTop: "1px solid #1A1A1A", position: "relative", overflow: "hidden" }}>
      <div className="responsive-grid" style={{ display: "grid", gap: 48, alignItems: "start", position: "relative", zIndex: 1 }}>

        {/* Left — Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="desktop-sticky"
        >
          <div style={{
            fontSize: 11, fontWeight: 700, color: "#D4A853", letterSpacing: 3,
            textTransform: "uppercase", marginBottom: 16,
          }}>What I Do</div>

          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900,
            fontSize: "clamp(36px, 4vw, 54px)", lineHeight: 1.1,
            margin: "0 0 20px", color: "#fff", letterSpacing: "-1px",
          }}>
            <BlurText text="CREATIVE" delay={100} /><br />
            <BlurText
              text="SOLUTIONS"
              delay={300}
              style={{
                background: "linear-gradient(135deg,#F0C96B,#D4A853,#A87D2E)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            />
          </h2>

          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7 }}>
            A versatile expert specializing in full-stack web engineering, strategic digital marketing, and premium graphic design.
          </p>

          <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
            {["Full Stack Web Development", "Digital Marketing & SEO", "Pro Graphic Design", "Video Editing (CapCut)"].map(tag => (
              <div key={tag} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#D4A853" }} />
                <span style={{ color: "#aaa", fontSize: 13, fontWeight: 500 }}>{tag}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — service cards */}
        <div style={{ width: "100%", paddingBottom: "10vh" }}>
          <ScrollStack
            useWindowScroll={true}
            itemDistance={30}
            itemStackDistance={30}
            stackPosition="15%"
          >
            {SERVICES.map((svc, i) => (
              <ScrollStackItem key={svc.title} itemClassName="panel !h-auto !p-0 !rounded-[24px]">
                <div style={{ padding: "32px 24px", position: "relative", overflow: "hidden", height: "100%", borderRadius: "24px" }}>
                  {/* Accent top bar */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${svc.accent}, transparent)`,
                  }} />

                  <div style={{ fontSize: 28, marginBottom: 10, marginTop: 6 }}>{svc.icon}</div>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 15,
                    color: "#fff", margin: "0 0 8px", letterSpacing: "-0.2px",
                  }}>{svc.title}</h3>
                  <p style={{ color: "#666", fontSize: 12, lineHeight: 1.6, marginBottom: 18 }}>
                    {svc.desc}
                  </p>

                  {/* Multi-line skill grid */}
                  <div style={{
                    display: "flex", flexWrap: "wrap", gap: "10px 16px",
                    justifyContent: "flex-start", perspective: 1000,
                    marginTop: 8
                  }}>
                    {svc.tech.map(t => <SkillLogo key={t} name={t} />)}
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </div>
    </section>
  );
}

export default React.memo(CreativeSolutions);
