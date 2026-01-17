import { useState, useRef, useEffect } from "react";
import { FaMeta, FaTiktok } from "react-icons/fa6";
import { RiCloseLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import "./possibility.css";

// TikTok Glitch Icon Component
const TikTokGlitchIcon = () => {
  return (
    <div className="icon-3d-scene">
      {/* Wrapper fills the parent .icon-3d-scene (sized by CSS) */}
      <div
        className="icon-3d-wrapper"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Cyan Layer (Top Left) */}
        <div
          style={{
            position: "absolute",
            top: "-4px",
            left: "-4px",
            width: "100%",
            height: "100%",
            color: "#25F4EE",
            mixBlendMode: "screen",
            zIndex: 1,
          }}
        >
          <FaTiktok style={{ width: "100%", height: "100%" }} />
        </div>
        {/* Red Layer (Bottom Right) */}
        <div
          style={{
            position: "absolute",
            top: "4px",
            left: "4px",
            width: "100%",
            height: "100%",
            color: "#FE2C55",
            mixBlendMode: "screen",
            zIndex: 1,
          }}
        >
          <FaTiktok style={{ width: "100%", height: "100%" }} />
        </div>
        {/* White Layer (Center) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            color: "#FFFFFF",
            zIndex: 2,
          }}
        >
          <FaTiktok style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </div>
  );
};

// Helper for True 3D Icon Effect (Optimized DOM Layering)
const ThreeDIcon = ({
  icon: Icon,
  color,
  shadowColor = "#000",
  layers = 15,
}) => {
  return (
    <div className="icon-3d-scene">
      <div className="icon-3d-wrapper">
        {Array.from({ length: layers }).map((_, i) => (
          <div
            key={i}
            className="icon-layer"
            style={{
              color: shadowColor,
              transform: `translateZ(-${i}px)`,
              opacity: 1,
            }}
          >
            <Icon style={{ width: "100%", height: "100%" }} />
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: color,
            transform: "translateZ(1px)",
            zIndex: 10,
          }}
        >
          <Icon style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    </div>
  );
};

const Possibility = () => {
  const [showModal, setShowModal] = useState(false);

  // Load Result Images Dynamically
  const resAssets = import.meta.glob("../../assets/res*.{png,jpg,jpeg}", {
    eager: true,
  });
  const resImages = Object.keys(resAssets).map(
    (key) => resAssets[key].default || resAssets[key],
  );

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Lock scroll body
    document.documentElement.style.overflow = "hidden"; // Lock scroll html
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto"; // Unlock scroll body
    document.documentElement.style.overflow = "auto"; // Unlock scroll html
  };

  /* Lightbox Logic */
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const lightboxRef = useRef(null); // Ref for non-passive listener

  const openLightbox = (img) => {
    setSelectedImage(img);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Attach non-passive wheel listener to prevent scrolling reliably
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    if (selectedImage && lightboxRef.current) {
      // We need to attach this manually to use { passive: false } if needed,
      // though mostly e.preventDefault() works better in native listener for 'wheel'
      const curr = lightboxRef.current;
      curr.addEventListener("wheel", handleWheelNative, { passive: false });
      return () => curr.removeEventListener("wheel", handleWheelNative);
    }
  }, [selectedImage, zoom]); // Re-bind if needed, or just keep stable

  // Native wheel handler to ensure we can preventDefault
  const handleWheelNative = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setZoom((prevZoom) => {
      const result = prevZoom + e.deltaY * -0.001;
      return Math.min(Math.max(0.5, result), 4);
    });
  };

  // Drag Handlers
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default drag behavior
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      e.preventDefault();
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="possibility section__padding" id="possibility">
      {/* Header */}
      <div className="possibility-header">
        <h1 className="possibility-title-white">
          Unlocking Infinite Possibilities
        </h1>
        <p className="possibility-subtext">
          We leverage the world's most powerful platforms to scale your brand
          beyond limits.
        </p>
      </div>

      {/* Strategy Content */}
      <div className="possibility-container">
        {/* Meta Strategy Card */}
        <div className="strategy-card meta-card">
          <div className="card-icon-container">
            <ThreeDIcon
              icon={FaMeta}
              color="#1877F2"
              shadowColor="rgba(0,0,0,0.5)"
            />
          </div>
          <div className="card-content">
            <h3>Precision Scaling</h3>
            <p>
              Harnessing AI-driven targeting to maximize ROAS and stabilize
              long-term growth.
            </p>
          </div>
        </div>

        {/* Center Stats (Connecting the two) */}
        <div className="stats-center">
          <div className="stat-item">
            <span className="stat-number">13M+</span>
            <span className="stat-label">Total Revenue Generated</span>
          </div>
        </div>

        {/* TikTok Strategy Card */}
        <div className="strategy-card tiktok-card">
          <div className="card-icon-container">
            <TikTokGlitchIcon />
          </div>
          <div className="card-content">
            <h3>Viral Velocity</h3>
            <p>
              Explosive brand awareness and rapid acquisition through
              trend-setting creative strategies.
            </p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="possibility-footer">
        <button className="cta-button" onClick={openModal}>
          Explore Case Studies
        </button>
      </div>

      {/* Results Modal */}
      {showModal && (
        <div
          className="results-modal-overlay"
          onClick={closeModal}
          data-lenis-prevent
        >
          <div
            className="results-modal-content"
            onClick={(e) => e.stopPropagation()} // Prevent close on content click
          >
            <button className="close-modal-btn" onClick={closeModal}>
              <RiCloseLine size={30} />
            </button>
            <div className="results-modal-header">
              <h2>Proven Results</h2>
              <p>Real performance data from our featured campaigns.</p>
            </div>
            <div className="results-gallery">
              {resImages.map((img, index) => (
                <div
                  key={index}
                  className="result-item"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal close logic if bubbly
                    openLightbox(img);
                  }}
                >
                  <img src={img} alt={`Result ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Lightbox */}
      {selectedImage && (
        <div
          ref={lightboxRef}
          className="lightbox-overlay"
          onClick={closeLightbox}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          data-lenis-prevent
        >
          <button className="close-lightbox-btn" onClick={closeLightbox}>
            <RiCloseLine size={40} />
          </button>
          <img
            src={selectedImage}
            alt="Full Screen Result"
            className="lightbox-image"
            onMouseDown={handleMouseDown}
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Possibility;
