import React, { useState } from "react";
import "./resultsAnalysis.css";
import { FaMeta, FaTiktok } from "react-icons/fa6";

import result1 from "../../assets/result1.jpg";
import result2 from "../../assets/result2.jpg";
import result3 from "../../assets/result3.jpg"; // Central/Dashboard Image

const ResultsAnalysis = () => {
  const [activeCard, setActiveCard] = useState(null);

  const handleMouseEnter = (cardId) => setActiveCard(cardId);
  const handleMouseLeave = () => setActiveCard(null);

  return (
    <div className="results-analysis section__padding" id="results">
      <div className="results-header">
        <h1 className="gradient-text">Results & Analysis</h1>
        <p className="results-subtext">
          Unlocking Infinite Possibilities with Data-Driven Precision.
        </p>
      </div>

      <div className="results-grid">
        {/* Meta Section */}
        <div
          className="result-card meta-card"
          onMouseEnter={() => handleMouseEnter("meta")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-line meta-line"></div>
          {/* Hover Image */}

          <div className="card-content-wrapper">
            <div className="card-header">
              <FaMeta size={40} color="#1877F2" />
              <h3>Meta Dominance</h3>
            </div>
            <div className="card-stats">
              <div className="stat-row">
                <span className="stat-label">ROAS</span>
                <span className="stat-value">11.67</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Sales Value</span>
                <span className="stat-value">
                  9.47M <span className="currency">EGP</span>
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Purchases</span>
                <span className="stat-value">26,236</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Conv. Rate</span>
                <span className="stat-value">4.3%</span>
              </div>
            </div>
            <p className="card-desc">
              High-efficiency campaigns focusing on maximizing ROAS and
              stabilizing long-term growth through AI-driven targeting.
            </p>
          </div>
        </div>

        {/* Center / Overall Stats */}
        <div
          className="result-card center-card"
          onMouseEnter={() => handleMouseEnter("center")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-content-wrapper">
            <div className="center-stat-main">
              <span className="big-number">13M+</span>
              <span className="big-label">Total Revenue Generated</span>
            </div>

            <div className="center-divider"></div>

            <div className="secondary-stats">
              <div className="sec-stat">
                <span className="sec-val">4.2M</span>
                <span className="sec-lbl">Net Profit</span>
              </div>
              <div className="sec-stat">
                <span className="sec-val">36K+</span>
                <span className="sec-lbl">Total Orders</span>
              </div>
            </div>

            <p className="center-desc">
              Comprehensive strategy delivering sustainable growth and high
              profit margins across all channels.
            </p>
          </div>
        </div>

        {/* TikTok Section */}
        <div
          className="result-card tiktok-card"
          onMouseEnter={() => handleMouseEnter("tiktok")}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card-line tiktok-line"></div>

          <div className="card-content-wrapper">
            <div className="card-header">
              <FaTiktok size={40} color="#FE2C55" />{" "}
              {/* Using Brand Color, will mix with cyan in CSS if needed */}
              <h3>TikTok Velocity</h3>
            </div>
            <div className="card-stats">
              <div className="stat-row">
                <span className="stat-label">ROAS</span>
                <span className="stat-value">15.89</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Sales Value</span>
                <span className="stat-value">
                  3.61M <span className="currency">EGP</span>
                </span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Purchases</span>
                <span className="stat-value">9,970</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Conv. Rate</span>
                <span className="stat-value">5.8%</span>
              </div>
            </div>
            <p className="card-desc">
              Explosive brand awareness and rapid acquisition through
              trend-setting creative strategies and viral content.
            </p>
          </div>
        </div>
      </div>

      {/* Global Image Popup (Fixed Center) */}
      <div className={`results-popup-overlay ${activeCard ? "active" : ""}`}>
        {activeCard === "meta" && <img src={result1} alt="Meta Proof" />}
        {activeCard === "center" && <img src={result3} alt="Dashboard Proof" />}
        {activeCard === "tiktok" && <img src={result2} alt="TikTok Proof" />}
      </div>
    </div>
  );
};

export default ResultsAnalysis;
