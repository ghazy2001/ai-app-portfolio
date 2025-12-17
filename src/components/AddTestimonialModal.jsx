import { useState } from 'react';

const AddTestimonialModal = ({ isOpen, onClose, onAdded }) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('${import.meta.env.VITE_API_URL}/api/tp/testimonial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, title, text })
            });

            if (res.ok) {
                alert('Testimonial added successfully');
                setName(''); setTitle(''); setText('');
                onAdded();
                onClose();
            } else {
                alert('Failed to add testimonial');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding testimonial');
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
                <h3 className="gradient__text" style={{marginBottom: '1rem'}}>Add Testimonial</h3>
                <form onSubmit={handleSubmit}>
                    <input className="input-field" placeholder="Client Name" value={name} onChange={e=>setName(e.target.value)} required style={{width:'100%', marginBottom:'10px', padding:'8px'}} />
                    <input className="input-field" placeholder="Client Title (Optional)" value={title} onChange={e=>setTitle(e.target.value)} style={{width:'100%', marginBottom:'10px', padding:'8px'}} />
                    <textarea className="input-field" placeholder="Testimonial Text" value={text} onChange={e=>setText(e.target.value)} required rows={4} style={{width:'100%', marginBottom:'10px', padding:'8px'}} />
                    
                    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                        <button type="button" onClick={onClose} style={{cursor:'pointer', padding:'5px 10px'}}>Cancel</button>
                        <button type="submit" disabled={loading} style={{cursor:'pointer', padding:'5px 10px', background:'#FF4820', color:'white', border:'none'}}>Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTestimonialModal;
