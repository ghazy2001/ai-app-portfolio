import logo from "../../assets/logo2.png";
import "./footer.css";
import EditableText from "../../components/EditableText";

const Footer = () => {
  return (
    <div className="MN__footer section__padding" dir="rtl">
      <div className="MN__footer-heading">
        <EditableText 
            section="footer" 
            contentKey="heading" 
            defaultContent="هل تريد أن تخطو نحو المستقبل قبل الآخرين؟" 
            className="gradient__text"
            type="h1"
        />
      </div>
      <div className="MN__footer-btn">
        <a href="/contact" className="footer-cta-button">
          <EditableText section="footer" contentKey="btnText" defaultContent="تواصل معنا الآن" type="span" />
        </a>
      </div>
      <div className="MN__footer-links">
        <div className="MN__footer-links_logo">
          <img src={logo} alt="الشعار" />
        </div>
        <div className="MN__footer-links_div">
          <h4>روابط</h4>
          <p>الشكاوى</p>
          <p>التواصل الاجتماعي</p>
          <p>الاعدادات</p>
          <p>اتصل بنا</p>
        </div>

        <div className="MN__footer-links_div">
          <h4>الشركة</h4>
          <p>الشروط والأحكام</p>
          <p>سياسة الخصوصية</p>
          <p>اتصل بنا</p>
        </div>
        <div className="MN__footer-links_div">
          <h4>تواصل معنا</h4>
          <EditableText section="footer" contentKey="address" defaultContent="Gharbia Governorate, El-Mahalla el-Kubra, Egypt" type="p" />
          <EditableText section="footer" contentKey="phone" defaultContent="+20 15 56971874" type="p" />
          <EditableText section="footer" contentKey="email" defaultContent="info@mnmarketingagency.com" type="p" />
        </div>
      </div>
      <div className="MN__footer-copyright">
        <p>© 2026 MARKETING AGENCY. جميع الحقوق محفوظة</p>
      </div>
    </div>
  );
};

export default Footer;
