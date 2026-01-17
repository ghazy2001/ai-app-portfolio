import React, { useEffect, useRef } from "react";
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

    const matchMedia = gsap.matchMedia();

    // --- Desktop Animation (Pinning & Scrubbing) ---
    matchMedia.add("(min-width: 1025px)", () => {
      const slides = gsap.utils.toArray(".highlight-slide");
      const totalSlides = slides.length;

      // Setup timeline for pinning and sliding
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${(totalSlides + 1) * 100}%`, // Added extra distance for final fade out
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

        // Fade out previous slide to prevent overlap
        tl.to(slides[i - 1], { opacity: 0 }, "<");

        // Animate background color synchronous with slide entry
        tl.to(
          ".work-dynamic-bg",
          { backgroundColor: brands[i].color, duration: 1 },
          "<",
        );
      });

      // Final step: Fade background back to global (transparent) after last slide
      tl.to(".work-dynamic-bg", {
        backgroundColor: "transparent",
        duration: 1,
      });

      // Set initial background color explicitly to transparent (Global BG)
      gsap.set(".work-dynamic-bg", { backgroundColor: "transparent" });
    });

    // --- Mobile Animation (Bg Color Change Only - No Pinning) ---
    matchMedia.add("(max-width: 1024px)", () => {
      const slides = gsap.utils.toArray(".highlight-slide");

      // Ensure start is transparent
      gsap.set(".work-dynamic-bg", { backgroundColor: "transparent" });

      slides.forEach((slide, i) => {
        ScrollTrigger.create({
          trigger: slide,
          start: "top 40%", // Trigger color change when slide is higher up (delayed)
          end: "bottom 40%",
          onEnter: () =>
            gsap.to(".work-dynamic-bg", {
              backgroundColor: brands[i].color,
              duration: 0.5,
            }),
          onEnterBack: () =>
            gsap.to(".work-dynamic-bg", {
              backgroundColor: brands[i].color,
              duration: 0.5,
            }),
          onLeaveBack: () => {
            if (i === 0) {
              gsap.to(".work-dynamic-bg", {
                backgroundColor: "transparent",
                duration: 0.5,
              });
            }
          },
        });
      });

      // Reset to transparent when leaving area upwards or downwards
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top bottom",
        onLeaveBack: () =>
          gsap.to(".work-dynamic-bg", { backgroundColor: "transparent" }),
      });
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "bottom top",
        onEnter: () =>
          gsap.to(".work-dynamic-bg", { backgroundColor: "transparent" }), // Ensure it clears if we scroll way past
      });
    });

    return () => matchMedia.revert();
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
        style={{ width: "100%", position: "relative" }}
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
                  <>
                    <video
                      src={brand.cover}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="desktop-media"
                    />
                    <img
                      src={
                        // Find first image asset in album to avoid using video as img src
                        brand.album.find(
                          (asset) =>
                            !asset.endsWith(".mp4") &&
                            !asset.endsWith(".MOV") &&
                            !asset.endsWith(".webm"),
                        ) || brand.cover
                      }
                      alt={brand.title}
                      className="mobile-media"
                    />
                  </>
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
