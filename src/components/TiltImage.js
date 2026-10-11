"use client";

import { useRef } from "react";

export default function TiltImage({
  src,
  alt,
  className = "",
}) {
  const imageRef = useRef(null);

  function handleMouseMove(event) {
    if (!imageRef.current) return;

    const bounds = event.currentTarget.getBoundingClientRect();

    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    const rotateX = (0.5 - y) * 5;
    const rotateY = (x - 0.5) * 7;

    imageRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.02, 1.02, 1.02)
    `;
  }

  function handleMouseLeave() {
    if (!imageRef.current) return;

    imageRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="overflow-hidden rounded-2xl bg-stone-100"
      style={{ perspective: "1000px" }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`block transition-transform duration-200 ease-out ${className}`}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      />
    </div>
  );
}