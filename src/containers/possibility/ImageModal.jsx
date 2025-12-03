"use client";

const ImageModal = ({ imageUrl, title, description, details, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {/* Image on the left */}
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="modal-image"
          />
          {/* Details on the right */}
          <div className="modal-text">
            <h2>{title}</h2>
            <p>{description}</p>
            {details && details.length > 0 && (
              <div className="modal-details">
                <h3>📊 التفاصيل الرئيسية:</h3>
                <ul>
                  {details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
