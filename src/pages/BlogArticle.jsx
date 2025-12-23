import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components';
import { Footer, Contact } from '../containers';
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
            <div className="gradient__bg">
                <Navbar />
            </div>
            <div className="section__padding blog-article-content"  style={{ color: 'white', minHeight: '60vh' }} dir="ltr" >
                <Link to="/blog" style={{color: '#D4AF37', marginBottom: '2rem', display: 'inline-block', fontWeight: 'bold'}}>← Back to Blog</Link>
                
                <h1 style={{fontSize: '3rem', marginBottom: '1rem', color: '#fff', fontWeight: '800'}}>{blog.title}</h1>
                <p style={{color: '#D4AF37', marginBottom: '2rem', fontSize: '1.2rem'}}>{new Date(blog.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <div className="article-main-wrapper">
                    {blog.coverImage && (
                        <div className="article-image-container">
                            <img src={getImageUrl(blog.coverImage)} alt={blog.title} />
                        </div>
                    )}

                    <div className="article-body">
                        {blog.content}
                    </div>
                </div>
            </div>
            <Contact />
            <Footer />
        </div>
    );
};

export default BlogArticle;
