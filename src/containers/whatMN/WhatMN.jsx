import "./whatMN.css";
import EditableText from "../../components/EditableText";
import { RiUserHeartLine, RiBookOpenLine, RiEyeLine, RiCompassLine } from "react-icons/ri";

const WhatMN = () => {
  return (
    <div className="MN__whatmn section__padding" id="wmn">
      {/* Header Section */}
      <div className="whatmn-header">
        <EditableText 
          section="whatMN" 
          contentKey="mainTitle" 
          defaultContent="من نحن" 
          className="gradient__text"
          type="h1"
        />
        <EditableText 
          section="whatMN" 
          contentKey="mainSubtitle" 
          defaultContent="نحن فريق من المحترفين الشغوفين بتحويل الأفكار إلى واقع رقمي" 
          className="text-color"
          type="p"
        />
      </div>

      {/* Cards Grid */}
      <div className="whatmn-cards-grid">
        {/* Who We Are Card */}
        <div className="whatmn-card">
          <div className="whatmn-card-icon">
            <RiUserHeartLine size={48} />
          </div>
          <EditableText 
            section="whatMN" 
            contentKey="whoWeAreTitle" 
            defaultContent="من نحن" 
            className="whatmn-card-title"
            type="h2"
          />
          <EditableText 
            section="whatMN" 
            contentKey="whoWeAreText" 
            defaultContent="فريق متخصص في التسويق الرقمي والتصميم. نؤمن أن التسويق الحقيقي يبني علاقات دائمة بين العلامات والعملاء. نجمع بين الإبداع والبيانات لإنشاء حملات تحقق نتائج ملموسة وتضاعف مبيعاتك." 
            className="whatmn-card-text"
            type="p"
          />
        </div>

        {/* Our Story Card */}
        <div className="whatmn-card">
          <div className="whatmn-card-icon">
            <RiBookOpenLine size={48} />
          </div>
          <EditableText 
            section="whatMN" 
            contentKey="ourStoryTitle" 
            defaultContent="قصتنا" 
            className="whatmn-card-title"
            type="h2"
          />
          <EditableText 
            section="whatMN" 
            contentKey="ourStoryText" 
            defaultContent="بدأنا رحلتنا بحلم بسيط: تمكين الشركات العربية من التميز في العالم الرقمي. على مدى السنوات، ساعدنا مئات العلامات التجارية على النمو والازدهار من خلال استراتيجيات تسويقية مبتكرة ومحتوى جذاب." 
            className="whatmn-card-text"
            type="p"
          />
        </div>

        {/* Our Vision Card */}
        <div className="whatmn-card">
          <div className="whatmn-card-icon">
            <RiEyeLine size={48} />
          </div>
          <EditableText 
            section="whatMN" 
            contentKey="ourVisionTitle" 
            defaultContent="رؤيتنا" 
            className="whatmn-card-title"
            type="h2"
          />
          <EditableText 
            section="whatMN" 
            contentKey="ourVisionText" 
            defaultContent="أن نكون الشريك الأول للشركات العربية في رحلتها الرقمية، ونساهم في بناء علامات تجارية قوية تترك أثراً إيجابياً في مجتمعاتها وتحقق نجاحاً مستداماً في عالم دائم التطور." 
            className="whatmn-card-text"
            type="p"
          />
        </div>

        {/* Our Mission Card */}
        <div className="whatmn-card">
          <div className="whatmn-card-icon">
            <RiCompassLine size={48} />
          </div>
          <EditableText 
            section="whatMN" 
            contentKey="ourMissionTitle" 
            defaultContent="مهمتنا" 
            className="whatmn-card-title"
            type="h2"
          />
          <EditableText 
            section="whatMN" 
            contentKey="ourMissionText" 
            defaultContent="تقديم حلول تسويقية متكاملة تجمع بين الإبداع والتكنولوجيا، مع التركيز على تحقيق نتائج قابلة للقياس. نلتزم بفهم عميق لأهداف عملائنا وتقديم استراتيجيات مخصصة تحقق النمو والتميز." 
            className="whatmn-card-text"
            type="p"
          />
        </div>
      </div>
    </div>
  );
};

export default WhatMN;
