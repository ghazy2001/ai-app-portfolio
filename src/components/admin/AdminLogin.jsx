import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Restricted Portal";
    const isAuthenticated =
      localStorage.getItem("adminAuthenticated") === "true";
    if (isAuthenticated) {
      const adminPath = import.meta.env.VITE_ADMIN_PATH || "/mn-secure-zone";
      navigate(adminPath);
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (password === envPassword) {
      localStorage.setItem("adminAuthenticated", "true");
      const adminPath = import.meta.env.VITE_ADMIN_PATH || "/mn-secure-zone";
      navigate(adminPath);
    } else {
      setError("Invalid Password");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#040C18",
        color: "#fff",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "3rem",
          backgroundColor: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(10px)",
          borderRadius: "10px",
          border: "1px solid rgba(255,255,255,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            color: "#FF4820", // Red
            marginBottom: "1rem",
            fontWeight: "bold",
          }}
        >
          Restricted Area
        </h2>

        <input
          type="password"
          placeholder="Enter Security Key"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "1rem",
            borderRadius: "5px",
            border: "1px solid #ffd700", // Gold border
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "#ffffff", // White text
            fontSize: "1rem",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p
            style={{
              color: "#FF4820",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            padding: "1rem",
            borderRadius: "5px",
            border: "1px solid #ffd700",
            backgroundColor: "transparent", // Transparent for golden outline look or filling it
            color: "#ffd700", // Gold text
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#ffd700";
            e.target.style.color = "#000";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#ffd700";
          }}
        >
          Access Dashboard
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
