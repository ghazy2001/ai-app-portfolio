import React from "react";
import { Navbar } from "../components";
import { Footer, Contact } from "../containers";

import servicesData from "../constants/servicesData";
import "./services.css";

const Services = () => {
  return (
    <>
      <div className="gradient__bg">
        <Navbar />
      </div>
      <main className="services-section section__padding" dir="ltr">
        {/* Header */}
        <div className="services-header">
          <h1
            className="services-title"
            style={{
              fontSize: "62px",
              fontWeight: "800",
              lineHeight: "1.2",
              color: "#fff",
            }}
          >
            Transforming Ideas into Digital Reality
          </h1>
          <p
            className="text-color"
            style={{ fontSize: "18px", marginTop: "1rem" }}
          >
            We offer integrated solutions combining creativity and technology to
            achieve sustainable growth for your business.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon-wrapper">
                <service.icon size={30} color="#D4AF37" />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.text}</p>
              <a href="#contact" className="service-link">
                Start Project →
              </a>
            </div>
          ))}
        </div>
      </main>
      <Contact />
      <Footer />
    </>
  );
};

export default Services;
