import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./clinetscarousal.css";
// New Branded Assets Imports
import caro1 from "../../assets/caro1.png";
import caro2 from "../../assets/caro2.png";
import caro3 from "../../assets/caro3.png";
import caro4 from "../../assets/caro4.png";
import caro5 from "../../assets/caro5.png";
import caro6 from "../../assets/caro6.png";
import caro7 from "../../assets/caro7.png";

gsap.registerPlugin(ScrollTrigger);

const ClinetsCarousal = () => {
  const containerRef = useRef(null);

  // New specific logos as requested
  const allImages = [
    caro1,
    caro2,
    caro3,
    caro4,
    caro5,
    caro6,
    caro7,
    // Duplicate for length if needed
    caro1,
    caro2,
    caro3,
    caro4,
  ];

  return (
    <div className="clients-wrapper" ref={containerRef}>
      <h2 className="clients-title">Our Partners in Success</h2>

      {/* Container restricted to 50% width by CSS */}
      <div className="logos-container-split">
        <div className="logos-row">
          <div className="logos-slide">
            {/* Quadruple duplication for seamless infinite loop on wide screens */}
            {allImages.map((img, index) => (
              <div key={`logo-1-${index}`} className="logo-item">
                <img src={img} alt="" />
              </div>
            ))}
            {allImages.map((img, index) => (
              <div key={`logo-2-${index}`} className="logo-item">
                <img src={img} alt="" />
              </div>
            ))}
            {allImages.map((img, index) => (
              <div key={`logo-3-${index}`} className="logo-item">
                <img src={img} alt="" />
              </div>
            ))}
            {allImages.map((img, index) => (
              <div key={`logo-4-${index}`} className="logo-item">
                <img src={img} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinetsCarousal;
