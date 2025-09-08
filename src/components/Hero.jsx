// src/components/Hero.jsx
import React from "react";
import { motion } from "framer-motion";
import "./Hero.css";

function Hero() {
  // 🔽 Scroll function
  const scrollToNext = () => {
    const nextSection = document.querySelector("#musclewiki");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-container">
      {/* ✅ Replace canvas with Spline viewer */}
      <spline-viewer
        url="https://prod.spline.design/iGUPP1zlqeAc-dzl/scene.splinecode"
        class="hero-spline"
      ></spline-viewer>

      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        ⚡ALTS FITNESS ARENA ⚡
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Train • Compete • Dominate
      </motion.p>

      <div className="glitch" data-text="LEVEL UP YOUR BODY">
        LEVEL UP YOUR BODY
      </div>

      {/* Arcade Button */}
      <button className="press-start" onClick={scrollToNext}>
        ▶ PRESS START
      </button>
    </div>
  );
}

export default Hero;
