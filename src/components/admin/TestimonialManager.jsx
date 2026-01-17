import React, { useState, useEffect } from "react";
import API_URL from "../../apiConfig";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const TestimonialManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    text: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tp/testimonial`);
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `${API_URL}/api/tp/testimonial/${editId}`
      : `${API_URL}/api/tp/testimonial`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchTestimonials();
        resetForm();
      } else {
        alert("Operation failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await fetch(`${API_URL}/api/tp/testimonial/${id}`, { method: "DELETE" });
      fetchTestimonials();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      title: item.title,
      text: item.text,
    });
    setEditId(item._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", title: "", text: "" });
    setIsEditing(false);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div style={{ color: "#fff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h2>Testimonials</h2>
        <button onClick={() => setShowForm(!showForm)} style={btnStyle}>
          {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Close" : "Add New"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Name (e.g. John Doe)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Title (e.g. CEO of X)"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <textarea
            style={{ ...inputStyle, minHeight: "100px" }}
            placeholder="Testimonial Text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
          />
          <button type="submit" style={actionBtnStyle}>
            {isEditing ? "Update Testimonial" : "Add Testimonial"}
          </button>
        </form>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {testimonials.map((item) => (
          <div key={item._id} style={itemStyle}>
            <div>
              <strong>{item.name}</strong>
              <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                {item.title}
              </div>
            </div>
            <div>
              <button
                onClick={() => handleEdit(item)}
                style={{ ...iconBtnStyle, color: "#1582db" }}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                style={{ ...iconBtnStyle, color: "#FF4820" }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles (reusing same consistent styles)
const btnStyle = {
  padding: "0.5rem 1rem",
  background: "transparent", // Transparent for gold theme
  color: "#ffd700", // Gold text
  border: "1px solid #ffd700", // Gold border
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontWeight: "bold",
};

const actionBtnStyle = {
  ...btnStyle,
  background: "#ffd700", // Gold background for action
  color: "#000", // Black text for contrast
  border: "1px solid #ffd700",
  width: "100%",
  justifyContent: "center",
};

const formStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "1.5rem",
  borderRadius: "10px",
  marginBottom: "2rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  border: "1px solid rgba(255, 215, 0, 0.2)", // Subtle gold border
};

const inputStyle = {
  padding: "0.8rem",
  background: "rgba(0,0,0,0.3)",
  border: "1px solid #ffd700", // Gold border
  borderRadius: "5px",
  color: "#ffffff",
};

const itemStyle = {
  background: "rgba(255,255,255,0.03)",
  padding: "1rem",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const iconBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "1.2rem",
  marginLeft: "1rem",
};

export default TestimonialManager;
