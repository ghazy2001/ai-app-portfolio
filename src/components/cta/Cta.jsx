import "./cta.css";

import { Link } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

const Cta = () => {
  return (
    <div className="MN__cta" style={{ direction: "ltr" }}>
      <div className="MN__cta-content">
        <p>Ready to start your journey?</p>
        <h3>
          Register with us today and launch your project to the next level.
        </h3>
      </div>

      <div className="MN__cta-btn">
        <Link
          to="/contact"
          className="glow-btn"
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span>Start Project</span>
          <RiArrowRightLine size={50} />
        </Link>
      </div>
    </div>
  );
};

export default Cta;
