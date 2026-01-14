import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./whatMN.css";
import logo from "../../assets/logo2.png";
import {
  RiEyeLine,
  RiCompassLine,
  RiTeamLine,
  RiBookOpenLine,
} from "react-icons/ri";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instgram.svg";
import linkedin from "../../assets/linkedin.svg";
import tiktok from "../../assets/tiktok.svg";
import youtube from "../../assets/youtube.svg";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const WhatMN = () => {
  const containerRef = React.useRef(null);

  useEffect(() => {
    // Context for easy cleanup, scoped to current component
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".whatmn-card");
      const ctaBtn = document.querySelector(".whatmn-cta"); // Note: Since we are scoped, we should rely on GSAP's scoped selector if possible, or simple class selection within context works too if scoped.
      // Better: let GSAP handle selection within scope

      // Initial state: Button Hidden
      gsap.set(".whatmn-cta", { opacity: 0, y: 30, pointerEvents: "none" });

      /* Entry Animation Moved to Desktop MatchMedia to avoid hiding on mobile */

      // Use matchMedia to run this ONLY on Desktop
      ScrollTrigger.matchMedia({
        // Desktop (min-width: 851px)
        "(min-width: 851px)": function () {
          // Entry Animation (Desktop Only)
          gsap.from(containerRef.current, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.set(cards, { yPercent: 100, opacity: 1, zIndex: 1 });
          gsap.set(cards[0], { yPercent: 0, opacity: 1, zIndex: 1 });

          ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: 1, // Smoother scrub
            anticipatePin: 1,
            animation: gsap
              .timeline()
              // Move Card 2 Up
              .to(cards[1], { yPercent: 0, duration: 1, zIndex: 2 })
              .to(cards[0], { opacity: 0, scale: 0.9, duration: 0.3 }, "<0.2")

              // Move Card 3 Up
              .to(cards[2], { yPercent: 0, duration: 1, zIndex: 3 })
              .to(cards[1], { opacity: 0, scale: 0.9, duration: 0.3 }, "<0.2")

              // Move Card 4 Up
              .to(cards[3], { yPercent: 0, duration: 1, zIndex: 4 })
              .to(cards[2], { opacity: 0, scale: 0.9, duration: 0.3 }, "<0.2")

              // REVEAL BUTTON AFTER SLIDES
              .to(".whatmn-cta", {
                opacity: 1,
                y: 0,
                pointerEvents: "all",
                duration: 0.5,
                ease: "back.out(1.7)",
              }),
          });
        },

        "(max-width: 850px)": function () {
          // Kill all scroll triggers on mobile
          // Ensure everything is visible
          gsap.set(containerRef.current, { clearProps: "opacity, transform" });
          gsap.set(cards, {
            clearProps: "all",
            opacity: 1,
            visibility: "visible",
          });
          gsap.set(".whatmn-cta", {
            clearProps: "all",
            opacity: 1,
            pointerEvents: "all",
          });
        },
      });
    }, containerRef); // Scope to containerRef

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div className="MN__whatmn section__padding" id="wmn" ref={containerRef}>
        {/* 1. Spinning Icons Section (Left Column) */}
        <div className="MN__whatmn-icons-container">
          {/* 3D Scene Wrapper */}
          <div className="whatmn-scene">
            <div className="MN__whatmn-logo">
              <img src={logo} alt="MN Logo" />
            </div>

            <div className="MN__whatmn-social-icons">
              <a
                href="https://www.facebook.com/mnmarketing.eg"
                target="_blank"
                rel="noreferrer"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/mn_marketingagency.eg"
                target="_blank"
                rel="noreferrer"
              >
                <img src={instagram} alt="Instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/mnmarketingagency/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={linkedin} alt="LinkedIn" />
              </a>
              <a
                href="https://www.tiktok.com/@mnmarketing.eg"
                target="_blank"
                rel="noreferrer"
              >
                <img src={tiktok} alt="TikTok" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
              >
                <img src={youtube} alt="YouTube" />
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="whatmn-cta">
            <Link to="/contact">
              <button className="cta-button-pulse">Call Us Now</button>
            </Link>
          </div>
        </div>

        {/* Right Column Content Wrapper */}
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
        </div>
      </div>
    </div>
  );
};

export default WhatMN;
