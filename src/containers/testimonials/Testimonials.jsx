"use client";
import { useState, useEffect, useRef } from "react";
import "./testimonials.css";

import API_URL from "../../apiConfig";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

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
        </div>
      </section>
    );
  }

  return (
    <section className="testimonials-section" dir="rtl">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>What Our Clients Say</h2>
          <p>Real reviews from clients who used our services</p>
        </div>

        <div className="main-carousel-wrapper">
          {current && (
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

          <div className="testimonials-controls">
            {/* Nav buttons moved out */}
            <div className="testimonials-indicators">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`indicator ${i === activeIndex ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(i);
                    setStartIndex((s) => {
                      if (i < s) return i;
                      if (i >= s + visibleCount)
                        return Math.min(
                          i - visibleCount + 1,
                          Math.max(0, testimonials.length - visibleCount)
                        );
                      return s;
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
