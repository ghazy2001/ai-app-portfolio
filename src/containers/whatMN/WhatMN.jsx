import "./whatMN.css";
import Feature from "../../components/feature/Feature";
const WhatMN = () => {
  return (
    <div
      className="MN__whatmn section__margin "
      id="wmn"
      style={{ direction: "rtl" }}
    >
      <div className="MN__whatmn-feature">
        <Feature
          title="من نحن ؟"
          text="فريق متخصص في التسويق الرقمي والتصميم. نؤمن أن التسويق الحقيقي يبني علاقات دائمة بين العلامات والعملاء. نجمع بين الإبداع والبيانات لإنشاء حملات تحقق نتائج ملموسة وتضاعف مبيعاتك."
          className="spaced"
        />
      </div>

      <div className="MN__whatmn-heading">
        <h1 className="gradient__text spaced-heading">
          استراتيجيات تسويقية ذكية تحوّل عملاءك إلى دعاة لعلامتك{" "}
        </h1>
        <p>اكتشف خدماتنا</p>
      </div>
      <div className="MN__whatmn-container">
        <Feature
          title="فهم عميق لجمهورك"
          text="نحلل بيانات سلوك عملائك لتحديد احتياجاتهم الحقيقية. هذا الفهم يساعدنا في صياغة رسائل تترجم بشكل مباشر إلى تحويلات وولاء."
        />
        <Feature
          title="حملات إعلانية عالية الأداء"
          text="نصمم حملات مستهدفة على Facebook و Instagram و TikTok مع تحسين مستمر. كل حملة مبنية على اختبارات وبيانات، ليس على الحدس."
        />
        <Feature
          title="محتوى يبني العلاقات"
          text="محتوى جذاب وأصلي يعكس شخصية علامتك ويزيد التفاعل. نحن ننشئ قصصاً تترك أثراً وتحول المتابعين إلى عملاء."
        />
      </div>
    </div>
  );
};

export default WhatMN;
