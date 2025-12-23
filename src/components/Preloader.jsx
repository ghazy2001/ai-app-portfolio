import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./preloader.css";
import logo from "../assets/logo2.png";
import { useLocation } from "react-router-dom";

const Preloader = () => {
  const [complete, setComplete] = useState(false);
  const containerRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const logoRef = useRef(null);
  const counterRef = useRef(null);
  
  const location = useLocation();

  useEffect(() => {
    // If on Home page, don't run animation and hide immediately
    if (location.pathname === "/") {
        setComplete(true);
        return;
    }

    // Reset state for non-home pages to ensure animation plays
    setComplete(false);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
             setComplete(true);
        }
      });
      // ... existing timeline ...

      // 1. Enter: Logo and Counter Fade In
      tl.to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      })
      .to(counterRef.current, {
        opacity: 1,
        duration: 0.5
      }, "-=0.4");

      // 2. Count Up
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 2.5, // Total loading time simulation
        ease: "expo.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counterObj.value) + "%";
          }
        },
      }, "<");

      // 3. Exit: Fade out content
      tl.to([logoRef.current, counterRef.current], {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in"
      });

      // 4. Split The Curtains
      tl.to(topPanelRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      }, "split")
      .to(bottomPanelRef.current, {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.inOut"
      }, "split");

    }, containerRef);

    return () => ctx.revert();
  }, [location.pathname]);

  // if (complete) return null; // REMOVED to prevent GSAP/React DOM conflicts

  return (
    <div className={`preloader ${complete ? 'hidden' : ''}`} ref={containerRef} style={{ display: complete ? 'none' : 'flex' }}>
      <div className="preloader-panel-top" ref={topPanelRef}></div>
      <div className="preloader-panel-bottom" ref={bottomPanelRef}></div>
      
      <div className="preloader-content">
        <img src={logo} alt="MN Logo" className="preloader-logo" ref={logoRef} />
        <div className="preloader-counter" ref={counterRef}>0%</div>
      </div>
    </div>
  );
};

export default Preloader;
