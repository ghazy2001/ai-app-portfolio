import React from "react";
import EditableText from "../components/EditableText";
import { Navbar } from "../components";
import { WhatMN, Footer } from "../containers";

const About = () => {
  return (
    <>
      <Navbar />
      <main>
        <div className="section__padding" style={{textAlign:'center'}}>
            <EditableText section="about" contentKey="missionTitle" defaultContent="مهمتنا" type="h2" className="gradient__text" />
            <EditableText section="about" contentKey="missionText" defaultContent="نسعى لتمكين الشركات من الوصول إلى إمكاناتها الكاملة من خلال استراتيجيات تسويقية مبتكرة وفعالة." type="p" className="text-color" />
            
            <div style={{margin: '2rem 0'}}></div>

            <EditableText section="about" contentKey="visionTitle" defaultContent="رؤيتنا" type="h2" className="gradient__text" />
            <EditableText section="about" contentKey="visionText" defaultContent="أن نكون الشريك المفضل للنمو الرقمي في المنطقة، معروفين بالتميز والنتائج الحقيقية." type="p" className="text-color" />
        </div>
        <WhatMN />
      </main>
      <Footer />
    </>
  );
};

export default About;
