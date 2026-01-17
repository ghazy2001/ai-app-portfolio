import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { Footer, Contact } from "../containers";
import API_URL from "../apiConfig";
import "./careers.css";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false); // Adding is handled in dashboard

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/jobs`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  return (
    <>
      <div className="gradient__bg">
        <Navbar />
      </div>
      <div className="careers-page section__padding" dir="ltr">
        {/* Hero Section */}
        <div className="careers-hero">
          <div className="careers-hero-content">
            <h1
              style={{
                color: "#fff",
                fontSize: "3.5rem",
                fontWeight: "800",
                marginBottom: "1.5rem",
              }}
            >
              Join Our Team
            </h1>
            <p
              style={{
                color: "#bdbdbd",
                fontSize: "1.2rem",
                lineHeight: "1.8",
                maxWidth: "500px",
                marginBottom: "2rem",
              }}
            >
              Be part of a creative and passionate team dedicated to redefining
              the future of digital marketing. We are always looking for
              talented individuals who share our vision and drive for
              excellence.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("openings")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="careers-btn"
              style={{ cursor: "pointer" }}
            >
              View Openings
            </button>
          </div>
          <div className="careers-hero-image">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Our Team"
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="careers-benefits">
          <h2>Why Work With Us?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h3>🚀 Growth Opportunities</h3>
              <p>
                Continuous learning and development paths to help you reach your
                full potential.
              </p>
            </div>
            <div className="benefit-card">
              <h3>💡 Creative Environment</h3>
              <p>
                A workspace that encourages innovation, new ideas, and
                out-of-the-box thinking.
              </p>
            </div>
            <div className="benefit-card">
              <h3>🤝 Collaborative Culture</h3>
              <p>
                Work with a supportive team that values cooperation and mutual
                success.
              </p>
            </div>
          </div>
        </div>

        {/* Openings Section */}
        <div id="openings" className="careers-openings">
          <h2>Current Openings</h2>

          <div className="jobs-list">
            {jobs.length === 0 ? (
              <div
                style={{ textAlign: "center", color: "#ccc", padding: "2rem" }}
              >
                <p>No current openings. Check back later!</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job._id} className="job-card">
                  <div className="job-info">
                    {job.image && (
                      <img
                        src={
                          job.image.startsWith("http")
                            ? job.image
                            : `${API_URL}/${job.image}`
                        }
                        alt={job.title}
                        className="job-image"
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          marginBottom: "1rem",
                          maxHeight: "200px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <h3>{job.title}</h3>
                    <span>
                      {job.type} | {job.location}
                    </span>
                    <p>{job.description}</p>
                  </div>
                  <button className="apply-btn">Apply Now</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  );
};

export default Careers;
