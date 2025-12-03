import logo from "../../assets/logo2.png";
import "./footer.css";
const Footer = () => {
  return (
    <div className="MN__footer section__padding" dir="rtl">
      <div className="MN__footer-heading">
        <h1 className="gradient__text">
          هل تريد أن تخطو نحو المستقبل قبل الآخرين؟
        </h1>
      </div>
      <div className="MN__footer-btn">
        <p>تواصل معنا الان</p>
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
          <p>Gharbia Governorate, El-Mahalla el-Kubra, Egypt</p>
          <p>+20 15 56971874</p>
          <p>info@mnmarketingagency.com</p>
        </div>
      </div>
      <div className="MN__footer-copyright">
        <p>© 2026 MARKETING AGENCY. جميع الحقوق محفوظة</p>
      </div>
    </div>
  );
};

export default Footer;
