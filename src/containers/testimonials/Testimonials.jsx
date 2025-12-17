"use client";
import { useState, useEffect, useRef } from "react";
import "./testimonials.css";
import AddTestimonialModal from "../../components/AddTestimonialModal";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tp/testimonial");
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
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
    fetchTestimonials();
  }, []);

  const visibleCount = 4;

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => {
      const next = (prev + 1) % testimonials.length;
      setStartIndex((s) => {
        if (next >= s + visibleCount) {
          return Math.min(s + 1, Math.max(0, testimonials.length - visibleCount));
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
          return Math.min(next - visibleCount + 1, Math.max(0, testimonials.length - visibleCount));
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
              <AddTestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdded={fetchTestimonials} />
               <div className="testimonials-container">
                    <div className="testimonials-header">
                        <h2>ما يقوله عملاؤنا</h2>
                        <p>No testimonials yet.</p>
                        {isAdmin && <button onClick={() => setIsModalOpen(true)} style={{ marginTop: '10px', background: '#FF4820', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}>+ Add Testimonial</button>}
                    </div>
               </div>
          </section>
      )
  }

  return (
    <section className="testimonials-section" dir="rtl">
      <AddTestimonialModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdded={fetchTestimonials} />
      
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>ما يقوله عملاؤنا</h2>
          <p>آراء حقيقية من عملاء استخدموا خدماتنا</p>
          {isAdmin && <button onClick={() => setIsModalOpen(true)} style={{ marginTop: '10px', background: '#FF4820', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}>+ Add Testimonial</button>}
        </div>

        <div className="main-carousel-wrapper">
          {current && (
            <div className="testimonial-card-new">
                <p className="quote">"{current.text}"</p>
                <div className="author-row">
                <div>
                    <h4>{current.name}</h4>
                    {current.title && <p>{current.title}</p>}
                </div>
                </div>
            </div>
          )}

          <div className="testimonials-controls">
            <div className="testimonials-nav">
              <button className="nav-button" onClick={prevTestimonial}>‹</button>
              <button className="nav-button" onClick={nextTestimonial}>›</button>
            </div>

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
                        return Math.min(i - visibleCount + 1, Math.max(0, testimonials.length - visibleCount));
                      return s;
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="testimonials-grid">
          {testimonials
            .slice(startIndex, startIndex + visibleCount)
            .map((t, i) => (
              <div
                ref={(el) => (itemRefs.current[i] = el)}
                key={t._id}
                className={`grid-card-new ${startIndex + i === activeIndex ? "active" : ""}`}
                onClick={() => {
                  const origIndex = startIndex + i;
                  setActiveIndex(origIndex);
                  setStartIndex((s) => {
                    if (origIndex < s) return origIndex;
                    if (origIndex >= s + visibleCount)
                      return Math.min(origIndex - visibleCount + 1, Math.max(0, testimonials.length - visibleCount));
                    return s;
                  });
                }}
              >
                <p>"{t.text}"</p>
                <div className="grid-author">
                  <div>
                    <h5>{t.name}</h5>
                    {t.title && <p>{t.title}</p>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
