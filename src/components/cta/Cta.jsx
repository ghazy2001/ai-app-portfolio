import "./cta.css";
import EditableText from "../EditableText";
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <div className="MN__cta">
      <div className="MN__cta-content">
        <EditableText section="cta" contentKey="subtext" defaultContent="ابدأ رحلتك التسويقية الآن" type="p" />
        <EditableText section="cta" contentKey="heading" defaultContent="سجّل معنا اليوم واطلق مشروعك لأعلى مستوى من النجاح." type="h3" />
      </div>

      <div className="MN__cta-btn">
        <Link to="/contact" className="glow-btn">
          <span>ابدأ الآن</span>
        </Link>
      </div>
    </div>
  );
};

export default Cta;
