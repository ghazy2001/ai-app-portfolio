import React, { useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';

const AddJobModal = ({ isOpen, onClose, onJobAdded }) => {
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token'); // Get auth token

        try {
            const res = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ title, location, type })
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Failed to add job');
            }

            const newJob = await res.json();
            onJobAdded(newJob);
            onClose();
            setTitle('');
            setLocation('');
            setType('');
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
                background: 'var(--color-bg)', padding: '2rem', borderRadius: '1rem', width: '90%', maxWidth: '500px', position: 'relative', border: '1px solid #fff'
            }}>
                <RiCloseLine size={24} color="#fff" style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer' }} onClick={onClose} />
                <h2 className="gradient__text" style={{ marginBottom: '1.5rem' }}>Add New Job</h2>
                
                {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Job Title</label>
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="e.g. Frontend Developer"
                            required 
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Location</label>
                        <input 
                            type="text" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            placeholder="e.g. Cairo, Egypt (Remote)"
                            required 
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ color: '#fff', display: 'block', marginBottom: '0.5rem' }}>Job Type</label>
                        <input 
                            type="text" 
                            value={type} 
                            onChange={(e) => setType(e.target.value)} 
                            placeholder="e.g. Full-time, Contract"
                            required 
                            style={{ width: '100%', padding: '0.8rem', background: 'var(--color-footer)', border: 'none', color: '#fff' }}
                        />
                    </div>
                   
                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '1rem', background: '#ae67fa', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer'
                    }}>
                        {loading ? 'Adding...' : 'Add Job'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddJobModal;
