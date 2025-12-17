import { useState, useEffect } from 'react';
import { RiPencilLine } from 'react-icons/ri';

const EditableText = ({ section, contentKey, defaultContent, className, type = 'text', style }) => {
    const [content, setContent] = useState(defaultContent);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [tempContent, setTempContent] = useState(defaultContent);

    // Initial load: Local user role and fetch content
    // Note: Ideally content fetching should be done in a parent container to avoid N+1 requests
    // But for simplicity/MVP we will fetch here if content not passed down or implement a fetch once approach later.
    // To respect the plan: "Fetch this content on load." 
    // We will assume content is passed or fetched. 
    // For this implementation, let's fetch individual content item if needed, but better: 
    // fetch all section content? 
    // Let's stick to: we will FETCH content in useEffect for now.
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'admin') {
            setIsAdmin(true);
        }

        // Fetch current value from API
        const fetchContent = async () => {
             try {
                 const res = await fetch(`http://localhost:5000/api/content/${section}`);
                 const data = await res.json();
                 if (data[contentKey]) {
                     setContent(data[contentKey]);
                     setTempContent(data[contentKey]);
                 } else {
                     // If key doesn't exist in backend, use defaultContent provided in props
                     // This ensures "random content" survives if DB is empty for that specific key
                     setContent(defaultContent);
                     setTempContent(defaultContent);
                 }
             } catch (err) {
                 console.error('Failed to fetch content', err);
             }
        };

        fetchContent();
    }, [section, contentKey, defaultContent]);

    const Tag = type === 'textarea' ? 'div' : type; // textarea wrapper or semantic tag

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ section, key: contentKey, value: tempContent })
            });

            if (res.ok) {
                setContent(tempContent);
                setIsEditing(false);
            } else {
                const errData = await res.json();
                alert(`Failed to update content: ${errData.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            alert('Error updating content - check console');
        }
    };

    if (isEditing) {
        return (
            <div className={`editable-input-container ${className || ''}`} style={{ display: 'flex', gap: '5px', alignItems: 'center', ...style }}>
                {type === 'textarea' ? (
                     <textarea 
                        value={tempContent} 
                        onChange={(e) => setTempContent(e.target.value)}
                        style={{ color: '#000', padding: '5px', minWidth: '300px', minHeight: '100px' }}
                     />
                ) : (
                    <input 
                        type="text" 
                        value={tempContent} 
                        onChange={(e) => setTempContent(e.target.value)}
                        style={{ color: '#000', padding: '5px', minWidth: '200px' }}
                    />
                )}
                <button onClick={handleSave} style={{ background: 'green', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>Save</button>
                <button onClick={() => setIsEditing(false)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>Cancel</button>
            </div>
        );
    }

    return (
        <Tag className={className} style={{ position: 'relative', display: type === 'span' ? 'inline-block' : 'block', ...style }}>
            {content}
            
            {isAdmin && (
                <button 
                    onClick={() => setIsEditing(true)}
                    style={{
                        position: 'absolute',
                        top: '-10px',
                        right: '-10px',
                        background: '#fff',
                        border: '1px solid #FF4820',
                        color: '#FF4820',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        padding: '4px 6px',
                        borderRadius: '4px',
                        zIndex: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Edit Text"
                >
                    <RiPencilLine size={14} />
                </button>
            )}
        </Tag>
    );
};

export default EditableText;
