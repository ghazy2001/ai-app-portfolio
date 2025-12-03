import "./blog.css";
// سنفترض أن هذه الصور أصبحت مرتبطة بمحتوى عربي ذي صلة
import { blog01, blog02, blog03, blog04, blog05 } from "./imports";
import { Article } from "../../components";

const Blog = () => {
  return (
    // تغيير الكلاسات إلى أسماء عربية أو الحفاظ على نفس التسمية مع دعم RTL في CSS
    <div className="MN__blog section__padding" id="blog">
      <div className="MN__blog-heading">
        {/* عنوان رئيسي جذاب ومحفز */}
        <h1 className="gradient__text" dir="rtl">
          أحدث المستجدات في عالم التسويق الرقمي، <br />
          نحن نوثقها عبر مدونتنا.
        </h1>
        <p>تصفح المزيد</p>
      </div>
      <div className="MN__blog-container">
        {/* المجموعة أ: المقالة الأبرز */}
        <div className="MN__blog-container_groupA">
          <Article
            imgUrl={blog05}
            date="سبتمبر 15, 2025"
            title="تيك توك وواتساب للأعمال: أدوات جديدة لزيادة التحويلات وتوسيع قاعدة العملاء"
          />
        </div>

        {/* المجموعة ب: المقالات الفرعية */}
        <div className="MN__blog-container_groupB">
          <Article
            imgUrl={blog02}
            date="نوفمبر 25, 2025"
            title="التجارة الإلكترونية في مصر 2026: استغلال الفرص وتجاوز التحديات اللوجستية"
          />
          <Article
            imgUrl={blog03}
            date="نوفمبر 20, 2025"
            title="ما وراء الأرقام: كيف تُستخدم تحليلات البيانات في بناء شخصية العميل (Buyer Persona)؟"
          />
          <Article
            imgUrl={blog04}
            date="أكتوبر 24, 2025"
            title="ملخص مؤتمر DigiMarCon North Africa 2025: أبرز الاتجاهات التي شكلت مستقبل الديجيتال ماركتنج"
          />
          <Article
            imgUrl={blog01}
            date="نوفمبر 30, 2025"
            title="ثورة الذكاء الاصطناعي: كيف يغير الـ AI قواعد اللعبة في استراتيجيات المحتوى؟"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
