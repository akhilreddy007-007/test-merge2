// src/App.jsx
// import React from "react";
// import PoseCoach from "./components/PoseCoach";
// import MuscleWiki from "./components/MuscleWiki";

// function App() {
//   return (
   
//     <div className="App">
//        <div className="scroll-wacher"></div>
//       {/* Section 1: Pose Coach */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <PoseCoach />
//       </section>

//       {/* Section 2: Muscle Wiki */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <MuscleWiki />
//       </section>
//     </div>
//   );
// }

// export default App;

// src/App.jsx
// import React, { useEffect } from "react";
// import PoseCoach from "./components/PoseCoach";
// import MuscleWiki from "./components/MuscleWiki";

// function App() {
//   useEffect(() => {
//     // ✅ JS fallback for scroll progress bar (works in all browsers)
//     const scrollWatcher = document.querySelector(".scroll-wacher");

//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight = document.body.scrollHeight - window.innerHeight;
//       const scrollPercent = scrollTop / docHeight;
//       scrollWatcher.style.transform = `scaleX(${scrollPercent})`;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="App">
//       {/* 🔹 Scroll progress bar */}
//       <div className="scroll-wacher"></div>

//       {/* Section 1: Pose Coach */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <PoseCoach />
//       </section>

//       {/* Section 2: Muscle Wiki */}
//       <section style={{ minHeight: "100vh", padding: "20px" }}>
//         <MuscleWiki />
//       </section>
//     </div>
//   );
// }

// export default App;






// import React, { useEffect, useState } from "react";
// import Hero from "./components/Hero";
// import PoseCoach from "./components/PoseCoach";
// import MuscleWiki from "./components/MuscleWiki";
// import StaggerWrapper from "./components/StaggerWrapper";   // ✅ import
// import Footer from "./components/Footer";

// function App() {
//   const [showTopBtn, setShowTopBtn] = useState(false);

//   useEffect(() => {
//     const scrollWatcher = document.querySelector(".scroll-wacher");

//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const docHeight = document.body.scrollHeight - window.innerHeight;
//       const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
//       if (scrollWatcher) scrollWatcher.style.transform = `scaleX(${scrollPercent})`;

//       setShowTopBtn(scrollTop > 200);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <div className="App">
//       {/* Progress bar */}
//       <div className="scroll-wacher"></div>

//       {/* Sticky Navbar */}
//       <nav className="navbar">
//         <a href="#hero">Home</a>
//         <a href="#posecoach">Pose Coach</a>
//         <a href="#musclewiki">Muscle Wiki</a>
//       </nav>

//       {/* Sections */}
//      <StaggerWrapper>
//   <div style={{ height: "100vh" }}>
//     <Hero />
//   </div>
// </StaggerWrapper>

//       <section id="posecoach" className="block" style={{ minHeight: "100vh", padding: "20px" }}>
//         <StaggerWrapper>
//           <PoseCoach />
//         </StaggerWrapper>
//       </section>

//       <section id="musclewiki" className="block" style={{ minHeight: "100vh", padding: "20px" }}>
//         <StaggerWrapper>
//           <MuscleWiki />
//         </StaggerWrapper>
//       </section>

//       {/* Back to Top button */}
//       {showTopBtn && (
//         <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
//           ⬆
//         </button>
        
//       )}
//         {/* ✅ Footer at the very bottom */}
//       <Footer />
//     </div>
//   );
// }

// export default App;



import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import PoseCoach from "./components/PoseCoach";
import MuscleWiki from "./components/MuscleWiki";
import CelebHub from "./components/CelebHub";
import StaggerWrapper from "./components/StaggerWrapper";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import Leaderboard from "./components/Leaderboard"; // ✅ NEW
function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [showLogin, setShowLogin] = useState(false);
  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem("loggedUser")
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const scrollWatcher = document.querySelector(".scroll-wacher");

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      if (scrollWatcher)
        scrollWatcher.style.transform = `scaleX(${scrollPercent})`;

      setShowTopBtn(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="App">
      {/* Progress bar */}
      <div className="scroll-wacher"></div>

      {/* Sticky Navbar */}
      <nav className="navbar">
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#musclewiki">Muscle Wiki</a>
          <a href="#posecoach">Pose Coach</a>
          <a href="#celebhub">Celeb Hub</a>
        </div>

        <div className="nav-actions">
          {/* 🌙☀️ Theme toggle */}
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* 👤 Auth section */}
          {loggedUser ? (
            <div className="welcome-container">
              <span className="welcome-text">👋 {loggedUser}</span>
              <button
                className="logout-btn"
                onClick={() => {
                  setLoggedUser(null);
                  localStorage.removeItem("loggedUser");
                }}
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              🔑 Login
            </button>
          )}
        </div>
      </nav>

      {/* 👇 Login Page (overlay) */}
      {showLogin && (
        <LoginPage
          onLogin={(user) => {
            setLoggedUser(user);
            localStorage.setItem("loggedUser", user);
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Sections */}
      <StaggerWrapper>
        <div id="hero" style={{ height: "100vh" }}>
          <Hero />
        </div>
      </StaggerWrapper>

      <section
        id="musclewiki"
        className="block"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <StaggerWrapper>
          <MuscleWiki />
        </StaggerWrapper>
      </section>

      <section
        id="posecoach"
        className="block"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <StaggerWrapper>
          <PoseCoach />
        </StaggerWrapper>
      </section>

      <section
        id="celebhub"
        className="block"
        style={{ minHeight: "100vh", padding: "20px" }}
      >
        <StaggerWrapper>
          <CelebHub />
        </StaggerWrapper>
      </section>






<div id="leaderboard" className="block" style={{ minHeight: "0vh", padding: "0px" }}>
  <Leaderboard />
</div>

      {/* Back to Top button */}
      {showTopBtn && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          ⬆
        </button>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
