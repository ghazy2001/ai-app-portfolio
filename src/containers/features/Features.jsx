import "./features.css";
import Feature from "../../components/feature/Feature";

import servicesData from "../../constants/servicesData";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { RiArrowRightLine } from "react-icons/ri";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each card
      delayChildren: 0.3, // Delay before starting
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Features = () => {
  return (
    <div className="MN__features section__padding" id="features">
      {/* Heading Animation (Independent) */}
      <motion.div
        className="MN__features-heading"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="features-title">
          Accelerate Your Growth with Performance-Driven Marketing.
        </h1>
        <p className="features-subtext">
          We provide comprehensive digital solutions designed to scale your
          business and maximize ROI.
        </p>
        <Link to="/services">
          <button
            className="cta-button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            View All Services <RiArrowRightLine size={20} />
          </button>
        </Link>
      </motion.div>

      {/* Grid Container with Staggered Children */}
      <motion.div
        className="MN__features-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {servicesData.slice(0, 4).map((item, index) => (
          <motion.div key={item.title + index} variants={cardVariants}>
            <Feature title={item.title} text={item.text} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
