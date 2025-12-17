import React, { useState, useEffect } from "react";
import "./blog.css";
import { Article } from "../../components";
import EditableText from "../../components/EditableText";
import AddBlogModal from "../../components/AddBlogModal";
import EditBlogModal from "../../components/EditBlogModal";

import API_URL from "../../apiConfig";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/blog`);
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setIsAdmin(true);
    }

    fetchBlogs();
  }, []);

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    return `${API_URL}/${imagePath.replace(/\\/g, "/")}`;
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;

    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/api/blog/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
        // Reset to page 1 if current page becomes empty
        const newTotalPages = Math.ceil((blogs.length - 1) / blogsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } else {
        alert("Failed to delete blog post");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Error deleting blog post");
    }
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setIsEditModalOpen(true);
  };

  const handleBlogUpdated = () => {
    fetchBlogs();
    setIsEditModalOpen(false);
    setSelectedBlog(null);
  };

  // Calculate pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="MN__blog section__padding" id="blog">
      <AddBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBlogAdded={fetchBlogs}
      />
      <EditBlogModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        blog={selectedBlog}
        onBlogUpdated={handleBlogUpdated}
      />
      <div className="MN__blog-heading">
        <EditableText
          section="blog"
          contentKey="heading"
          defaultContent="أحدث المستجدات في عالم التسويق الرقمي، نحن نوثقها عبر مدونتنا."
          className="gradient__text"
          type="h1"
        />
        <EditableText
          section="blog"
          contentKey="subtext"
          defaultContent="تصفح المزيد"
          type="p"
        />

        {isAdmin && (
          <button
            style={{
              padding: "0.5rem 1rem",
              background: "#FF4820",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              margin: "1rem 0",
              cursor: "pointer",
            }}
            onClick={() => setIsModalOpen(true)}
          >
            + Add New Blog
          </button>
        )}
      </div>
      <div className="MN__blog-container">
        {currentBlogs.length > 0 && (
          <>
            <div className="MN__blog-container_groupA">
              <Article
                imgUrl={getImageUrl(currentBlogs[0].coverImage || "")}
                date={new Date(currentBlogs[0].createdAt).toLocaleDateString()}
                title={currentBlogs[0].title}
                id={currentBlogs[0]._id}
                isAdmin={isAdmin}
                onDelete={() => handleDeleteBlog(currentBlogs[0]._id)}
                onEdit={() => handleEditBlog(currentBlogs[0])}
              />
            </div>
            <div className="MN__blog-container_groupB">
              {currentBlogs.slice(1).map((blog) => (
                <Article
                  key={blog._id}
                  imgUrl={getImageUrl(blog.coverImage || "")}
                  date={new Date(blog.createdAt).toLocaleDateString()}
                  title={blog.title}
                  id={blog._id}
                  isAdmin={isAdmin}
                  onDelete={() => handleDeleteBlog(blog._id)}
                  onEdit={() => handleEditBlog(blog)}
                />
              ))}
            </div>
          </>
        )}
        {blogs.length === 0 && (
          <p style={{ color: "white" }}>
            No blogs found. (Please run seed or add blogs)
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {blogs.length > blogsPerPage && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "3rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              background: currentPage === 1 ? "#444" : "#ae67fa",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontSize: "1rem",
            }}
          >
            السابق
          </button>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                style={{
                  padding: "0.5rem 1rem",
                  background: currentPage === index + 1 ? "#ae67fa" : "#040C18",
                  color: "#fff",
                  border: "1px solid #ae67fa",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.5rem 1rem",
              background: currentPage === totalPages ? "#444" : "#ae67fa",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontSize: "1rem",
            }}
          >
            التالي
          </button>

          <p style={{ color: "#fff", margin: 0 }}>
            صفحة {currentPage} من {totalPages}
          </p>
        </div>
      )}
    </div>
  );
};

export default Blog;
