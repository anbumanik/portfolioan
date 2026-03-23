import { motion } from 'framer-motion';

export default function BlurText({
  text = "",
  delay = 200,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
  style = {}
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const baseDelay = delay / 1000;
  
  const yOffset = direction === "top" ? -20 : direction === "bottom" ? 20 : 0;
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: baseDelay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: yOffset, filter: "blur(8px)" },
    visible: {
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10px" }}
      onAnimationComplete={onAnimationComplete}
      style={{ display: "inline-flex", flexWrap: "wrap", verticalAlign: "bottom" }}
    >
      {elements.map((word, index) => (
        <motion.span variants={child} key={index} style={{ display: "inline-block", marginRight: animateBy === "words" ? "0.25em" : "0", ...style }}>
          {word === " " ? "\u00A0" : word}
        </motion.span>
      ))}
    </motion.span>
  );
}
