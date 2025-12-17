import { useState } from 'react';
import API_URL from "../apiConfig";

const EditPartnerModal = ({ isOpen, onClose, partner, onUpdated }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select a new image to update");

    const formData = new FormData();
    formData.append("image", image);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/tp/partner/${partner._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        onUpdated();
      } else {
        alert("Failed to update partner");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating partner");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#042c54",
          padding: "2rem",
          borderRadius: "10px",
          width: "400px",
          color: "white",
        }}
      >
        <h2>Edit Partner Logo</h2>
        <p style={{marginBottom: '1rem', fontSize: '0.9rem', color: '#ccc'}}>Select a new image to replace the current one.</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ color: "white" }}
          />
          <button
            type="submit"
            style={{
              padding: "0.5rem",
              background: "#FF4820",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Update Logo
          </button>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "0.5rem",
              background: "transparent",
              color: "white",
              border: "1px solid white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPartnerModal;
