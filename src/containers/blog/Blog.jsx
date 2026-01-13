import React, { useState, useEffect } from "react";
import "./blog.css";
import { Article } from "../../components";
import API_URL from "../../apiConfig";

const Blog = ({ limit }) => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        console.error("Received non-array response from blog API", data);
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  const currentBlogs = limit
    ? Array.isArray(blogs)
      ? blogs.slice(0, limit)
      : []
    : Array.isArray(blogs)
    ? blogs
    : [];

  return (
    <div className="MN__blog section__padding" id="blog">
      <div className="MN__blog-header">
        <div className="MN__blog-header-content">
          <p>our latest</p>
          <h1>News & Announcements</h1>
        </div>
        {!limit && (
          <div className="MN__blog-header-btn">
            {/* Use Link or A tag. Already existing was A href /blog. 
                 If we are ALREADY on /blog (no limit), we don't need this button usually.
                 But user prompt implies reusing this component.
                 If limit is present (Home), show 'View All'.
                 If limit is NOT present (Blog), hide 'View All'.
             */}
          </div>
        )}
        {limit && (
          <div className="MN__blog-header-btn">
            <a href="/blog">View All</a>
          </div>
        )}
      </div>
      <div className="MN__blog-container">
        {currentBlogs.map((blog) => (
          <Article
            key={blog._id}
            imgUrl={getImageUrl(blog.coverImage)}
            date={new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            title={blog.title}
            id={blog._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Blog;
