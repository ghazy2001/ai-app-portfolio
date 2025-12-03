import React from "react";
import "./clinetscarousal.css";
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
  const clientImages = [
    clients1,
    clients2,
    clients3,
    clients4,
    clients5,
    clients6,
    clients7,
    clients8,
    clients9,
    clients10,
    clients11,
    clients12,
    clients13,
    clients14,
    clients15,
    clients16,
  ];

  return (
    <div className="clients-wrapper">
      <h2 className="clients-title gradient__text">شركاؤنا في النجاح</h2>

      <div className="logos">
        <div className="logos-slide">
          {clientImages.map((image, index) => (
            <img key={index} src={image} alt={`Client ${index + 1}`} />
          ))}
        </div>

        <div className="logos-slide">
          {clientImages.map((image, index) => (
            <img key={index} src={image} alt={`Client ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinetsCarousal;
