import React, { useState } from "react";
import { Navbar } from "../components";
import { Footer } from "../containers";
import ContactContainer from "../containers/contact/Contact"; // Renaming import to avoid conflict
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import "./contact.css";

const Contact = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer comprehensive digital marketing services including social media management, SEO, content creation, visual identity design, web development, and performance marketing campaigns tailored to your business goals."
    },
    {
      question: "How much does a project usually cost?",
      answer: "Costs vary depending on the scope and requirements of the project. We offer flexible packages suitable for startups as well as established enterprises. Contact us for a custom quote based on your specific needs."
    },
    {
      question: "How long does it take to complete a project?",
      answer: "Project timelines depend on complexity. A simple social media strategy might take 2 weeks to launch, while a full website overhaul could take 4-6 weeks. We provide detailed timelines before starting any work."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes, we believe in long-term partnerships. We offer monthly retainer packages for social media management, SEO maintenance, and website support to ensure consistent growth."
    }
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <>
      <div className="gradient__bg">
        <Navbar />
      </div>
      
      {/* Reusing the shared Contact Container */}
      <ContactContainer />

      {/* Professional FAQ Section */}
      <div className="section__padding" style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "6rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1rem", color: "#fff" }}>Frequently Asked Questions</h2>
          <p style={{ color: "#aebec9", fontSize: "1.1rem" }}>Everything you need to know about working with us.</p>
        </div>

        <div className="faq-wrapper" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
              style={{
                background: activeFaq === index ? "rgba(4, 12, 24, 0.8)" : "transparent",
                border: "1px solid rgba(212, 175, 55, 0.2)",
                borderRadius: "10px",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ color: activeFaq === index ? "#D4AF37" : "#fff", margin: 0, fontSize: "1.2rem", fontWeight: "600", transition: "color 0.3s" }}>
                  {faq.question}
                </h4>
                {activeFaq === index ? 
                  <RiSubtractLine color="#D4AF37" size={24} /> : 
                  <RiAddLine color="#fff" size={24} />
                }
              </div>
              
              <div 
                style={{
                  maxHeight: activeFaq === index ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease, opacity 0.3s ease",
                  opacity: activeFaq === index ? 1 : 0
                }}
              >
                <p style={{ color: "#aebec9", marginTop: "1rem", lineHeight: "1.6", fontSize: "1rem" }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
