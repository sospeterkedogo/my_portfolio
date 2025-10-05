import React from "react";

export default function HeroSection() {
  return (
    <>
<style>
  {`
    @keyframes flipFade {
      0% {
        opacity: 0;
        transform: perspective(800px) rotateX(90deg) scale(0.8); /* flip in bottom first */
      }
      20% {
        opacity: 1;
        transform: perspective(800px) rotateX(0deg) scale(1); /* fully visible */
      }
      40% {
        opacity: 0;
        transform: perspective(800px) rotateX(-90deg) scale(0.8); /* flip out top first */
      }
      100% {
        opacity: 0;
        transform: perspective(800px) rotateX(-90deg) scale(0.8);
      }
    }

    .flip-container {
      position: relative;
      height: 8rem; /* reserve vertical space */
      width: 100vw;
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .flip-line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      text-align: center;
      opacity: 0;
      animation: flipFade 10s ease-in-out infinite;
    }

    .flip-line:nth-child(1) { animation-delay: 0s; }
    .flip-line:nth-child(2) { animation-delay: 2s; }
    .flip-line:nth-child(3) { animation-delay: 4s; }
    .flip-line:nth-child(4) { animation-delay: 6s; }
    .flip-line:nth-child(5) { animation-delay: 8s; }
  `}
</style>

<section className="min-h-[65vh] flex items-center justify-center text-center w-full">
  <div
    style={{
      fontSize: "clamp(4rem, 23vw, 10rem)", 
      color: "white",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      userSelect: "none",
      filter: "drop-shadow(0 0 10px rgba(0,0,0,0.7))",
    }}
    className="md:text-8xl flip-container sm:text-5xl text-4xl font-extrabold"
  >
    <div className="flip-line"><h1>SOSPETER</h1></div>
    <div className="flip-line"><h1>I AM A</h1></div>
    <div className="flip-line"><h1>DESIGNER</h1></div>
    <div className="flip-line"><h1>DEVELOPER</h1></div>
    <div className="flip-line"><h1>PENTESTER</h1></div>
  </div>
</section>


    </>
  );
}
