import { motion } from "framer-motion";
import React, { useState } from "react";
import BlurText from "./animations/BlurText";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | done

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate sending delay
    setTimeout(() => {
      setStatus("done");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" style={{
      padding: "64px 32px 48px", borderTop: "1px solid #1A1A1A", position: "relative", overflow: "hidden"
    }}>
      <div className="contact-grid" style={{ gap: 60, alignItems: "center", maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Left */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#D4A853", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>
            Let's Talk
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: "clamp(32px, 4vw, 48px)",
            color: "#fff", margin: "0 0 16px", letterSpacing: "-1px", lineHeight: 1.1
          }}>
            <BlurText text="Start A" delay={100} />
            <BlurText
              text="Project"
              delay={300}
              style={{
                background: "linear-gradient(135deg,#F0C96B,#D4A853)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}
            />
          </h2>
          <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>
            Have an idea? Let's build something great together. I'm currently available for freelance and full-time roles.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
                text: "anbumanik22@gmail.com"
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                text: "Natham, Dindigul"
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                text: "Responds within 24h"
              }
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: "rgba(212,168,83,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {item.icon}
                </div>
                <span style={{ color: "#aaa", fontSize: 13, fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          style={{
            background: "#141414", border: "1px solid #2A2A2A", borderRadius: 20,
            padding: "36px", display: "flex", flexDirection: "column", gap: 16
          }}
        >
          {status === "done" ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <div style={{ color: "#D4A853", fontWeight: 800, fontSize: 20 }}>Message Sent!</div>
              <p style={{ color: "#777", fontSize: 13, marginTop: 8 }}>I'll get back to you within 24 hours.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                style={{ marginTop: 20, background: "transparent", border: "1px solid #333", color: "#888", padding: "8px 20px", borderRadius: 8, cursor: "pointer", fontSize: 12 }}
              >Send Another</button>
            </div>
          ) : (
            <>
              {[
                { field: "name", label: "Your Name", placeholder: "Enter the Name", type: "text" },
                { field: "email", label: "Email Address", placeholder: "Enter the Email", type: "email" },
              ].map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[field]}
                    onChange={e => setForm({ ...form, [field]: e.target.value })}
                    required
                    style={{
                      width: "100%", background: "#0E0E0E", border: "1px solid #2A2A2A",
                      borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14,
                      fontFamily: "'Outfit', sans-serif", outline: "none", boxSizing: "border-box",
                      transition: "border-color 0.2s"
                    }}
                    onFocus={e => e.target.style.borderColor = "#D4A853"}
                    onBlur={e => e.target.style.borderColor = "#2A2A2A"}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required rows={4}
                  style={{
                    width: "100%", background: "#0E0E0E", border: "1px solid #2A2A2A",
                    borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14,
                    fontFamily: "'Outfit', sans-serif", outline: "none", resize: "none",
                    boxSizing: "border-box", transition: "border-color 0.2s"
                  }}
                  onFocus={e => e.target.style.borderColor = "#D4A853"}
                  onBlur={e => e.target.style.borderColor = "#2A2A2A"}
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  background: "linear-gradient(135deg,#D4A853,#A87D2E)", color: "#fff",
                  fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: 15,
                  padding: "14px", borderRadius: 50, border: "none", cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(212,168,83,0.3)",
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "opacity 0.2s, transform 0.1s"
                }}
              >
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  );
}

export default React.memo(Contact);