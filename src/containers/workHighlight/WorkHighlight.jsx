import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brands } from "../../data/portfolioData";
import "./workHighlight.css";

const WorkHighlight = ({ openAlbum }) => {
  const componentRef = useRef(null);
  const pinRef = useRef(null);
  const bgRef = useRef(null); // Ref for dynamic background
  const slidesRef = useRef([]);
  const cursorRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Use ALL projects for the highlight section as requested
  const highlightProjects = brands;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pin the MAIN COMPONENT to reserve space
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: componentRef.current, // Pin the wrapper
          start: "top top",
          end: `+=${(highlightProjects.length + 0.5) * 100}%`, // Added 50% extra scroll space for the final fade out
          scrub: 1,
          pin: true,
          // snap: 1 / (highlightProjects.length - 1), // Optional: snap to slides
        },
      });

      slidesRef.current.forEach((slide, i) => {
        const project = highlightProjects[i];

        // Skip first slide entry animation (it's initial state)
        // But we might need to fade it out when slide 1 comes in

        // Special handling for the FIRST active project color
        // It starts transparent (site bg) and fades into the project color as you start scrolling
        if (i === 0 && project.color && bgRef.current) {
          tl.to(
            bgRef.current,
            {
              backgroundColor: project.color,
              duration: 0.5,
              ease: "power1.out",
            },
            0 // Insert at absolute start of timeline
          );
        }

        if (i > 0) {
          // Define a step for this transition
          const label = `slide-${i}`;
          tl.addLabel(label);

          // 1. Animate NEW Slide IN
          // Start from lower, fade in
          tl.fromTo(
            slide,
            { yPercent: 100, autoAlpha: 0, zIndex: 10 + i },
            { yPercent: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
            label
          );

          // 2. Animate PREVIOUS Slide OUT (to prevent overlap)
          // Fade out and scale down slightly
          const prevSlide = slidesRef.current[i - 1];
          if (prevSlide) {
            tl.to(
              prevSlide,
              { autoAlpha: 0, scale: 0.9, duration: 1, ease: "power2.out" }, // autoAlpha handles opacity + visibility
              label
            );
          }

          // 3. Animate Background Color match
          if (project.color && bgRef.current) {
            tl.to(
              bgRef.current,
              { backgroundColor: project.color, duration: 1 },
              label
            );
          }

          // Spacer/Hold
          tl.to(slide, { duration: 0.5 });
        }
      });

      // --- FINAL STEP: Fade background back to transparent (site default) ---
      // This runs after the last slide is fully shown, transitioning out of the component
      tl.to(bgRef.current, { backgroundColor: "transparent", duration: 0.5 });
    }, componentRef);

    return () => ctx.revert();
  }, [highlightProjects.length]);

  // Cursor Logic - Direct Performance (Matches RecentWork)
  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        // Direct transform for zero lag
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="work-highlight-wrapper" ref={componentRef}>
      {/* Dynamic Background Layer */}
      <div className="work-dynamic-bg" ref={bgRef}></div>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`custom-view-cursor ${isHovered ? "active" : ""}`}
      >
        View Album
      </div>
      {/* Sticky Slider Section */}
      <div className="work-sticky-wrapper" ref={pinRef}>
        {highlightProjects.map((project, i) => (
          <div
            key={project.id || i}
            className="highlight-slide"
            ref={(el) => (slidesRef.current[i] = el)}
            style={{ zIndex: i }}
          >
            <div className="slide-grid">
              {/* 1. Image - The Big Focus */}
              <div
                className={`slide-image-area ${
                  project.objectFit === "contain" ? "is-contained" : ""
                }`}
                onMouseEnter={() => {
                  setIsHovered(true);
                  // Forcefully hide global cursor elements (Direct DOM manipulation + GSAP)
                  gsap.to(".cursor-dot, .cursor-ring", {
                    opacity: 0,
                    duration: 0.2,
                    overwrite: true,
                  });
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  // Restore global cursor
                  gsap.to(".cursor-dot, .cursor-ring", {
                    opacity: 1,
                    duration: 0.2,
                    overwrite: true,
                  });
                }}
                onClick={() => {
                  if (openAlbum) openAlbum(project);
                }}
              >
                {project.type === "video" ? (
                  <video src={project.cover} autoPlay muted loop playsInline />
                ) : (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className={
                      project.objectFit === "contain" ? "contain-img" : ""
                    }
                    style={{
                      objectFit: project.objectFit || "cover",
                    }}
                  />
                )}
              </div>

              {/* 2. Title - Overlapping */}
              <div className="slide-title-area">
                <span className="highlight-category">
                  0{i + 1} &mdash; {project.category}
                </span>
                <h1 className="highlight-title">{project.title}</h1>
              </div>

              {/* 3. Description - Bottom Right */}
              <div className="slide-desc-area">
                <p>{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>{" "}
      {/* End work-sticky-wrapper */}
    </div>
  );
};

export default WorkHighlight;
