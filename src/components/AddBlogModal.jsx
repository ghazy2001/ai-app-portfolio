import { useState } from 'react';
import API_URL from "../apiConfig";

const AddBlogModal = ({ isOpen, onClose, onBlogAdded }) => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('content', content);
        if (image) {
            formData.append('coverImage', image);
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/blog`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert('Blog created successfully');
                // Reset form
                setTitle('');
                setSlug('');
                setContent('');
                setImage(null);
                onBlogAdded(); // Refresh list
                onClose();
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to create blog');
            }
        } catch (err) {
            console.error(err);
            alert('Error creating blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <div style={{
                background: '#040C18', padding: '2rem', borderRadius: '10px',
                width: '90%', maxWidth: '500px', color: 'white', border: '1px solid #FF4820'
            }}>
                <h2 className="gradient__text" style={{marginBottom: '1rem'}}>Add New Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{marginBottom: '1rem'}}>
                        <label>Title</label>
                        <input 
                            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            style={{width: '100%', padding: '0.5rem', background: '#031B34', color: 'white', border: 'none'}}
                            required
                        />
                    </div>
                    <div style={{marginBottom: '1rem'}}>
                        <label>Slug (URL Friendly)</label>
                        <input 
                            type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                            style={{width: '100%', padding: '0.5rem', background: '#031B34', color: 'white', border: 'none'}}
                            required
                        />
                    </div>
                    <div style={{marginBottom: '1rem'}}>
                        <label>Content</label>
                        <textarea 
                            value={content} onChange={(e) => setContent(e.target.value)}
                            rows="5"
                            style={{width: '100%', padding: '0.5rem', background: '#031B34', color: 'white', border: 'none'}}
                            required
                        />
                    </div>
                    <div style={{marginBottom: '1rem'}}>
                        <label>Cover Image</label>
                        <input 
                            type="file" onChange={(e) => setImage(e.target.files[0])}
                            style={{width: '100%', color: 'white'}}
                            required
                        />
                    </div>
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                        <button type="button" onClick={onClose} style={{background: 'gray', border: 'none', padding: '0.5rem 1rem', color: 'white', borderRadius: '5px', cursor: 'pointer'}}>Cancel</button>
                        <button type="submit" disabled={loading} style={{background: '#FF4820', border: 'none', padding: '0.5rem 1rem', color: 'white', borderRadius: '5px', cursor: 'pointer'}}>
                            {loading ? 'Creating...' : 'Create Blog'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlogModal;
