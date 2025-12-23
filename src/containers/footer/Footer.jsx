import logo from "../../assets/logo2.png";
import "./footer.css";

import { RiTwitterXFill, RiLinkedinFill, RiInstagramLine, RiFacebookCircleFill, RiYoutubeFill } from "react-icons/ri";
import { FaTiktok } from 'react-icons/fa';
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <div className="MN__footer section__padding" dir="ltr">
      
      <div className="MN__footer-links">
        {/* Column 1: Logo & Desc */}
        <div className="MN__footer-col logo-col">
          <img src={logo} alt="Logo" className="footer-logo-img" />
          <p className="footer-desc">
            We provide professional digital solutions tailored to your business needs, elevating your brand to the next level.
          </p>
        </div>

        {/* Column 2: Menu */}
        <div className="MN__footer-col">
          <h4>Menu</h4>
          <p><a href="#home">Home</a></p>
          <p><a href="#whatmn">About Us</a></p>
          <p><a href="#features">Services</a></p>
          <p><a href="/portfolio">Portfolio</a></p>
          <p><a href="/blog">Blog</a></p>
          <p><a href="#contact">Contact</a></p>
        </div>

        {/* Column 3: Services */}
        <div className="MN__footer-col">
          <h4>Services</h4>
          <p><a href="#features">Web Development</a></p>
          <p><a href="#features">SEO Optimization</a></p>
          <p><a href="#features">Social Media</a></p>
          <p><a href="#features">Media Buying</a></p>
          <p><a href="#features">Branding</a></p>
          <p><a href="#features">Media Production</a></p>
        </div>

        {/* Column 4: Contact */}
        <div className="MN__footer-col contact-col">
          <h4>Contact</h4>
          
          <div className="footer-contact-item">
            <MdPhone />
            <a href="tel:+201556971874">+20 15 56971874</a>
          </div>
          <div className="footer-contact-item">
             <MdPhone />
             <a href="tel:+966574295501">+966 57 429 5501</a>
          </div>

          <div className="footer-contact-item">
             <MdEmail />
             <a href="mailto:info@mnmarketingagency.com">info@mnmarketingagency.com</a>
          </div>

          <div className="footer-socials">
             <a href="https://wa.me/..." target="_blank" rel="noreferrer"><RiTwitterXFill /></a>
             <a href="https://instagram.com/..." target="_blank" rel="noreferrer"><RiInstagramLine /></a>
             <a href="https://facebook.com/..." target="_blank" rel="noreferrer"><RiFacebookCircleFill /></a>
             <a href="https://linkedin.com/..." target="_blank" rel="noreferrer"><RiLinkedinFill /></a>
             <a href="https://tiktok.com/..." target="_blank" rel="noreferrer"><FaTiktok /></a>
          </div>
        </div>
      </div>

      <div className="MN__footer-copyright">
        <p>© 2026 MN MARKETING AGENCY. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
