import React from "react";
import { Navbar } from "../components";
import { Footer } from "../containers";
import EditableText from "../components/EditableText";
import { RiCodeBoxLine, RiSearchEyeLine, RiAdvertisementLine, RiSmartphoneLine, RiPaletteLine, RiLineChartLine } from "react-icons/ri";
import "./services.css";

const Services = () => {
  return (
    <>
      <Navbar />
      <main className="services-section section__padding">
        
        {/* Header */}
        <div className="services-header">
             <EditableText 
                section="services" 
                contentKey="pageTitle" 
                defaultContent="نحول الأفكار إلى واقع رقمي" 
                type="h1" 
                className="gradient__text"
                style={{ fontSize: '62px', fontWeight: '800', lineHeight: '1.2' }}
            />
             <EditableText 
                section="services" 
                contentKey="pageDesc" 
                defaultContent="نقدم حلولاً متكاملة تجمع بين الإبداع والتكنولوجيا لتحقيق نمو مستدام لأعمالك." 
                type="p" 
                className="text-color"
                style={{ fontSize: '18px', marginTop: '1rem' }}
            />
        </div>

        {/* Services Grid */}
        <div className="services-grid">
            
            {/* Service 1 */}
            <div className="service-card">
                <div className="service-icon-wrapper">
                    <RiCodeBoxLine size={30} color="#ae67fa" />
                </div>
                <EditableText section="services" contentKey="srv1Title" defaultContent="تطوير المواقع" type="h3" className="service-title" />
                <EditableText section="services" contentKey="srv1Desc" defaultContent="نصمم ونطور مواقع ويب سريعة، تجاوبية، ومخصصة لتعكس هوية علامتك التجارية بدقة." type="p" className="service-desc" />
                <a href="#contact" className="service-link">ابدأ مشروعك →</a>
            </div>

            {/* Service 2 */}
            <div className="service-card">
                <div className="service-icon-wrapper">
                    <RiSearchEyeLine size={30} color="#ae67fa" />
                </div>
                <EditableText section="services" contentKey="srv2Title" defaultContent="تحسين محركات البحث" type="h3" className="service-title" />
                <EditableText section="services" contentKey="srv2Desc" defaultContent="نساعدك في الظهور في النتائج الأولى لمحركات البحث لزيادة الزيارات العضوية لموقعك." type="p" className="service-desc" />
                <a href="#contact" className="service-link">اكتشف المزيد →</a>
            </div>

            {/* Service 3 */}
            <div className="service-card">
                <div className="service-icon-wrapper">
                    <RiAdvertisementLine size={30} color="#ae67fa" />
                </div>
                <EditableText section="services" contentKey="srv3Title" defaultContent="إدارة الحملات الإعلانية" type="h3" className="service-title" />
                <EditableText section="services" contentKey="srv3Desc" defaultContent="نخطط وندير حملات إعلانية مدفوعة على جوجل ومنصات التواصل لتحقيق أعلى عائد." type="p" className="service-desc" />
                <a href="#contact" className="service-link">اطلب استشارة →</a>
            </div>

            {/* Service 4 */}
            <div className="service-card">
                <div className="service-icon-wrapper">
                    <RiSmartphoneLine size={30} color="#ae67fa" />
                </div>
                <EditableText section="services" contentKey="srv4Title" defaultContent="تطوير التطبيقات" type="h3" className="service-title" />
                <EditableText section="services" contentKey="srv4Desc" defaultContent="تطبيقات جوال مبتكرة وسهلة الاستخدام لأنظمة iOS و Android تضع نشاطك في جيب عميلك." type="p" className="service-desc" />
                <a href="#contact" className="service-link">برمج تطبيقك →</a>
            </div>

             {/* Service 5 */}
             <div className="service-card">
                <div className="service-icon-wrapper">
                    <RiPaletteLine size={30} color="#ae67fa" />
                </div>
                <EditableText section="services" contentKey="srv5Title" defaultContent="تصميم الهوية البصرية" type="h3" className="service-title" />
                <EditableText section="services" contentKey="srv5Desc" defaultContent="نخلق هوية بصرية فريدة ولا تُنسى تميزك عن المنافسين وتبني الثقة مع عملائك." type="p" className="service-desc" />
                <a href="#contact" className="service-link">صمم علامتك →</a>
            </div>

             {/* Service 6 */}
             <div className="service-card">
                <div className="service-icon-wrapper">
                    <RiLineChartLine size={30} color="#ae67fa" />
                </div>
                <EditableText section="services" contentKey="srv6Title" defaultContent="استراتيجيات المحتوى" type="h3" className="service-title" />
                <EditableText section="services" contentKey="srv6Desc" defaultContent="نصيغ محتوى إبداعي يروي قصتك، يجذب جمهورك، ويحول المتابعين إلى عملاء دائمين." type="p" className="service-desc" />
                <a href="#contact" className="service-link">حسن محتواك →</a>
            </div>

        </div>

      </main>
      <Footer />
    </>
  );
};

export default Services;
