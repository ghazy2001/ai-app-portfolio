import React, { useState, useEffect } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import API_URL from "../apiConfig";

const EditBlogModal = ({ isOpen, onClose, blog, onBlogUpdated }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (blog) {
            setTitle(blog.title || '');
            setContent(blog.content || '');
            setSlug(blog.slug || '');
        }
    }, [blog]);

    if (!isOpen || !blog) return null;

    const handleFileChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('slug', slug);
        
        if (coverImage) {
            formData.append('coverImage', coverImage);
        }

        try {
            const res = await fetch(`${API_URL}/api/blog/${blog._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to update blog');
            }

            onBlogUpdated();
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
            <div style={{
                background: 'var(--color-bg)', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '600px', position: 'relative', border: '1px solid #fff', maxHeight: '90vh', overflow: 'auto'
            }}>
                <RiCloseLine size={24} color="#fff" style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }} onClick={onClose} />
                <h2 className="gradient__text" style={{ marginBottom: '1.5rem' }}>Edit Blog Post</h2>
                
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Slug (URL friendly)</label>
                        <input 
                            type="text" 
                            value={slug} 
                            onChange={(e) => setSlug(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Content</label>
                        <textarea 
                            value={content} 
                            onChange={(e) => setContent(e.target.value)} 
                            required 
                            rows={6}
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Cover Image (leave empty to keep current)</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ color: '#fff' }}
                        />
                        {blog.coverImage && (
                            <p style={{ color: '#81afdd', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                Current: {blog.coverImage.split('/').pop()}
                            </p>
                        )}
                    </div>
                   
                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '1rem', background: '#ae67fa', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '5px'
                    }}>
                        {loading ? 'Updating...' : 'Update Blog'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBlogModal;
