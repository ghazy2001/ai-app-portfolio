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

          {/* Animated SVG Border */}
          <svg
            className="whatmn-border-svg"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <path
              className="whatmn-border-path"
              d="M 600 0 L 600 800 M 0 200 L 1200 200 M 0 400 L 1200 400 M 0 600 L 1200 600"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WhatMN;
