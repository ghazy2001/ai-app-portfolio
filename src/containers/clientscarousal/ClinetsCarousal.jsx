import React, { useState, useEffect } from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import "./clinetscarousal.css";
import AddPartnerModal from "../../components/AddPartnerModal";
import EditPartnerModal from "../../components/EditPartnerModal";
import { RiPencilFill } from "react-icons/ri";
import clients1 from "../../assets/clients1.jpg";
import clients2 from "../../assets/clients2.jpg";
import clients3 from "../../assets/clients3.jpg";
import clients4 from "../../assets/clients4.jpg";
import clients5 from "../../assets/clients5.jpg";
import clients6 from "../../assets/clients6.jpg";
import clients7 from "../../assets/clients7.jpg";
import clients8 from "../../assets/clients8.jpg";
import clients9 from "../../assets/clients9.jpg";
import clients10 from "../../assets/clients10.png";
import clients11 from "../../assets/clients11.jpg";
import clients12 from "../../assets/clients12.jpg";
import clients13 from "../../assets/clients13.jpg";
import clients14 from "../../assets/clients14.png";
import clients15 from "../../assets/clients15.png";
import clients16 from "../../assets/clients16.jpg";
import API_URL from "../../apiConfig";

const ClinetsCarousal = () => {
  const [partners, setPartners] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  // Default images fallback
  const clientImages = [
    clients1, clients2, clients3, clients4, clients5, clients6, clients7, clients8,
    clients9, clients10, clients11, clients12, clients13, clients14, clients15, clients16,
  ];

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tp/partner`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setPartners(data);
      } else {
         // Keep empty to trigger fallback or empty state, but we want fallback now
         setPartners([]);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
      setPartners([]);
    }
  };

  const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this partner?")) return;
      try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_URL}/api/tp/partner/${id}`, {
              method: 'DELETE',
              headers: {
                   'Authorization': `Bearer ${token}`
              }
          });
          if (res.ok) {
              setPartners(prev => prev.filter(p => p._id !== id));
          } else {
              alert("Failed to delete partner");
          }
      } catch (error) {
          console.error(error);
          alert("Error deleting partner");
      }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
    fetchPartners();
  }, []);

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL}/${imagePath.replace(/\\/g, '/')}`;
  };

  // Decide what to show: API partners or Default partners
  // Decide what to show: Merge Default partners AND API partners
  const localPartners = clientImages.map((img, i) => ({ _id: `local-${i}`, image: img, isLocal: true }));
  const displayPartners = [...localPartners, ...partners];

  return (
    <div className="clients-wrapper">
      <AddPartnerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdded={fetchPartners} />
      <EditPartnerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        partner={selectedPartner}
        onUpdated={() => { fetchPartners(); setIsEditModalOpen(false); setSelectedPartner(null); }}
      />
      
      <h2 className="clients-title gradient__text">شركاؤنا في النجاح</h2>
      
      {isAdmin && (
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>
            <button onClick={() => setIsModalOpen(true)} style={{ background: '#FF4820', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}>+ Add Partner Logo</button>
        </div>
      )}

      <div className="logos">
        <div className="logos-slide">
            {displayPartners.map((partner, index) => (
            <div key={partner._id || index} style={{position: 'relative', display: 'inline-block', margin: '0 40px'}}>
                <img 
                    src={partner.isLocal ? partner.image : getImageUrl(partner.image)} 
                    alt={`Partner ${index + 1}`} 
                    style={{margin: 0}}
                />
                {isAdmin && !partner.isLocal && (
                    <>
                        <button
                            onClick={() => handleDelete(partner._id)}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                background: 'white',
                                color: 'red',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <RiCloseCircleFill size={20} />
                        </button>
                        <button
                            onClick={() => { setSelectedPartner(partner); setIsEditModalOpen(true); }}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '-10px',
                                background: 'white',
                                color: '#1582db',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <RiPencilFill size={20} />
                        </button>
                    </>
                )}
            </div>
            ))}
        </div>

        <div className="logos-slide">
            {displayPartners.map((partner, index) => (
            <div key={`dup-${partner._id || index}`} style={{position: 'relative', display: 'inline-block', margin: '0 40px'}}>
                <img 
                    src={partner.isLocal ? partner.image : getImageUrl(partner.image)} 
                    alt={`Partner ${index + 1}`} 
                    style={{margin: 0}}
                />
                {isAdmin && !partner.isLocal && (
                    <>
                        <button
                            onClick={() => handleDelete(partner._id)}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                background: 'white',
                                color: 'red',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <RiCloseCircleFill size={20} />
                        </button>
                        <button
                            onClick={() => { setSelectedPartner(partner); setIsEditModalOpen(true); }}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                left: '-10px',
                                background: 'white',
                                color: '#1582db',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <RiPencilFill size={20} />
                        </button>
                    </>
                )}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClinetsCarousal;
