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

  useEffect(() => {
    // Context for MatchMedia
    let mm = gsap.matchMedia();

    // Scoped context for cleanup
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".whatmn-card");

      // Simple Entry Animation (Universal)
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
          delay: i * 0.1,
        });
      });

      // Responsive Border Animation
      mm.add(
        {
          // Mobile
          isMobile: "(max-width: 799px)",
          // Desktop
          isDesktop: "(min-width: 800px)",
        },
        (context) => {
          let { isMobile } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              // Mobile: Start when top of section is at 60% of viewport (later start)
              // End when bottom of section is 40% ABOVE the viewport (extended duration)
              // This huge distance slows down the drawing significantly.
              // Scrub 0 = "walk with me" (instant response, no lag)
              start: isMobile ? "top 60%" : "top 45%",
              end: isMobile ? "bottom -100%" : "bottom -10%",
              scrub: isMobile ? 0.1 : 0.5, // Tighter sync on mobile
            },
          });

          tl.fromTo(
            [".whatmn-border-path-1", ".whatmn-border-path-2"],
            { strokeDasharray: 4000, strokeDashoffset: 4000 },
            { strokeDashoffset: 0, ease: "none" },
          );
        },
      );
    }, containerRef);

    const container = containerRef.current;
    return () => {
      ctx.revert(); // Reverts matchMedia too since it's inside context or cleaned up via it
      // mm.revert(); // matchMedia is automatically cleaned up if wrapped, but usually we revert the context.
      // Actually per GSAP 3.11+, matchMedia() returns a context-like object.
      // Better practice: create mm OUTSIDE, add to it, and revert mm.
      // But wrapping in context is also fine if we revert context.
      // Let's rely on ctx.revert() which reverts everything created inside it.

      // Explicitly revert matchMedia if created outside context,
      // but here we used it inside? No, let's reset to standard pattern to be safe.
      mm.revert();

      if (container && container.observer) {
        container.observer.disconnect();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div className="MN__whatmn section__padding" id="wmn" ref={containerRef}>
        {/* Full Width Content Wrapper */}
        <div className="MN__whatmn-content-wrapper">
          {/* Animated SVG Border - Positioned absolute to frame the content */}
          <svg
            className="whatmn-border-svg"
            viewBox="0 0 1200 1400"
            preserveAspectRatio="none"
          >
            {/* Left Frame: Top Center -> Top Left -> Bottom Left -> Bottom Center */}
            {/* Adjusted coordinates to be at the edges 0 and 1200 */}
            <path
              className="whatmn-border-path whatmn-border-path-1"
              d="M 600 0 L 0 0 L 0 1400 L 600 1400"
              vectorEffect="non-scaling-stroke"
              stroke="#FFD700"
              strokeWidth="2"
              fill="none"
            />
            {/* Right Frame: Top Center -> Top Right -> Bottom Right -> Bottom Center */}
            <path
              className="whatmn-border-path whatmn-border-path-2"
              d="M 600 0 L 1200 0 L 1200 1400 L 600 1400"
              vectorEffect="non-scaling-stroke"
              stroke="#FFD700"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* 4 Cards Grid - Unified Layout */}
          <div className="whatmn-cards-grid">
            {/* ... cards ... */}
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
        </div>
      </div>
    </div>
  );
};

export default WhatMN;
