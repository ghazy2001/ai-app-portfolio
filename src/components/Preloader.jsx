import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./preloader.css";
import logo from "../assets/logo2.png";
import { useLocation } from "react-router-dom";

const Preloader = ({ setLoading }) => {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Simple timer to simulate loading
    const timer = setTimeout(() => {
      setComplete(true);
      if (setLoading) setLoading(false);
    }, 2000); // 2 seconds simple load

    return () => clearTimeout(timer);
  }, [setLoading]);

  // If complete, return null or hidden div to remove from DOM flow
  if (complete) return null;

  return (
    <div className="preloader">
      <div className="preloader-content">
        <img src={logo} alt="MN Logo" className="preloader-logo simple-pulse" />
      </div>
    </div>
  );
};

export default Preloader;
