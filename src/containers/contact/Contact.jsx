import React, { useState, useEffect, useRef } from "react";
import "./contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  RiWhatsappFill,
  RiInstagramLine,
  RiFacebookCircleFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import API_URL from "../../apiConfig";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const [selectedBudget, setSelectedBudget] = useState(500);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    referral: "",
    interests: [],
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Background Revert Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center", // When contact section hits center
        end: "bottom center",
        onEnter: () => {
          // Revert to original Blue when scrolling down into Contact
          gsap.to(document.documentElement, {
            "--bg-grad-center": "rgba(0, 40, 83, 1)",
            "--bg-grad-outer": "#040c18",
            duration: 1.5,
            overwrite: "auto",
          });
        },
        onLeaveBack: () => {
          // Darken again when scrolling back up to Testimonials
          gsap.to(document.documentElement, {
            "--bg-grad-center": "rgba(0, 15, 30, 1)", // Deep Dark Blue
            "--bg-grad-outer": "#000000", // Black
            duration: 1.5,
            overwrite: "auto",
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestClick = (interest) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, budget: `${selectedBudget} EGP` }),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
          referral: "",
          interests: [],
        });
        setSelectedBudget(500);
      } else {
        const data = await res.json();
        setError(data.message || "Something went wrong");
      }
    } catch {
      setError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="MN__contact section__padding"
      id="contact"
      ref={containerRef}
    >
      <div className="MN__contact-container">
        {/* Left Side: Contact Info */}
        <div className="MN__contact-info">
          <div className="contact-header">
            <h2>Contact Us</h2>
            <p>Let's create something extraordinary together.</p>
          </div>

          <div className="contact-details">
            <div className="contact-item">
              <div className="icon-circle">
                <MdPhone />
              </div>
              <div className="contact-text">
                <a href="tel:+201556971874">+20 15 56971874</a>
                <a href="tel:+966574295501">+966 57 429 5501</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-circle">
                <MdEmail />
              </div>
              <div className="contact-text">
                <a href="mailto:info@mnmarketingagency.com">
                  info@mnmarketingagency.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-circle">
                <MdLocationOn />
              </div>
              <div className="contact-text">
                <a
                  href="https://maps.app.goo.gl/..."
                  target="_blank"
                  rel="noreferrer"
                >
                  Gharbia Governorate, El-Mahalla el-Kubra, Egypt
                </a>
              </div>
            </div>
          </div>

          <div className="contact-socials">
            <a href="https://wa.me/..." target="_blank" rel="noreferrer">
              <RiWhatsappFill />
            </a>
            <a
              href="https://instagram.com/..."
              target="_blank"
              rel="noreferrer"
            >
              <RiInstagramLine />
            </a>
            <a href="https://facebook.com/..." target="_blank" rel="noreferrer">
              <RiFacebookCircleFill />
            </a>
            <a href="https://linkedin.com/..." target="_blank" rel="noreferrer">
              <RiLinkedinFill />
            </a>
            <a href="https://tiktok.com/..." target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Right Side: Complex Form */}
        <div className="MN__contact-form-wrapper">
          <form className="MN__contact-form" onSubmit={handleSubmit}>
            <div className="form-group-row">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">What are you interested in?</label>
              <div className="form-options-grid">
                {[
                  "Brand Strategy",
                  "Content Strategy",
                  "Web Design",
                  "App Development",
                  "SEO & Marketing",
                  "Media Production",
                ].map((opt) => (
                  <div
                    key={opt}
                    className={`option-pill ${
                      formData.interests.includes(opt) ? "active" : ""
                    }`}
                    onClick={() => handleInterestClick(opt)}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Budget</label>
              <div className="budget-slider-container">
                <div className="budget-value-display">
                  {selectedBudget
                    ? Number(selectedBudget).toLocaleString()
                    : "500"}{" "}
                  EGP
                </div>
                <div className="range-wrapper">
                  <input
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={selectedBudget}
                    className="budget-range"
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    style={{
                      backgroundSize: `${
                        ((selectedBudget - 500) * 100) / (50000 - 500)
                      }% 100%`,
                    }}
                  />
                </div>
                <div className="budget-labels">
                  <span>500 EGP</span>
                  <span>50,000 EGP+</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us about your project goals..."
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="contact-submit-btn golden-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
            {success && (
              <p className="success-msg">Message sent successfully!</p>
            )}
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
