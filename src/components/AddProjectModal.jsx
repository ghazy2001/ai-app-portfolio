import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import API_URL from "../apiConfig";

const AddProjectModal = ({ isOpen, onClose, onProjectAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        
        if (images) {
             for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        try {
            const res = await fetch(`${API_URL}/api/projects`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to add project');
            }

            const newProject = await res.json();
            onProjectAdded(newProject);
            onClose();
            setTitle('');
            setDescription('');
            setImages(null);
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
                background: 'var(--color-bg)', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '600px', position: 'relative', border: '1px solid #fff'
            }}>
                <RiCloseLine size={24} color="#fff" style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }} onClick={onClose} />
                <h2 className="gradient__text" style={{ marginBottom: '1.5rem' }}>Add New Project</h2>
                
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Project Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g. Modern E-commerce Website"
                            required 
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Description</label>
                         <textarea
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                            placeholder="Brief description of the project..."
                            required 
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff', minHeight: '100px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                         <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Project Image(s)</label>
                         <input 
                            type="file" 
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                            style={{ color: '#fff' }}
                        />
                    </div>
                   
                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '1rem', background: '#ae67fa', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer'
                    }}>
                        {loading ? 'Adding...' : 'Add Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;
