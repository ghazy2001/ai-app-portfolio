import "./header.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import caro1 from "../../assets/caro1.png";
import caro2 from "../../assets/caro2.png";
import caro3 from "../../assets/caro3.png";
import caro4 from "../../assets/caro4.png";
import caro5 from "../../assets/caro5.png";
import caro6 from "../../assets/caro6.png";
import caro7 from "../../assets/caro7.png";

const Header = ({ loading }) => {
  const clients = [caro1, caro2, caro3, caro4, caro5, caro6, caro7];

  // If loading is undefined (e.g. strict mode re-renders or other pages), default to false (show content)
  const shouldShow = loading === undefined ? true : !loading;

  return (
    <motion.div
      className="MN__header section__padding"
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldShow ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <motion.div
        className="MN__header-content"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: shouldShow ? 0 : 30, opacity: shouldShow ? 1 : 0 }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
          delay: shouldShow ? 0.5 : 0,
        }}
      >
        <h5 className="MN__header-kicker shiny-text">Sales First .. Always</h5>
        <h1 className="MN__header-title">Performance Marketing Agency</h1>
        <p className="MN__header-subtitle">
          Helping Businesses Scale with Smart Campaigns | 5 Years of Experience
          in Performance Marketing
        </p>

        <div className="MN__header-btn-container">
          <Link to="/contact">
            <button className="MN__header-btn MN__header-btn-primary">
              Contact us
            </button>
          </Link>
          <Link to="/portfolio">
            <button className="MN__header-btn MN__header-btn-secondary">
              Browse Our Portfolio
            </button>
          </Link>
        </div>

        <div className="MN__header-clients">
          <div className="MN__header-clients-slider">
            {clients.map((logo, index) => (
              <img key={index} src={logo} alt={`client-${index}`} />
            ))}
            {/* Duplicate for infinite scroll effect */}
            {clients.map((logo, index) => (
              <img
                key={`dup-${index}`}
                src={logo}
                alt={`client-dup-${index}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
