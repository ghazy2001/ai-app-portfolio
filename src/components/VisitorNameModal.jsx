import React, { useState, useEffect } from "react";
import API_URL from "../apiConfig";
import { useLocation } from "react-router-dom";

const VisitorNameModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [opacity, setOpacity] = useState(0); // Control fade
  const [name, setName] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Don't show on admin pages
    if (
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/my-secret")
    ) {
      return;
    }

    const storedName = localStorage.getItem("visitorName");
    const skipped = localStorage.getItem("visitorNameSkip");

    if (!storedName && !skipped) {
      // Delay 5 seconds before mounting, then fade in
      const timer = setTimeout(() => {
        setIsVisible(true);
        // Small delay to allow mount before fading in
        setTimeout(() => setOpacity(1), 50);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const closeWithFade = () => {
    setOpacity(0);
    setTimeout(() => setIsVisible(false), 500); // Match transition duration
  };

  const handleSave = async () => {
    if (!name.trim()) return;

    localStorage.setItem("visitorName", name.trim());

    try {
      await fetch(`${API_URL}/api/analytics/identify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorName: name.trim() }),
      });
    } catch (err) {
      console.error("Failed to identify visitor", err);
    }

    closeWithFade();
  };

  const handleSkip = () => {
    localStorage.setItem("visitorNameSkip", "true");
    closeWithFade();
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        ...styles.container,
        opacity: opacity, // Fade control
        transform: isOpen
          ? "translateY(-50%) translateX(0)"
          : "translateY(-50%) translateX(-100%)",
      }}
    >
      {/* Main Panel Content */}
      <div style={styles.content}>
        <h3 style={styles.title}>Welcome! 👋</h3>
        <p style={styles.text}>
          Would you like to share your name with us for a more personalized
          experience?
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
        <div style={styles.btnGroup}>
          <button onClick={handleSave} style={styles.saveBtn}>
            Save
          </button>
          <button onClick={handleSkip} style={styles.skipBtn}>
            Skip
          </button>
        </div>
      </div>

      {/* Toggle Arrow (Attached to Right Side) */}
      <div onClick={toggleSidebar} style={styles.toggleBtn}>
        {isOpen ? "❮" : "❯"}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "fixed",
    top: "50%",
    left: "0",
    width: "300px",
    maxWidth: "85vw",
    background: "rgba(4, 12, 24, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid #ffd700",
    borderLeft: "none",
    borderRadius: "0 10px 10px 0",
    boxShadow: "5px 5px 20px rgba(0,0,0,0.5)",
    zIndex: 9999,
    // Add opacity transition
    transition:
      "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease",
    display: "flex",
    alignItems: "stretch", // Stretch toggle button
    height: "auto", // Vertically centered, auto height
  },
  content: {
    padding: "1.5rem",
    flex: 1,
    color: "#fff",
    fontFamily: "'Manrope', sans-serif",
  },
  toggleBtn: {
    position: "absolute",
    right: "-30px", // Width of button
    top: "50%",
    transform: "translateY(-50%)",
    width: "30px",
    height: "60px",
    background: "#ffd700",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    borderRadius: "0 10px 10px 0",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  title: {
    margin: "0 0 0.8rem 0",
    color: "#ffd700",
    fontSize: "1.3rem",
  },
  text: {
    fontSize: "0.95rem",
    color: "#ccc",
    marginBottom: "1.2rem",
    lineHeight: "1.5",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "1.2rem",
    borderRadius: "5px",
    border: "1px solid #444",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    outline: "none",
    fontSize: "1rem",
  },
  btnGroup: {
    display: "flex",
    gap: "0.8rem",
  },
  saveBtn: {
    flex: 1,
    padding: "0.7rem",
    background: "#ffd700",
    color: "#000",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
  },
  skipBtn: {
    flex: 1,
    padding: "0.7rem",
    background: "transparent",
    color: "#aaa",
    border: "1px solid #444",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default VisitorNameModal;
