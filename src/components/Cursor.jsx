import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Initial Hide
    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50, opacity: 0 });

    // Reveal on first move
    const onFirstMove = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
      window.removeEventListener("mousemove", onFirstMove);
    };
    window.addEventListener("mousemove", onFirstMove);

    // Mouse Move Logic
    const moveCursor = (e) => {
      // Dot follows instantly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Ring follows with slight delay
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15, // Smooth lag
        ease: "power2.out",
      });
    };

    // Hover Logic
    const handleMouseOver = (e) => {
      if (
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.closest("input") ||
        e.target.closest(".pointer") ||
        e.target.closest(".collage-img") // Banner images
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousemove", onFirstMove);
    };
  }, []);

  // Update Follower State on Hover
  useEffect(() => {
    const follower = followerRef.current;
    if (isHovered) {
      gsap.to(follower, {
        scale: 1.8,
        backgroundColor: "rgba(255, 215, 0, 0.1)", // Subtle Gold Fill
        borderColor: "rgba(255, 215, 0, 0.5)",
        duration: 0.3,
      });
    } else {
      gsap.to(follower, {
        scale: 1,
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.5)", // Default White-ish Ring
        duration: 0.3,
      });
    }
  }, [isHovered]);

  return (
    <>
      <div ref={cursorRef} className="cursor-dot"></div>
      <div ref={followerRef} className="cursor-ring"></div>
    </>
  );
};

export default Cursor;
