import "./header.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EditableText from "../../components/EditableText";

import logo from "../../assets/logo2.png";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instgram.svg";
import linkedin from "../../assets/linkedin.svg";
import tiktok from "../../assets/tiktok.svg";
import youtube from "../../assets/youtube.svg";

const Header = () => {
  return (
    <motion.div
      className="MN__header section__padding"
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* ===== اللوجو والأيقونات (يظهروا أولاً) ===== */}
      <motion.div
        className="MN__header-image"
        initial={{ scale: 0.5, opacity: 0, rotateY: 90 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
      >
        <div className="MN__header-image-wrapper">
          <div className="MN__header-social-icons">
            <img src={facebook} alt="facebook" />
            <img src={instagram} alt="instagram" />
            <img src={linkedin} alt="linkedin" />
            <img src={tiktok} alt="tiktok" />
            <img src={youtube} alt="youtube" />
          </div>
          <motion.img
            src={logo}
            alt="logo"
            className="MN__header-logo"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.3,
            }}
          />
        </div>
      </motion.div>

      {/* ===== محتوى النصوص (يظهر بعد اللوجو) ===== */}
      <motion.div
        className="MN__header-content"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 1.3 }}
      >

        <EditableText 
          section="header" 
          contentKey="title" 
          defaultContent="نضع البيانات في قلب كل قرار ونبني استراتيجيات" 
          className="gradient__text"
          type="h1"
        />
        <EditableText 
          section="header" 
          contentKey="subtitle" 
          defaultContent="قابلة للقياس تحقق نموًا حقيقيًا لأعمالك. تنفيذنا دقيق ومتكامل — من استهداف الجمهور وصياغة الرسائل إلى إدارة الحملات وتحليل الأداء — مع دورات تحسين مستمرة تُقلّل تكلفة الاكتساب وتضاعف عائد الاستثمار." 
          type="p"
        />
        <div className="MN__header-content__input">
          <input type="email" placeholder="Your Email Address" />{" "}
          <Link to="/contact">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              احصل على خطة
            </motion.button>
          </Link>
        </div>
        <p>استشارة مهنية لمدة 30 دقيقة؛ بدون التزام.</p>
      </motion.div>
    </motion.div>
  );
};

export default Header;
