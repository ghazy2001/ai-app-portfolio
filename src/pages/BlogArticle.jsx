import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components';
import { Footer } from '../containers';
import './blogArticle.css'; // We'll create a basic CSS file for this too or use inline/existing styles

import API_URL from '../apiConfig';

const BlogArticle = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${API_URL}/api/blog/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setBlog(data);
                } else {
                    console.error('Blog not found');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const getImageUrl = (imagePath) => {
        if (!imagePath) return '';
        if (imagePath.startsWith("http")) return imagePath;
        return `${API_URL}/${imagePath.replace(/\\/g, "/")}`;
    };

    if (loading) return <div className="section__paddingWithNavbar"><Navbar/><h2 style={{color:'white', textAlign:'center', marginTop:'100px'}}>Loading...</h2><Footer/></div>;
    if (!blog) return <div className="section__paddingWithNavbar"><Navbar/><h2 style={{color:'white', textAlign:'center', marginTop:'100px'}}>Blog post not found</h2><Footer/></div>;

    return (
        <div className="blog-article-page" >
            <Navbar />
            <div className="section__padding blog-article-content"  style={{ color: 'white', minHeight: '60vh' }} dir="rtl" >
                <Link to="/blog" style={{color: '#FF4820', marginBottom: '2rem', display: 'inline-block'}}>← Back to Blog</Link>
                
                <h1 className="gradient__text" style={{fontSize: '3rem', marginBottom: '1rem'}}>{blog.title}</h1>
                <p style={{color: '#81AFDD', marginBottom: '2rem'}}>{new Date(blog.createdAt).toLocaleDateString()}</p>
                
                <div className="article-main-wrapper">
                    {blog.coverImage && (
                        <div className="article-image-container">
                            <img src={getImageUrl(blog.coverImage)} alt={blog.title} />
                        </div>
                    )}

                    <div className="article-body sub_">
                        {blog.content}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BlogArticle;
