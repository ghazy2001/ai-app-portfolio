import { useState } from 'react';
import API_URL from "../apiConfig";

const AddPartnerModal = ({ isOpen, onClose, onAdded }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        const formData = new FormData();
        formData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_URL}/api/tp/partner`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert('Partner logo added successfully');
                setImage(null);
                onAdded();
                onClose();
            } else {
                alert('Failed to add partner');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding partner');
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
                width: '90%', maxWidth: '400px', color: 'white', border: '1px solid #FF4820'
            }}>
                <h3 className="gradient__text" style={{marginBottom: '1rem'}}>Add Partner Logo</h3>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={e=>setImage(e.target.files[0])} required style={{width:'100%', marginBottom:'10px', color:'white'}} />
                    
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                        <button type="button" onClick={onClose} style={{cursor:'pointer', padding:'5px 10px'}}>Cancel</button>
                        <button type="submit" disabled={loading} style={{cursor:'pointer', padding:'5px 10px', background:'#FF4820', color:'white', border:'none'}}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPartnerModal;
