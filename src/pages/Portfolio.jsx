import React, { useState, useEffect } from "react";
import { Navbar } from "../components";
import { Footer, Contact, Possibility } from "../containers";


import API_URL from "../apiConfig";

const Portfolio = () => {
// ... existing state ...
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
      <div>
        <Navbar />
      <Possibility/>
            <Contact />
            <Footer />
      </div>
    );
};

export default Portfolio;
