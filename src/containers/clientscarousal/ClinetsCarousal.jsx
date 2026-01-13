import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./clinetscarousal.css";
import clients1 from "../../assets/clients1.jpg";
import clients2 from "../../assets/clients2.jpg";
import clients3 from "../../assets/clients3.jpg";
import clients4 from "../../assets/clients4.jpg";
import clients5 from "../../assets/clients5.jpg";
import clients6 from "../../assets/clients6.jpg";
import clients7 from "../../assets/clients7.jpg";
import clients8 from "../../assets/clients8.jpg";
import clients9 from "../../assets/clients9.jpg";
import clients10 from "../../assets/clients10.png";
import clients11 from "../../assets/clients11.jpg";
import clients12 from "../../assets/clients12.jpg";
import clients13 from "../../assets/clients13.jpg";
import clients14 from "../../assets/clients14.png";
import clients15 from "../../assets/clients15.png";
import clients16 from "../../assets/clients16.jpg";
import API_URL from "../../apiConfig";

gsap.registerPlugin(ScrollTrigger);

const ClinetsCarousal = () => {
  /* 
     Removed Admin Logic:
     - No AddPartnerModal
     - No EditPartnerModal
     - No inline Delete/Edit buttons
  */

  const [partners, setPartners] = useState([]);
  const containerRef = useRef(null);

  // Default images fallback
  const clientImages = [
    clients1,
    clients2,
    clients3,
    clients4,
    clients5,
    clients6,
    clients7,
    clients8,
    clients9,
    clients10,
    clients11,
    clients12,
    clients13,
    clients14,
    clients15,
    clients16,
  ];

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tp/partner`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setPartners(data);
      } else {
        setPartners([]);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
      setPartners([]);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // Background Gradient Animation Removed (Moved to RecentWork)

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  // Decide what to show: Merge Default partners AND API partners
  const localPartners = clientImages.map((img, i) => ({
    _id: `local-${i}`,
    image: img,
    isLocal: true,
  }));
  const displayPartners = [...localPartners, ...partners];

  return (
    <div className="clients-wrapper" ref={containerRef}>
      <h2 className="clients-title">Our Partners in Success</h2>

      <div className="logos">
        <div className="logos-slide">
          {displayPartners.map((partner, index) => (
            <div
              key={partner._id || index}
              style={{
                position: "relative",
                display: "inline-block",
                margin: "0 40px",
              }}
            >
              <img
                src={
                  partner.isLocal ? partner.image : getImageUrl(partner.image)
                }
                alt={`Partner ${index + 1}`}
                style={{ margin: 0 }}
              />
            </div>
          ))}
        </div>

        <div className="logos-slide">
          {displayPartners.map((partner, index) => (
            <div
              key={`dup-${partner._id || index}`}
              style={{
                position: "relative",
                display: "inline-block",
                margin: "0 40px",
              }}
            >
              <img
                src={
                  partner.isLocal ? partner.image : getImageUrl(partner.image)
                }
                alt={`Partner ${index + 1}`}
                style={{ margin: 0 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinetsCarousal;
