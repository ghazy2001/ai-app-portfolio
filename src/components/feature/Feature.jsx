import "./feature.css";
const Feature = ({ title, text, className }) => {
  return (
    <div className="MN__features-container__feature">
      <div className="MN__features-container__feature-title">
        <div></div>
        <h1>{title}</h1>
      </div>
      <div className="MN__features-container_feature-text">
        <p className={className}>{text}</p>
      </div>
    </div>
  );
};

export default Feature;
