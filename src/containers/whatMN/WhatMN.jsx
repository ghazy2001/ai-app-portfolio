import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiEyeLine,
  RiCompassLine,
  RiTeamLine,
  RiBookOpenLine,
} from "react-icons/ri";
import "./whatMN.css";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const WhatMN = () => {
  const containerRef = React.useRef(null);
  const leftPathRef = React.useRef(null);
  const rightPathRef = React.useRef(null);

  useEffect(() => {
    // Context for easy cleanup, scoped to current component
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".whatmn-card");

      // Simple Entry Animation for cards as they scroll into view
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          delay: i * 0.1, // Stagger effect
        });
      });

      // SVG Border Animation - Split Split (Pixel Perfect)

      // Capture ref for cleanup
      const containerEl = containerRef.current;
      const leftPath = leftPathRef.current;
      const rightPath = rightPathRef.current;
      const wrapper = containerEl
        ? containerEl.querySelector(".MN__whatmn-content-wrapper")
        : null;
      let observer = null;

      if (leftPath && rightPath && wrapper) {
        const updatePaths = () => {
          const w = wrapper.offsetWidth;
          const h = wrapper.offsetHeight;
          const p = 15; // padding
          const cx = w / 2;

          // Left Path
          const dLeft = `M ${cx} ${-p} L ${-p} ${-p} L ${-p} ${h + p} L ${cx} ${
            h + p
          }`;
          // Right Path
          const dRight = `M ${cx} ${-p} L ${w + p} ${-p} L ${w + p} ${
            h + p
          } L ${cx} ${h + p}`;

          leftPath.setAttribute("d", dLeft);
          rightPath.setAttribute("d", dRight);

          const lLen = leftPath.getTotalLength();
          const rLen = rightPath.getTotalLength();

          gsap.set(leftPath, { strokeDasharray: lLen });
          gsap.set(rightPath, { strokeDasharray: rLen });
        };

        // Initial Draw
        updatePaths();

        // Resize Observer
        observer = new ResizeObserver(() => updatePaths());
        observer.observe(wrapper);

        // Assign to container for cleanup access
        containerEl.observer = observer;

        // Animation
        gsap.fromTo(
          [leftPath, rightPath],
          { strokeDashoffset: () => leftPath.getTotalLength() },
          {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current && containerRef.current.observer) {
        containerRef.current.observer.disconnect();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div className="MN__whatmn section__padding" id="wmn" ref={containerRef}>
        {/* Full Width Content Wrapper */}
        <div className="MN__whatmn-content-wrapper">
          {/* 4 Cards Grid - Unified Layout */}
          <div className="whatmn-cards-grid">
            {/* Card 1: Who We Are */}
            <div className="whatmn-card">
              <div className="whatmn-card-icon">
                <RiTeamLine size={48} />
              </div>
              <h2 className="whatmn-card-title">Who We Are</h2>
              <p className="whatmn-card-text">
                We have over 5 years of experience delivering effective,
                data-driven marketing solutions. We help brands grow by
                executing performance-focused campaigns that drive measurable
                results.
              </p>
            </div>

            {/* Card 2: Company Story */}
            <div className="whatmn-card">
              <div className="whatmn-card-icon">
                <RiBookOpenLine size={48} />
              </div>
              <h2 className="whatmn-card-title">Our Story</h2>
              <p className="whatmn-card-text">
                Founded on the belief that marketing should create real business
                impact, not just visibility. We fix the core problem of running
                campaigns without clear results.
              </p>
            </div>

            {/* Card 3: Vision */}
            <div className="whatmn-card">
              <div className="whatmn-card-icon">
                <RiEyeLine size={48} />
              </div>
              <h2 className="whatmn-card-title">Our Vision</h2>
              <p className="whatmn-card-text">
                To become a leading performance marketing agency that helps
                brands scale sustainably through data-driven strategies and
                continuous optimization.
              </p>
            </div>

            {/* Card 4: Mission */}
            <div className="whatmn-card">
              <div className="whatmn-card-icon">
                <RiCompassLine size={48} />
              </div>
              <h2 className="whatmn-card-title">Our Mission</h2>
              <p className="whatmn-card-text">
                Driving real results for brands by building smart strategies,
                executing high-performance campaigns, and continuously
                optimizing for ROI.
              </p>
            </div>
          </div>

          {/* CTA Button - Centered at bottom */}
          <div className="whatmn-cta-wrapper">
            <Link to="/contact">
              <button className="cta-button-pulse">Call Us Now</button>
            </Link>
          </div>

          {/* Animated SVG Border - Absolute Positioned within relative wrapper */}
          <svg
            className="whatmn-border-svg"
            /* No viewBox, we use raw pixel coordinates */
          >
            <path
              ref={leftPathRef}
              className="whatmn-border-path"
              /* d is set via JS */
            />
            <path
              ref={rightPathRef}
              className="whatmn-border-path"
              /* d is set via JS */
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WhatMN;
