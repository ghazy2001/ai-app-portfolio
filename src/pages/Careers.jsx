import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { Footer } from "../containers";
import EditableText from "../components/EditableText";
import AddJobModal from "../components/AddJobModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./contact.css";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const handleDeleteJob = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setJobs(jobs.filter((job) => job._id !== id));
      }
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <>
      <Navbar />
      <AddJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onJobAdded={(newJob) => setJobs([newJob, ...jobs])}
      />

      <main className="section__padding">
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            marginTop: "2rem",
          }}
        >
          <EditableText
            section="careers"
            contentKey="pageTitle"
            defaultContent="انضم إلى فريقنا"
            type="h1"
            className="gradient__text"
            style={{ fontSize: "62px", fontWeight: "800" }}
          />
          <EditableText
            section="careers"
            contentKey="pageDesc"
            defaultContent="نحن نبحث دائماً عن المبدعين والشغوفين لبناء مستقبل رقمي أفضل."
            type="p"
            className="text-color"
            style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}
          />
        </div>

        {/* Culture Section */}
        <div
          className="contact-container"
          style={{ alignItems: "center", marginBottom: "6rem" }}
        >
          <div style={{ flex: 1 }}>
            <EditableText
              section="careers"
              contentKey="cultureTitle"
              defaultContent="بيئة عمل ملهمة"
              type="h2"
              className="gradient__text"
            />
            <EditableText
              section="careers"
              contentKey="cultureText"
              defaultContent="في MN Agency، نؤمن بأن الإبداع يزدهر في بيئة تدعم التعلم والنمو. نحن لا نوظف مجرد موظفين، بل شركاء في النجاح."
              type="p"
              className="text-color"
              style={{ marginTop: "1rem", lineHeight: "1.8" }}
            />
          </div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "80%",
                height: "300px",
                background: "var(--color-footer)",
                borderRadius: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h3 style={{ color: "rgba(255,255,255,0.2)" }}>Team Photo</h3>
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
              position: "relative",
            }}
          >
            <EditableText
              section="careers"
              contentKey="jobsTitle"
              defaultContent="الوظائف المتاحة"
              type="h2"
              className="gradient__text"
            />
            {user && user.role === "admin" && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="submit-btn"
                style={{
                  marginTop: "1rem",
                  fontSize: "14px",
                  padding: "0.5rem 1.5rem",
                }}
              >
                Add New Job
              </button>
            )}
          </div>

          {jobs.length === 0 ? (
            <p style={{ textAlign: "center", color: "#fff" }}>
              No job openings at the moment.
            </p>
          ) : (
            jobs.map((job) => (
              <div
                key={job._id}
                style={{
                  background: "var(--color-footer)",
                  padding: "2rem",
                  borderRadius: "1rem",
                  marginBottom: "2rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      color: "#fff",
                      marginBottom: "0.5rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    {job.title}
                  </h3>
                  <p className="text-color" style={{ fontSize: "0.9rem" }}>
                    {job.location} ({job.type})
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <button
                    className="submit-btn"
                    style={{ marginTop: 0, padding: "0.75rem 2rem" }}
                  >
                    تقدم للوظيفة
                  </button>
                  {user && user.role === "admin" && (
                    <RiDeleteBin6Line
                      size={20}
                      color="#ff4d4d"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteJob(job._id)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Careers;
