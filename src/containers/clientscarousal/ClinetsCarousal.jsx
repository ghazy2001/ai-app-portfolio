import React, { useState, useEffect } from "react";
import "./clinetscarousal.css";
import AddPartnerModal from "../../components/AddPartnerModal";
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

const ClinetsCarousal = () => {
  const [partners, setPartners] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default images fallback
  const clientImages = [
    clients1, clients2, clients3, clients4, clients5, clients6, clients7, clients8,
    clients9, clients10, clients11, clients12, clients13, clients14, clients15, clients16,
  ];

  const fetchPartners = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tp/partner");
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      setIsAdmin(true);
    }
    fetchPartners();
  }, []);

  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000/${imagePath.replace(/\\/g, '/')}`;
  };

  // Decide what to show: API partners or Default partners
  const displayPartners = partners.length > 0 ? partners : clientImages.map((img, i) => ({ _id: i, image: img, isLocal: true }));

  return (
    <div className="clients-wrapper">
      <AddPartnerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdded={fetchPartners} />
      
      <h2 className="clients-title gradient__text">شركاؤنا في النجاح</h2>
      
      {isAdmin && (
        <div style={{textAlign: 'center', marginBottom: '1rem'}}>
            <button onClick={() => setIsModalOpen(true)} style={{ background: '#FF4820', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '5px' }}>+ Add Partner Logo</button>
        </div>
      )}

      <div className="logos">
        <div className="logos-slide">
            {displayPartners.map((partner, index) => (
            <img 
                key={partner._id || index} 
                src={partner.isLocal ? partner.image : getImageUrl(partner.image)} 
                alt={`Partner ${index + 1}`} 
            />
            ))}
        </div>

        <div className="logos-slide">
            {displayPartners.map((partner, index) => (
            <img 
                key={`dup-${partner._id || index}`} 
                src={partner.isLocal ? partner.image : getImageUrl(partner.image)} 
                alt={`Partner ${index + 1}`} 
            />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClinetsCarousal;
