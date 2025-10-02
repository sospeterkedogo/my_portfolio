import React from "react";

export default function HeroSection() {
  return (
    <>
      <style>
        {`
          @keyframes infiniteTransform {
            0% {
              transform: perspective(800px) translate3d(0, 0, 0) rotateX(-49deg) scale(0.83);
              opacity: 0.45;
              visibility: visible;
            }
            
            50% {
              transform: perspective(800px) translate3d(10px, 5px, 0) rotateX(0deg) scale(0.9);
              opacity: 1;
            }
            
            100% {
              transform: perspective(800px) translate3d(0, 0, 0) rotateX(-49deg) scale(0.83);
              opacity: 0.45;
            }
          }
        `}
      </style>

      <section className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4">
        <div
          id="home-feature-title"
          style={{
            animation: "infiniteTransform 6s ease-in-out infinite",
            fontFamily: "var(--font-inter)",
            fontWeight: 800,
            fontSize: "3rem",
            color: "white",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            userSelect: "none",
            filter: "drop-shadow(0 0 10px rgba(0,0,0,0.7))"
          }}
          className="md:text-8xl"
        >
          HI, I'M PETER<br />
          WEB DEVELOPER<br />
          NEXT.JS SPECIALIST<br />
          CLEAN CODE MANIAC
        </div>
      </section>
    </>
  );
}
