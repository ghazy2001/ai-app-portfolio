import React, { useEffect, useRef, useState } from "react";
import "./workHighlight.css"; // Ensure you created this CSS file based on your previous messages
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { brands } from "../../data/portfolioData";
import { RiArrowRightLine } from "react-icons/ri";

const WorkHighlight = ({ openAlbum }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const slides = gsap.utils.toArray(".highlight-slide");
    const totalSlides = slides.length;

    const updateBg = (color) => {
      gsap.to(".work-dynamic-bg", {
        backgroundColor: color || "transparent",
        duration: 0.5,
      });
    };

    let ctx = gsap.context(() => {
      // Setup timeline for pinning and sliding
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${totalSlides * 100}%`, // Scroll distance proportional to slides
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      slides.forEach((slide, i) => {
        if (i === 0) return; // First slide is already visible

        // Animate next slide in
        tl.fromTo(
          slide,
          { opacity: 0, yPercent: 100 },
          { opacity: 1, yPercent: 0, duration: 1, ease: "none" },
        );

        // Optional: Parallax or other effects for previous slide
        // tl.to(slides[i-1], { yPercent: -50, opacity: 0 }, "<");
      });

      // Dynamic Background Color Change based on active slide color
      brands.forEach((brand, i) => {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: () => `top top+=${i * window.innerHeight}`,
          end: () => `top top+=${(i + 1) * window.innerHeight}`,
          onEnter: () => updateBg(brand.color),
          onEnterBack: () => updateBg(brand.color),
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Custom Cursor Logic
  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      // Simple follow logic
      const x = e.clientX;
      const y = e.clientY;
      cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  const handleMouseEnter = () => cursorRef.current?.classList.add("active");
  const handleMouseLeave = () => cursorRef.current?.classList.remove("active");

  return (
    <div
      className="work-highlight-wrapper"
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
    >
      <div className="work-dynamic-bg"></div>

      <div className="custom-view-cursor" ref={cursorRef}>
        View Album
      </div>

      {/* Use a container for slides to control stacking */}
      <div
        className="work-sticky-wrapper"
        ref={containerRef}
        style={{ height: "100vh", width: "100%", position: "relative" }}
      >
        {brands.map((brand, index) => (
          <div
            key={brand.id}
            className="highlight-slide"
            style={{ zIndex: index + 1 }}
          >
            <div className="slide-grid">
              {/* Title Area */}
              <div className="slide-title-area">
                <span className="highlight-category">{brand.category}</span>
                <h2 className="highlight-title">{brand.title}</h2>
              </div>

              {/* Image Area - Clickable */}
              <div
                className={`slide-image-area ${brand.objectFit === "contain" ? "is-contained" : ""}`}
                onClick={() => openAlbum && openAlbum(brand)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mobile-view-btn">View Album</div>
                {brand.type === "video" ? (
                  <video src={brand.cover} autoPlay loop muted playsInline />
                ) : (
                  <img
                    src={brand.cover}
                    alt={brand.title}
                    className={
                      brand.objectFit === "contain" ? "contain-img" : ""
                    }
                  />
                )}
              </div>

              {/* Description Area */}
              <div className="slide-desc-area">
                <p>{brand.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkHighlight;
