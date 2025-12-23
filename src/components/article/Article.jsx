import "./article.css";
import { Link } from "react-router-dom";

const Article = ({ imgUrl, date, title, id }) => {
  return (
    <div className="MN__blog-container_article">
      <div className="MN__blog-container_article-image">
        <img src={imgUrl} alt="blog_image" />
      </div>
      <div className="MN__blog-container_article-content">
        <div>
          <p>{date}</p>
          <h3>{title}</h3>
        </div>
        <Link to={`/blog/${id}`} target="_blank" rel="noopener noreferrer">Read More →</Link>
      </div>
    </div>
  );
};

export default Article;
