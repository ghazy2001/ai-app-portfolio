import React, { useState, useEffect } from "react";
import API_URL from "../../apiConfig";

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use the env password as token directly (Simple API Key Auth)
        const token = import.meta.env.VITE_ADMIN_PASSWORD;

        const res = await fetch(`${API_URL}/api/analytics/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch statistics");

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Could not load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div style={{ color: "#fff" }}>Loading stats...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!stats) return null;

  return (
    <div style={{ color: "white" }}>
      <h2
        style={{
          marginBottom: "2rem",
          borderBottom: "1px solid #333",
          paddingBottom: "1rem",
        }}
      >
        Website Analytics
      </h2>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div style={cardStyle}>
          <h3 style={cardLabelStyle}>Total Visits</h3>
          <p style={cardValueStyle}>{stats.totalVisits}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardLabelStyle}>Visits Today</h3>
          <p style={cardValueStyle}>{stats.todayVisits}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardLabelStyle}>Active Pages (Top 5)</h3>
          <p style={cardValueStyle}>{stats.topPages.length}</p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        {/* Top Pages */}
        <div style={{ ...sectionStyle, overflowX: "auto" }}>
          <h3 style={sectionTitleStyle}>Most Visited Pages</h3>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "300px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid #444", textAlign: "left" }}>
                <th style={{ padding: "0.5rem" }}>Page</th>
                <th style={{ padding: "0.5rem" }}>Visits</th>
              </tr>
            </thead>
            <tbody>
              {stats.topPages.map((page, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #222" }}>
                  <td style={{ padding: "0.8rem 0.5rem", color: "#ccc" }}>
                    {page._id}
                  </td>
                  <td
                    style={{
                      padding: "0.8rem 0.5rem",
                      fontWeight: "bold",
                      color: "#ae67fa",
                    }}
                  >
                    {page.count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Visits Log */}
        <div style={sectionStyle}>
          <h3 style={sectionTitleStyle}>Recent Visitors Log</h3>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {stats.recentVisits.map((visit, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  borderBottom: "1px solid #222",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.2rem",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ fontWeight: "bold", color: "#D4AF37" }}>
                    {visit.page}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#666" }}>
                    {new Date(visit.visitDate).toLocaleString()}
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#888" }}>
                  IP: {visit.ip}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  padding: "1.5rem",
  borderRadius: "10px",
  textAlign: "center",
};

const cardLabelStyle = {
  fontSize: "1rem",
  color: "#aaa",
  marginBottom: "0.5rem",
};

const cardValueStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#fff",
  margin: 0,
};

const sectionStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  padding: "1.5rem",
  borderRadius: "10px",
  flex: "1 1 350px", // Grow, shrink, base width 350px for wrapping
  minWidth: "0", // Prevent flex item from overflowing container
};

const sectionTitleStyle = {
  fontSize: "1.2rem",
  marginBottom: "1rem",
  color: "#D4AF37",
};

export default AnalyticsDashboard;
