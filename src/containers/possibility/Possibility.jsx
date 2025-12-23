"use client";

import { FaMeta, FaTiktok } from "react-icons/fa6";

import { Link } from "react-router-dom";
import "./possibility.css";

// TikTok Glitch Icon Component
const TikTokGlitchIcon = () => {
  return (
    <div className="icon-3d-scene">
      {/* Wrapper fills the parent .icon-3d-scene (sized by CSS) */}
      <div className="icon-3d-wrapper" style={{ width: '100%', height: '100%' }}>
        {/* Cyan Layer (Top Left) */}
        <div style={{ position: 'absolute', top: '-4px', left: '-4px', width: '100%', height: '100%', color: '#25F4EE', mixBlendMode: 'screen', zIndex: 1 }}>
          <FaTiktok style={{ width: '100%', height: '100%' }} />
        </div>
        {/* Red Layer (Bottom Right) */}
        <div style={{ position: 'absolute', top: '4px', left: '4px', width: '100%', height: '100%', color: '#FE2C55', mixBlendMode: 'screen', zIndex: 1 }}>
          <FaTiktok style={{ width: '100%', height: '100%' }} />
        </div>
        {/* White Layer (Center) */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', color: '#FFFFFF', zIndex: 2 }}>
          <FaTiktok style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
};

// Helper for True 3D Icon Effect (Optimized DOM Layering)
const ThreeDIcon = ({ icon: Icon, color, shadowColor = "#000", layers = 15 }) => {
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
              opacity: 1
            }}
          >
            <Icon style={{ width: '100%', height: '100%' }} />
          </div>
        ))}
         <div style={{ position: 'absolute', inset: 0, color: color, transform: 'translateZ(1px)', zIndex: 10 }}>
           <Icon style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </div>
  );
};

const Possibility = () => {
  return (
    <div className="possibility section__padding" id="possibility">
      
      {/* Header */}
      <div className="possibility-header">
        <h1 className="possibility-title-white">Unlocking Infinite Possibilities</h1>
        <p className="possibility-subtext">
          We leverage the world's most powerful platforms to scale your brand beyond limits.
        </p>
      </div>

      {/* Strategy Content */}
      <div className="possibility-container">
        
        {/* Meta Strategy Card */}
        <div className="strategy-card meta-card">
          <div className="card-icon-container">
            <ThreeDIcon icon={FaMeta} color="#1877F2" shadowColor="rgba(0,0,0,0.5)" />
          </div>
          <div className="card-content">
            <h3>Precision Scaling</h3>
            <p>Harnessing AI-driven targeting to maximize ROAS and stabilize long-term growth.</p>
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
            <p>Explosive brand awareness and rapid acquisition through trend-setting creative strategies.</p>
          </div>
        </div>

      </div>

      {/* Footer CTA */}
      <div className="possibility-footer">
        
        <Link to="/portfolio">
          <button className="cta-button">Explore Case Studies</button>
        </Link>
      </div>

    </div>
  );
};

export default Possibility;
