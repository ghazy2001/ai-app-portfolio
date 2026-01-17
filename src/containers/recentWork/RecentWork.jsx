import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./recentWork.css";
import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

// Import All Assets for Dense Collage
import silver1 from "../../assets/silver1.png";
import silver2 from "../../assets/silver2.png";
import silver5 from "../../assets/silver5.png";
import silver6 from "../../assets/silver6.png";

import elbaz2 from "../../assets/elbaz2.png";
import elbaz5 from "../../assets/elbaz5.png";
import elbaz6 from "../../assets/elbaz6.png";
import elbaz7 from "../../assets/elbaz7.png";

import siras1 from "../../assets/siras1.png";
import siras2 from "../../assets/siras2.png";
import siras3 from "../../assets/siras3.png";
import siras6 from "../../assets/siras6.png";
import siras5 from "../../assets/siras5.png";

import cat3 from "../../assets/cat3.jpg";
import cat4 from "../../assets/cat4.jpg";
import catMain from "../../assets/cat2.jpg";

import wood1 from "../../assets/wood1.png";
import ibera1 from "../../assets/ibera1.png";
import lab1 from "../../assets/lab1.png";
import silver4 from "../../assets/silver4.png";

const RecentWork = () => {
  // Array of all images to map through for a clean grid
  /* Optimized list: 20 images total (including new ones) */
  const collageImages = [
    wood1, // New
    silver1,
    siras1,
    catMain,
    ibera1, // New
    silver2,
    elbaz2,
    siras2,
    cat3,
    lab1, // New
    silver6,
    elbaz6,
    siras3,
    cat4,
    siras6, // New
    silver5,
    elbaz5,
    siras5,
    elbaz7,
    silver4, // New
  ];

  /* Optimized: Removed useState for hover to prevent re-renders/lag */
  const cursorRef = useRef(null);
  const containerRef = useRef(null); // Ref for the Expandable Banner (Clip Path)
  const sectionRef = useRef(null); // Ref for the main section wrapper (Pin Trigger)

  // Professional Pinned Expansion & Background Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // ... GSAP code matches existing context, no changes needed to useEffect body ...
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 851px)": function () {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=1000",
              scrub: 0.1,
              pin: true,
              pinSpacing: true,
            },
          });

          // 1. Scale/Border Expansion
          tl.fromTo(
            containerRef.current,
            { scale: 0.9, borderRadius: "40px", force3D: true },
            { scale: 1, borderRadius: "0px", ease: "none" }
          );

          // 2. Background Color Sync
          tl.to(
            document.documentElement,
            {
              "--bg-grad-center": "rgba(0, 15, 30, 1)",
              "--bg-grad-outer": "#000000",
              duration: 0.5,
              ease: "none",
            },
            0
          );
        },

        // Mobile - No Pinning, Static Layout, But KEEP Dark Background Effect
        "(max-width: 850px)": function () {
          // Ensure full width/scale on mobile without animation
          gsap.set(containerRef.current, { scale: 1, borderRadius: "0px" });

          // Trigger background change on scroll (Scrubbed to match desktop feel)
          gsap.to(document.documentElement, {
            "--bg-grad-center": "rgba(0, 15, 30, 1)",
            "--bg-grad-outer": "#000000",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%", // Start transition earlier
              end: "bottom 20%",
              scrub: true, // Smooth transition synced with scroll
            },
            ease: "none",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="mn__recentwork" id="recent-work" ref={sectionRef}>
        {/* Note: Removed section__padding to allow full bleed */}
        <Link
          to="/portfolio"
          className="mn__banner-container"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            if (cursorRef.current) cursorRef.current.classList.add("active");
          }}
          onMouseLeave={() => {
            if (cursorRef.current) cursorRef.current.classList.remove("active");
          }}
        >
          {/* Custom Cursor Element */}
          <div ref={cursorRef} className="mn__banner-cursor">
            VIEW
          </div>

          {/* Background Collage Layer */}
          {/* Background Collage Layer */}
          <div className="mn__banner-collage">
            {/* We use 4 columns. 20 images total = 5 images per column. */}
            {[0, 1, 2, 3].map((colIndex) => {
              // Get 5 images for this column
              const colImages = collageImages.slice(
                colIndex * 5,
                (colIndex + 1) * 5
              );
              // Duplicate for infinite scroll
              const renderImages = [...colImages, ...colImages];

              return (
                <div
                  key={colIndex}
                  className={`collage-column col-${colIndex + 1}`}
                >
                  <div className="collage-track">
                    {renderImages.map((img, idx) => (
                      <div key={idx} className="collage-item-wrapper">
                        <img
                          src={img}
                          alt=""
                          className="collage-img"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dark Overlay (No Blur, just contrast) */}
          <div className="mn__banner-overlay"></div>

          {/* Content */}
          <div className="mn__banner-content">
            <h1 className="banner-title">
              Work that speaks, Results that show
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecentWork;
