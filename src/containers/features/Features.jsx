import "./features.css";
import Feature from "../../components/feature/Feature";
import EditableText from "../../components/EditableText";

const featureData = [
  {
    title: "إدارة الحملات الإعلانية",
    text: "نصمم و نُدير حملات إعلانية فعّالة على جميع المنصات (Facebook , Instagram , Tiktok)، لزيادة الوعي و تحقيق أفضل عائد استثماري.",
  },
  {
    title: "تحليل الأداء والتقارير",
    text: "نوفر تقارير دقيقة و ذكية لتحليل نتائج حملاتك و مساعدتك في اتخاذ قرارات تسويقية مبنية على بيانات حقيقية.",
  },
  {
    title: "إدارة المحتوى والسوشيال ميديا",
    text: "نشئ محتوى جذّاب و مؤثر يعكس هوية علامتك و يزيد من تفاعل الجمهور معك عبر مختلف المنصات الرقمية.",
  },
  {
    title: "العلامة التجارية والتصميم الإبداعي",
    text: "نساعدك في بناء هوية بصرية قوية و تصميمات احترافية تميزك عن المنافسين و تُبرز قيم علامتك التجارية.",
  },
];

const Features = () => {
  return (
    <div
      className="MN__features section__padding"
      id="features"
      style={{ direction: "rtl" }}
    >
      <div className="MN__features-heading">
        <EditableText
            section="features"
            contentKey="mainHeading"
            defaultContent="نقدّم حلولًا مبتكرة لتطوير حضورك الرقمي و زيادة مبيعاتك. دعنا نساعدك على بناء استراتيجية تسويقية تنقل علامتك إلى المستوى التالي."
            className="gradient__text"
            type="h1"
        />
        <button className="cta-button">ابدأ الآن و حقق نجاحك التسويقي</button>
      </div>
      <div className="MN__features-container">
        {featureData.map((item, index) => (
          <Feature
            title={item.title}
            text={item.text}
            key={item.title + index}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
