import React, { useState, useEffect } from "react";
import API_URL from "../../apiConfig";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    coverImage: null,
  });
  const [editId, setEditId] = useState(null);

  // const token = localStorage.getItem("token"); // Token not needed for secret link (backend auth relaxed)
  // actually, the backend middleware 'protect' checks for a Bearer token.
  // Since we are doing "security through obscurity" on frontend, we might have an issue if the backend ENFORCES a valid JWT.
  // Let's check authMiddleware.js later. For now, valid admin token is likely needed for POST/PUT/DELETE.

  // WAIT: The user said "remove the admin mode". If the backend still requires `adminOnly` middleware, requests will fail without a valid JWT.
  // The user's request "Security through Obscurity" implies they might not HAVE a mechanism to get a token anymore.
  // I should check if I need to mock the token or if I should assume the user has removed backend protection?
  // The user said "without a complex login/backend system". This suggests the backend might still be protecting routes.
  // If backend routes are protected, I might need to ask the user to remove `protect` and `adminOnly` from backend routes OR provide a hardcoded token mechanism.
  // However, I can't easily change backend auth validation without a token.
  // Let's assume for now I should try to hit the endpoints. If they fail with 401, I'll need to modify the backend to remove `protect`.

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", formData.content);
    if (formData.coverImage) {
      data.append("coverImage", formData.coverImage);
    }

    const url = isEditing
      ? `${API_URL}/api/blog/${editId}`
      : `${API_URL}/api/blog`;

    const method = isEditing ? "PUT" : "POST";

    // We need a token for these routes usually.
    // I will try to use the existing admin token if it exists in localStorage,
    // OR warn the user that backend might reject this.
    // Token not used since we relaxed backend requirements
    // const token = localStorage.getItem("token");

    try {
      const res = await fetch(url, {
        method,
        headers: {
          // Authorization: `Bearer ${token}`, // Not needed
        },
        body: data,
      });

      if (res.ok) {
        fetchBlogs();
        resetForm();
      } else {
        const errorData = await res.json();
        alert(`Error: ${res.status} - ${errorData.message || res.statusText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Network/Server Error: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await fetch(`${API_URL}/api/blog/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (blog) => {
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      coverImage: null, // Keep existing unless changed
    });
    setEditId(blog._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: "", slug: "", content: "", coverImage: null });
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
        <h2 style={{ color: "#ffd700" }}>Blog Management</h2>
        <button onClick={() => setShowForm(!showForm)} style={btnStyle}>
          {showForm ? <FaTimes /> : <FaPlus />}{" "}
          {showForm ? "Close" : "Add Blog"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <input
            style={inputStyle}
            type="text"
            placeholder="Slug (e.g. my-new-post)"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
          <textarea
            style={{ ...inputStyle, minHeight: "150px" }}
            placeholder="Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            required
          />
          <input
            type="file"
            onChange={(e) =>
              setFormData({ ...formData, coverImage: e.target.files[0] })
            }
          />
          <button type="submit" style={actionBtnStyle}>
            {isEditing ? "Update Blog" : "Publish Blog"}
          </button>
        </form>
      )}

      <div style={{ display: "grid", gap: "1rem" }}>
        {blogs.map((blog) => (
          <div key={blog._id} style={itemStyle}>
            <span>{blog.title}</span>
            <div>
              <button
                onClick={() => handleEdit(blog)}
                style={{ ...iconBtnStyle, color: "#1582db" }}
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
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

const btnStyle = {
  padding: "0.5rem 1rem",
  background: "transparent",
  color: "#ffd700",
  border: "1px solid #ffd700",
  borderRadius: "5px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  fontWeight: "bold",
};

const actionBtnStyle = {
  ...btnStyle,
  background: "#ffd700", // Gold background
  border: "1px solid #ffd700",
  color: "#000", // Black text
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
  border: "1px solid rgba(255, 215, 0, 0.2)", // Subtle gold
};

const inputStyle = {
  padding: "0.8rem",
  background: "rgba(0,0,0,0.3)",
  border: "1px solid #ffd700",
  borderRadius: "5px",
  color: "#fff",
};

const itemStyle = {
  background: "rgba(255,255,255,0.03)",
  padding: "1rem",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid rgba(255, 255, 255, 0.05)",
};

const iconBtnStyle = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "1.2rem",
  marginLeft: "1rem",
};

export default BlogManager;
