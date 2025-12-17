import "./article.css";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";

const Article = ({ imgUrl, date, title, isAdmin, onDelete, onEdit }) => {
  return (
    <div className="MN__blog-container_article" style={{ position: 'relative' }}>
      <div className="MN__blog-container_article-image">
        <img src={imgUrl} alt="blog_image" />
      </div>
      <div className="MN__blog-container_article-content">
        <div>
          <p>{date}</p>
          <h3>{title}</h3>
        </div>
        <p>Read Full Article</p>
      </div>
      
      {isAdmin && (
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          display: 'flex', 
          gap: '8px',
          zIndex: 10
        }}>
          <button
            onClick={onEdit}
            style={{
              background: '#ae67fa',
              border: 'none',
              color: '#fff',
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Edit Blog"
          >
            <RiEditLine size={16} />
          </button>
          <button
            onClick={onDelete}
            style={{
              background: '#ff4d4d',
              border: 'none',
              color: '#fff',
              padding: '8px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Delete Blog"
          >
            <RiDeleteBin6Line size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Article;
