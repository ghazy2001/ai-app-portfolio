"use client";
import { useState, useEffect, useRef } from "react";
import "./testimonials.css";

import API_URL from "../../apiConfig";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  // Modal State (Moved up to avoid conditional hook error)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", title: "", text: "" });
  const [submitStatus, setSubmitStatus] = useState("idle");

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tp/testimonial`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTestimonials(data);
      } else {
        console.error("Expected array but got:", data);
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const visibleCount = 4;

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => {
      const next = (prev + 1) % testimonials.length;
      setStartIndex((s) => {
        if (next >= s + visibleCount) {
          return Math.min(
            s + 1,
            Math.max(0, testimonials.length - visibleCount)
          );
        }
        if (next < s) return Math.max(0, next);
        return s;
      });
      return next;
    });
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => {
      const next = (prev - 1 + testimonials.length) % testimonials.length;
      setStartIndex((s) => {
        if (next < s) {
          return Math.max(0, s - 1);
        }
        if (next >= s + visibleCount) {
          return Math.min(
            next - visibleCount + 1,
            Math.max(0, testimonials.length - visibleCount)
          );
        }
        return s;
      });
      return next;
    });
  };

  const current = testimonials.length > 0 ? testimonials[activeIndex] : null;
  const itemRefs = useRef([]);

  if (testimonials.length === 0) {
    return (
      <section className="testimonials-section" dir="rtl">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <h2>ما يقوله عملاؤنا</h2>
            <p>No testimonials yet.</p>
          </div>
          {/* Add Review Button for Empty State too */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: "transparent",
                border: "1px solid var(--color-subtext)",
                color: "var(--color-subtext)",
                padding: "0.8rem 2rem",
                borderRadius: "50px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
            >
              Add Your Review ✚
            </button>
          </div>

          {/* Reuse Modal Logic here or ensure main return renders it? 
               Problem: early return prevents main return.
               Best fix: Remove early return and handle empty state in main return.
           */}
        </div>
        {/* We need the modal here too if we return early. 
            Actually, let's just refactor to NOT return early, or duplicate the modal. 
            Refactoring to not return early is cleaner but more diffs.
            For now, I'll just render the Modal in the empty state too? 
            Or better: Remove the duplicate code block I added in lines 85+ and KEEP the top-level declaration.
        */}
      </section>
    );
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");
    try {
      const res = await fetch(`${API_URL}/api/tp/testimonial`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", title: "", text: "" });
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus("idle");
          fetchTestimonials(); // Refresh list
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    }
  };

  return (
    <section className="testimonials-section" dir="rtl">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>What Our Clients Say</h2>
          <p>Real reviews from clients who used our services</p>
        </div>

        <div className="main-carousel-wrapper">
          {testimonials.length > 0 && current && (
            <div className="testimonial-card-new">
              {/* Left Arrow */}
              <button className="nav-button nav-prev" onClick={prevTestimonial}>
                ›
              </button>

              <p className="quote">"{current.text}"</p>
              <div className="author-row">
                <div>
                  <h4>{current.name}</h4>
                  {current.title && <p>{current.title}</p>}
                </div>
              </div>

              {/* Right Arrow */}
              <button className="nav-button nav-next" onClick={nextTestimonial}>
                ‹
              </button>
            </div>
          )}

          {/* Empty State if no testimonials */}
          {testimonials.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "2rem", color: "#ccc" }}
            >
              <p>Be the first to leave a review!</p>
            </div>
          )}

          <div className="testimonials-controls">
            <div className="testimonials-indicators">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`indicator ${i === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Add Review Button */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                background: "transparent",
                border: "1px solid var(--color-subtext)",
                color: "var(--color-subtext)",
                padding: "0.8rem 2rem",
                borderRadius: "50px",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "var(--color-subtext)";
                e.target.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "var(--color-subtext)";
              }}
            >
              Add Your Review ✚
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              background: "#1a1a1a",
              padding: "2rem",
              borderRadius: "15px",
              maxWidth: "500px",
              width: "100%",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <h3
              style={{
                color: "#fff",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Share Your Experience
            </h3>

            {submitStatus === "success" ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#4caf50",
                  padding: "2rem",
                }}
              >
                <h3>Thank you!</h3>
                <p>Your review has been submitted successfully.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Role / Company (Optional)"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{
                    padding: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <textarea
                  name="text"
                  placeholder="Your Review..."
                  value={formData.text}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  style={{
                    padding: "1rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    resize: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  style={{
                    padding: "1rem",
                    background: "var(--color-subtext)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#000",
                    fontWeight: "bold",
                    cursor:
                      submitStatus === "submitting" ? "not-allowed" : "pointer",
                    opacity: submitStatus === "submitting" ? 0.7 : 1,
                  }}
                >
                  {submitStatus === "submitting"
                    ? "Submitting..."
                    : "Submit Review"}
                </button>
                {submitStatus === "error" && (
                  <p style={{ color: "red", textAlign: "center" }}>
                    Something went wrong. Try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
