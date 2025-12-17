"use client";

import EditableText from "../../components/EditableText";
import result1 from "../../assets/result1.jpg";
import result2 from "../../assets/result2.jpg";
import result3 from "../../assets/result3.jpg";
import result4 from "../../assets/result4.jpg";
import result5 from "../../assets/result5.jpg";

const ImageModal = ({ imageId, onClose }) => {
  if (!imageId) return null;

  // Map image IDs to their URLs
  const imageUrls = {
    meta1: result1,
    meta4: result4,
    tiktok2: result2,
    dashboard3: result3,
    dashboard5: result5,
  };

  // Define default details for each image
  const imageDetails = {
    meta1: [
      "معدل العائد على الإنفاق (ROAS): 11.67",
      "التكلفة لكل نتيجة: 31.9 ج.م",
      "إجمالي المشتريات: 26,236 عملية",
      "القيمة الإجمالية للمشتريات: 9.47 مليون ج.م",
      "معدل التحويل: 4.3%",
    ],
    meta4: [
      "إجمالي الإنفاق الإعلاني: 811 ألف ج.م",
      "متوسط تكلفة الحملة: 203 ألف ج.م",
      "أفضل حملة أداءً: حملة العروض الخاصة بـ ROAS 14.2",
      "أقل تكلفة نتيجة: 19.5 ج.م",
      "عدد الحملات النشطة: 4 حملات",
    ],
    tiktok2: [
      "معدل العائد على الإنفاق (ROAS): 15.89",
      "التكلفة لكل نتيجة: 22.8 ج.م",
      "إجمالي المشتريات: 9,970 عملية",
      "القيمة الإجمالية للمشتريات: 3.61 مليون ج.م",
      "معدل التحويل: 5.8%",
    ],
    dashboard3: [
      "إجمالي الإيرادات: 13.08 مليون ج.م",
      "صافي الأرباح: 4.2 مليون ج.م",
      "هامش الربح: 32.1%",
      "عدد الطلبات: 36,206 طلب",
      "متوسط قيمة الطلب: 361 ج.م",
    ],
    dashboard5: [
      "الزيارات اليومية: 45,230 زيارة",
      "الطلبات اليومية: 1,245 طلب",
      "معدل التحويل اليومي: 2.75%",
      "معدل التخلي عن السلة: 68.3%",
      "متوسط وقت الجلسة: 4 دقائق 23 ثانية",
    ],
  };

  const imageUrl = imageUrls[imageId];
  const details = imageDetails[imageId] || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">
          {/* Image on the left */}
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={imageId}
            className="modal-image"
          />
          {/* Details on the right */}
          <div className="modal-text">
            <EditableText 
              section="possibility" 
              contentKey={`${imageId}Title`}
              defaultContent={
                imageId === "meta1" ? "تقرير أداء الحملات الرئيسية (Meta)" :
                imageId === "meta4" ? "تحليل تكلفة النتائج وعائد الإنفاق (Meta)" :
                imageId === "tiktok2" ? "لوحة تحكم إعلانات تيك توك (TikTok)" :
                imageId === "dashboard3" ? "الإحصائيات الكلية للأرباح والمبيعات" :
                "مؤشرات الأداء اليومية للمتجر"
              }
              type="h2"
            />
            <EditableText 
              section="possibility" 
              contentKey={`${imageId}Description`}
              defaultContent={
                imageId === "meta1" ? "نظرة معمقة على مقاييس الأداء الرئيسية (ROAS، التكلفة لكل نتيجة، المشتريات) التي تعكس الكفاءة العالية في تحقيق الأهداف الإعلانية على منصة Meta." :
                imageId === "meta4" ? "تفاصيل دقيقة لعمليات الشراء، توضح العلاقة بين حجم الإنفاق الإعلاني والعائد المحقق، مما يبرز فعالية استهدافنا وقياس الأداء." :
                imageId === "tiktok2" ? "توضيح مباشر لأداء المجموعات الإعلانية على TikTok، مع التركيز على انخفاض التكلفة لكل نتيجة (Cost per result) وارتفاع قيمة الشراء." :
                imageId === "dashboard3" ? "عرض إجمالي لإيرادات المتجر، صافي الأرباح، ومعدلات التحويل المتميزة التي تؤكد النمو المستدام للمتجر." :
                "تتبع لحظي للزيارات والطلبات ومعدل التخلي عن السلة، مما يوفر رؤية سريعة حول أداء المتجر في فترة زمنية قصيرة."
              }
              type="p"
            />
            {details && details.length > 0 && (
              <div className="modal-details">
                <EditableText 
                  section="possibility" 
                  contentKey="modalDetailsHeading" 
                  defaultContent="📊 التفاصيل الرئيسية:" 
                  type="h3"
                />
                <ul>
                  {details.map((detail, index) => (
                    <li key={index}>
                      <EditableText 
                        section="possibility" 
                        contentKey={`${imageId}Detail${index + 1}`}
                        defaultContent={detail}
                        type="span"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
