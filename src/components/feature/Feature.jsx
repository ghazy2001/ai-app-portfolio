import EditableText from "../EditableText";
import "./feature.css";
const Feature = ({ title, text, className, index }) => {
  return (
    <div className="MN__features-container__feature">
      <div className="MN__features-container__feature-title">
        <div></div>
        <EditableText
            section="features"
            contentKey={`title-${index}`}
            defaultContent={title}
            type="h1"
        />
      </div>
      <div className="MN__features-container_feature-text">
        <EditableText
            section="features"
            contentKey={`text-${index}`}
            defaultContent={text}
            className={className}
            type="p"
        />
      </div>
    </div>
  );
};

export default Feature;
