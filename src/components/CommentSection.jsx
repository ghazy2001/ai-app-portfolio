import React, { useState } from "react";
import API_URL from "../apiConfig";
import "./CommentSection.css"; // Import the CSS

const CommentSection = ({ blogId, comments, onCommentAdded }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/blog/${blogId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, text }),
      });

      if (res.ok) {
        const refreshedComments = await res.json();
        onCommentAdded(refreshedComments);
        setName("");
        setText("");
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to post comment");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-section-container">
      <h3 className="comment-list-title">
        Comments ({comments ? comments.length : 0})
      </h3>

      {/* List */}
      <div className="comment-list">
        {comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="comment-header">
                <span className="comment-author">{comment.name}</span>
                <span className="comment-date">
                  {new Date(comment.date).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>

      {/* Form */}
      <h4 className="form-title">Leave a Comment</h4>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="comment-input"
        />
        <textarea
          placeholder="Your Comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows="4"
          className="comment-textarea"
        />

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="comment-submit-btn"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
