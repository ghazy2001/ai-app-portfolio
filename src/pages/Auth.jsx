import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data._id, email: data.email, role: data.role })
        );
        navigate("/");
        window.location.reload();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const onSubmitRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data._id, email: data.email })
        );
        navigate("/");
        window.location.reload();
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div style={{ background: "var(--color-bg)" }}>
      <Navbar />
      <div
        className="gradient__bg"
        style={{
          minHeight: "calc(100vh - 100px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "#040C18",
            padding: "2rem",
            borderRadius: "1rem",
            width: "100%",
            maxWidth: "450px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Tab Buttons */}
          <div
            style={{
              display: "flex",
              marginBottom: "2rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              onClick={() => {
                setActiveTab("login");
                setError(null);
              }}
              style={{
                flex: 1,
                padding: "1rem",
                background: activeTab === "login" ? "#ae67fa" : "transparent",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: activeTab === "login" ? "bold" : "normal",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                borderRadius: "8px 8px 0 0",
              }}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => {
                setActiveTab("register");
                setError(null);
              }}
              style={{
                flex: 1,
                padding: "1rem",
                background:
                  activeTab === "register" ? "#ae67fa" : "transparent",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: activeTab === "register" ? "bold" : "normal",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                borderRadius: "8px 8px 0 0",
              }}
            >
              إنشاء حساب
            </button>
          </div>

          {error && (
            <p
              style={{
                color: "red",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={onSubmitLogin}>
              <h2
                className="gradient__text"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                مرحباً بعودتك
              </h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  name="email"
                  value={email}
                  onChange={onChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "5px",
                    border: "none",
                    background: "#031B34",
                    color: "#fff",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  name="password"
                  value={password}
                  onChange={onChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "5px",
                    border: "none",
                    background: "#031B34",
                    color: "#fff",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "#ae67fa",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                دخول
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={onSubmitRegister}>
              <h2
                className="gradient__text"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                إنشاء حساب جديد
              </h2>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  name="email"
                  value={email}
                  onChange={onChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "5px",
                    border: "none",
                    background: "#031B34",
                    color: "#fff",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  name="password"
                  value={password}
                  onChange={onChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "5px",
                    border: "none",
                    background: "#031B34",
                    color: "#fff",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    borderRadius: "5px",
                    border: "none",
                    background: "#031B34",
                    color: "#fff",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "1rem",
                  background: "#ae67fa",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                تسجيل
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
