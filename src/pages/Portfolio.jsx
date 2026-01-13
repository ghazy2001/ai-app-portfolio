import React, { useState } from "react";
import { Navbar } from "../components";
import {
  Footer,
  Contact,
  Possibility,
  WorkHighlight,
  ResultsAnalysis,
} from "../containers";
import { brands } from "../data/portfolioData";
import { RiCloseLine } from "react-icons/ri";
import "./portfolio.css";

const Portfolio = () => {
  const [selectedBrand, setSelectedBrand] = useState(null);

  const openAlbum = (brand) => {
    setSelectedBrand(brand);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // Stronger lock
  };

  const closeAlbum = () => {
    setSelectedBrand(null);
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  };

  return (
    <div className="portfolio-page">
      <Navbar />

      <div className="portfolio-intro-header">
        <div className="header-top-row">
          <div className="work-section-label">Latest works</div>
          <div className="work-header-dot"></div>
        </div>
        <p className="work-section-intro">
          Selected projects that define our commitment to digital excellence.
        </p>
      </div>

      <WorkHighlight openAlbum={openAlbum} />

      {/* Album Modal */}
      {selectedBrand && (
        <div className="album-modal" data-lenis-prevent>
          <div className="album-header">
            <h2>{selectedBrand.title}</h2>
            <button className="close-album-btn" onClick={closeAlbum}>
              <RiCloseLine size={30} />
            </button>
          </div>
          <div className="album-grid">
            {selectedBrand.album.map((item, idx) => (
              <div key={idx} className="album-item">
                {item.endsWith(".mp4") || item.endsWith(".MOV") ? (
                  <video src={item} controls className="album-media" />
                ) : (
                  <img src={item} alt="Brand Asset" className="album-media" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ResultsAnalysis />
      <Contact />
      <Footer />
    </div>
  );
};

export default Portfolio;
