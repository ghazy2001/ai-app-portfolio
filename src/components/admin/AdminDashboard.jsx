import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogManager from './BlogManager';
import TestimonialManager from './TestimonialManager';
import JobManager from './JobManager';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('blogs');

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        navigate('/admin-login');
    };

    return (
        <div style={{
            padding: '2rem',
            minHeight: '100vh',
            backgroundColor: '#040C18',
            color: '#fff',
            fontFamily: 'Manrope, sans-serif'
        }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                paddingBottom: '1rem'
            }}>
                <h1 style={{ 
                    fontSize: '2rem', 
                    background: 'var(--gradient-text)', 
                    backgroundClip: 'text', 
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0
                }}>
                    Admin Dashboard
                </h1>
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid #FF4820',
                        color: '#FF4820',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Logout
                </button>
            </header>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button 
                    onClick={() => setActiveTab('blogs')}
                    style={activeTab === 'blogs' ? activeTabStyle : tabStyle}
                >
                    Manage Blogs
                </button>
                <button 
                    onClick={() => setActiveTab('testimonials')}
                    style={activeTab === 'testimonials' ? activeTabStyle : tabStyle}
                >
                    Manage Testimonials
                </button>
                <button 
                    onClick={() => setActiveTab('jobs')}
                    style={activeTab === 'jobs' ? activeTabStyle : tabStyle}
                >
                    Manage Jobs
                </button>
            </div>

            <div style={{
                backgroundColor: 'rgba(255,255,255,0.02)',
                padding: '2rem',
                borderRadius: '10px'
            }}>
                {activeTab === 'blogs' && <BlogManager />}
                {activeTab === 'testimonials' && <TestimonialManager />}
                {activeTab === 'jobs' && <JobManager />}
            </div>
        </div>
    );
};

const tabStyle = {
    padding: '0.8rem 1.5rem',
    background: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem'
};

const activeTabStyle = {
    ...tabStyle,
    background: '#ae67fa',
    border: '1px solid #ae67fa',
    fontWeight: 'bold'
};

export default AdminDashboard;
