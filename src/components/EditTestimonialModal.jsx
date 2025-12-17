import API_URL from "../apiConfig";

const EditTestimonialModal = ({ isOpen, onClose, testimonial, onUpdated }) => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (testimonial) {
      setName(testimonial.name || "");
      setTitle(testimonial.title || "");
      setText(testimonial.text || "");
    }
  }, [testimonial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !text) return alert("Name and text are required");

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/tp/testimonial/${testimonial._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, title, text }),
      });

      if (res.ok) {
        onUpdated();
      } else {
        alert("Failed to update testimonial");
      }
    } catch (error) {
      console.error(error);
      alert("Error updating testimonial");
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
        <h2>Edit Testimonial</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Client Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "5px", border: "none" }}
          />
          <input
            type="text"
            placeholder="Title / Position (Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "5px", border: "none" }}
          />
          <textarea
            placeholder="Testimonial Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{ padding: "0.5rem", borderRadius: "5px", border: "none" }}
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
            Update Testimonial
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

export default EditTestimonialModal;
