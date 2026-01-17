import React, { useState, useEffect } from "react";
import API_URL from "../../apiConfig";

const JobManager = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full-time",
    description: "",
    image: null,
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/jobs`);
      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setJobs(jobs.filter((j) => j._id !== id));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("token"); // Not needed for secret link

    const data = new FormData();
    data.append("title", formData.title);
    data.append("location", formData.location);
    data.append("type", formData.type);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: {
          // 'Authorization': `Bearer ${token}`
        },
        body: data,
      });

      if (res.ok) {
        const newJob = await res.json();
        setJobs([newJob, ...jobs]);
        setFormData({
          title: "",
          location: "",
          type: "Full-time",
          description: "",
          image: null,
        });
        alert("Job added successfully!");
      } else {
        const errorData = await res.json();
        alert(`Failed to add job: ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert(`Network/Server Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 style={{ color: "#ffd700", marginBottom: "1.5rem" }}>Manage Jobs</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "3rem",
          background: "rgba(255,255,255,0.05)",
          padding: "1.5rem",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Job Title (e.g. Graphic Designer)"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Location (e.g. Remote / On-site)"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            style={inputStyle}
          >
            <option
              value="Full-time"
              style={{ background: "#333", color: "#fff" }}
            >
              Full-time
            </option>
            <option
              value="Part-time"
              style={{ background: "#333", color: "#fff" }}
            >
              Part-time
            </option>
            <option
              value="Freelance"
              style={{ background: "#333", color: "#fff" }}
            >
              Freelance
            </option>
            <option
              value="Internship"
              style={{ background: "#333", color: "#fff" }}
            >
              Internship
            </option>
          </select>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            style={inputStyle}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            placeholder="Job Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            style={{ ...inputStyle, minHeight: "100px" }}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Add Job
        </button>
      </form>

      <div style={{ display: "grid", gap: "1rem" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job) => (
            <div key={job._id} style={itemStyle}>
              <div>
                <h4 style={{ margin: "0 0 0.5rem 0", color: "#fff" }}>
                  {job.title}
                </h4>
                <p style={{ margin: 0, color: "#aaa", fontSize: "0.9rem" }}>
                  {job.location} • {job.type}
                </p>
              </div>
              <button
                onClick={() => handleDelete(job._id)}
                style={deleteBtnStyle}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.8rem",
  background: "rgba(0,0,0,0.3)",
  border: "1px solid #ffd700",
  borderRadius: "5px",
  color: "#fff",
  fontFamily: "inherit",
};

const buttonStyle = {
  padding: "0.8rem 2rem",
  background: "#ffd700",
  color: "#000",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

const itemStyle = {
  background: "rgba(255,255,255,0.03)",
  padding: "1rem",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid rgba(255,255,255,0.05)",
};

const deleteBtnStyle = {
  background: "transparent",
  color: "#ff4820",
  border: "1px solid #ff4820",
  padding: "0.5rem 1rem",
  borderRadius: "5px",
  cursor: "pointer",
};

export default JobManager;
