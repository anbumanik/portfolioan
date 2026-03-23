import { motion } from "framer-motion";

const CLIENT_LOGOS = [
  "MAPPLESCAFE", "SKCREATIONS", "PUPPETBRUSH",
  "QAHAF", "SHIKDER FOUNDATION", "TREATOSBD", "MJ SMARTS APPS"
];

/* Double the logos so the marquee looks seamless */
const MARQUEE = [...CLIENT_LOGOS, ...CLIENT_LOGOS];


export default function Footer() {
  return (
    <footer id="footer" style={{ marginTop: 0 }}>

      {/* ─── GOLDEN FOOTER BAND ─── */}
      <div style={{
        background: "linear-gradient(135deg, #C4952A 0%, #D4A853 40%, #E6C068 70%, #C4952A 100%)",
        padding: "40px 48px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 40,
        alignItems: "center",
      }}>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <div style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 300, fontSize: 11,
            letterSpacing: 3, color: "rgba(0,0,0,0.5)", textTransform: "uppercase", marginBottom: 14
          }}>
            Words to build by
          </div>
          <blockquote style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 700,
            fontSize: "clamp(16px, 2vw, 22px)", color: "#0D0D0D",
            lineHeight: 1.4, margin: "0 0 16px", fontStyle: "italic"
          }}>
            “Programs must be written for people to read, and only incidentally for machines to execute.” 
          </blockquote>
          <div style={{ color: "rgba(0,0,0,0.55)", fontSize: 12, fontWeight: 600 }}>
            —— Harold Abelson
          </div>
        </motion.div>

        {/* Right — subscription note + client logos */}
        <div>
          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "rgba(0,0,0,0.55)",
            marginBottom: 16, fontStyle: "italic"
          }}>
           “If this is goodbye, don’t lose the connection—stay subscribed.”
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CLIENT_LOGOS.map(logo => (
              <div key={logo} style={{
                background: "rgba(0,0,0,0.12)", backdropFilter: "blur(4px)",
                borderRadius: 6, padding: "6px 12px",
                fontSize: 9, fontWeight: 800, color: "rgba(0,0,0,0.65)",
                letterSpacing: 0.5, textTransform: "uppercase"
              }}>{logo}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SCROLLING MARQUEE ─── */}
      <div style={{
        background: "#0A0A0A", borderTop: "1px solid #1A1A1A",
        padding: "14px 0", overflow: "hidden"
      }}>
        <div
          className="animate-scroll-logos"
          style={{ display: "flex", gap: 48, width: "max-content" }}
        >
          {MARQUEE.map((logo, i) => (
            <span key={i} style={{
              fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 11,
              color: "#333", letterSpacing: 2, textTransform: "uppercase", whiteSpace: "nowrap"
            }}>
              {logo} <span style={{ color: "#D4A853", margin: "0 12px" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div style={{
        background: "#080808", borderTop: "1px solid #181818",
        padding: "24px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 16, color: "#fff" }}>PRO</span>
          <span style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 16,
            background: "linear-gradient(135deg,#F0C96B,#D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Portfolio</span>
        </div>
        <div style={{ color: "#444", fontSize: 12 }}>
          © 2026 A7 Pixels · Powered by React, Driven by Passion
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "GitHub", href: "https://github.com/anbumanik" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/anbumani07" },
            { label: "Twitter", href: "https://twitter.com" },
            { label: "Instagram", href: "https://www.instagram.com/mr_anbu_07___?utm_source=qr&igsh=MWpvMDUwd2M3bWw3aA==" }
          ].map(s => (
            <a 
              key={s.label} 
              href={s.href} 
              target="_blank" 
              rel="noreferrer"
              style={{
                color: "#555", fontSize: 12, fontWeight: 600, textDecoration: "none",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => e.target.style.color = "#D4A853"}
              onMouseLeave={e => e.target.style.color = "#555"}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
