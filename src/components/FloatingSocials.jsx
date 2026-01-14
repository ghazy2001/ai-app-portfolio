import React, { useState } from "react";
import "./floatingSocials.css";
import {
  RiWhatsappFill,
  RiInstagramLine,
  RiFacebookCircleFill,
  RiLinkedinFill,
  RiShareLine,
  RiCloseLine,
} from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";

const FloatingSocials = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSocials = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mn-floating-container">
      {/* 2. Socials Toggle & Menu (Now "Outside" / Left) */}
      <div className={`mn-socials-wrapper ${isOpen ? "open" : ""}`}>
        {/* The Menu Items (Hidden by default, slide out/up) */}
        <div className="mn-socials-list">
          <a
            href="https://www.instagram.com/mn_marketingagency.eg"
            target="_blank"
            rel="noreferrer"
            className="social-mini-btn instagram"
            title="Instagram"
          >
            <RiInstagramLine />
          </a>
          <a
            href="https://www.facebook.com/mnmarketing.eg"
            target="_blank"
            rel="noreferrer"
            className="social-mini-btn facebook"
            title="Facebook"
          >
            <RiFacebookCircleFill />
          </a>
          <a
            href="https://www.linkedin.com/company/mnmarketingagency/"
            target="_blank"
            rel="noreferrer"
            className="social-mini-btn linkedin"
            title="LinkedIn"
          >
            <RiLinkedinFill />
          </a>
          <a
            href="https://www.tiktok.com/@mnmarketing.eg"
            target="_blank"
            rel="noreferrer"
            className="social-mini-btn tiktok"
            title="TikTok"
          >
            <FaTiktok />
          </a>
        </div>

        {/* The Toggle Button */}
        <button
          className="mn-socials-toggle"
          onClick={toggleSocials}
          title="More Socials"
        >
          {isOpen ? <RiCloseLine /> : <RiShareLine />}
        </button>
      </div>

      {/* 1. Main WhatsApp Button (Now "Inside" / Right) */}
      <a
        href="https://wa.me/201556971874"
        target="_blank"
        rel="noreferrer"
        className="mn-whatsapp-btn"
        title="Chat on WhatsApp"
      >
        <RiWhatsappFill />
      </a>
    </div>
  );
};

export default FloatingSocials;
