import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { Footer } from "../containers";
import EditableText from "../components/EditableText";
import AddProjectModal from "../components/AddProjectModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import API_URL from "../apiConfig";

const Portfolio = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch(`${API_URL}/api/projects`);
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id) => {
        if(!window.confirm("Are you sure you want to delete this project?")) return;
        
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/api/projects/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setProjects(projects.filter(p => p._id !== id));
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <>
            <Navbar />
            <AddProjectModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onProjectAdded={(newProject) => setProjects([newProject, ...projects])}
            />
            
            <main className="section__padding">
                <div style={{ textAlign: "center", marginBottom: "4rem", marginTop: "2rem" }}>
                    <EditableText 
                        section="portfolio" 
                        contentKey="pageTitle" 
                        defaultContent="أعمالنا الإبداعية" 
                        type="h1" 
                        className="gradient__text" 
                        style={{ fontSize: '62px', fontWeight: '800' }}
                    />
                    <EditableText 
                        section="portfolio" 
                        contentKey="pageDesc" 
                        defaultContent="تشكيلة من أفضل مشاريعنا التي نفتخر بها، تعكس شغفنا بالجودة والابتكار." 
                        type="p" 
                        className="text-color"
                        style={{ fontSize: '18px', maxWidth: '700px', margin: '1rem auto' }}
                    />
                     {user && user.role === 'admin' && (
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="submit-btn" 
                            style={{ marginTop: '2rem', fontSize: '16px', padding: '0.8rem 2rem'}}
                        >
                            + إضافة مشروع جديد
                        </button>
                    )}
                </div>

                {loading ? (
                    <p style={{ color: '#fff', textAlign: 'center' }}>Loading projects...</p>
                ) : (
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        {projects.length === 0 ? (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '4rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '1rem' }}>
                                <p>No projects added yet.</p>
                            </div>
                        ) : (
                            projects.map(project => (
                                <div key={project._id} style={{ 
                                    background: 'var(--color-footer)', 
                                    borderRadius: '1rem', 
                                    overflow: 'hidden', 
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                                    transition: 'transform 0.3s ease',
                                    border: '1px solid rgba(255,255,255,0.05)'
                                }}>
                                    <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                                        {project.images && project.images.length > 0 ? (
                                            <img 
                                                src={`${API_URL}/${project.images[0].replace(/\\/g, '/')}`} 
                                                alt={project.title} 
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#2c2c2c', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                                No Image
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <h3 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.title}</h3>
                                            {user && user.role === 'admin' && (
                                                <RiDeleteBin6Line 
                                                    size={20} 
                                                    color="#ff4d4d" 
                                                    style={{ cursor: 'pointer' }} 
                                                    onClick={() => handleDeleteProject(project._id)} 
                                                />
                                            )}
                                        </div>
                                        <p className="text-color" style={{ lineHeight: '1.6', fontSize: '15px' }}>{project.description}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Portfolio;
