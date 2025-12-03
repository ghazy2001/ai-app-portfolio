import "./article.css";
const Article = ({ imgUrl, date, title }) => {
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
        <p>Read Full Article</p>
      </div>
    </div>
  );
};

export default Article;
