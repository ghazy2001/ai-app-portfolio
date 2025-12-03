"use client";

import { useState } from "react";
import { FaMeta, FaTiktok } from "react-icons/fa6";
import ImageModal from "./ImageModal";
import "./possibility.css";
import result1 from "../../assets/result1.jpg";
import result2 from "../../assets/result2.jpg";
import result3 from "../../assets/result3.jpg";
import result4 from "../../assets/result4.jpg";
import result5 from "../../assets/result5.jpg";

const metaData = {
  purchases: 26236,
  purchaseValue: "9.47 مليون",
  totalSpent: "811 ألف",
  images: [
    {
      id: "meta1",
      url: result1,
      title: "تقرير أداء الحملات الرئيسية (Meta)",
      description:
        "نظرة معمقة على مقاييس الأداء الرئيسية (ROAS، التكلفة لكل نتيجة، المشتريات) التي تعكس الكفاءة العالية في تحقيق الأهداف الإعلانية على منصة Meta.",
      /* إضافة تفاصيل إضافية للعرض في Modal */
      details: [
        "معدل العائد على الإنفاق (ROAS): 11.67",
        "التكلفة لكل نتيجة: 31.9 ج.م",
        "إجمالي المشتريات: 26,236 عملية",
        "القيمة الإجمالية للمشتريات: 9.47 مليون ج.م",
        "معدل التحويل: 4.3%",
      ],
    },
    {
      id: "meta4",
      url: result4,
      title: "تحليل تكلفة النتائج وعائد الإنفاق (Meta)",
      description:
        "تفاصيل دقيقة لعمليات الشراء، توضح العلاقة بين حجم الإنفاق الإعلاني والعائد المحقق، مما يبرز فعالية استهدافنا وقياس الأداء.",
      /* إضافة تفاصيل إضافية للعرض في Modal */
      details: [
        "إجمالي الإنفاق الإعلاني: 811 ألف ج.م",
        "متوسط تكلفة الحملة: 203 ألف ج.م",
        "أفضل حملة أداءً: حملة العروض الخاصة بـ ROAS 14.2",
        "أقل تكلفة نتيجة: 19.5 ج.م",
        "عدد الحملات النشطة: 4 حملات",
      ],
    },
  ],
};

const tiktokData = {
  purchases: 9970,
  purchaseValue: "3.61 مليون",
  totalSpent: "227 ألف",
  images: [
    {
      id: "tiktok2",
      url: result2,
      title: "لوحة تحكم إعلانات تيك توك (TikTok)",
      description:
        "توضيح مباشر لأداء المجموعات الإعلانية على TikTok، مع التركيز على انخفاض التكلفة لكل نتيجة (Cost per result) وارتفاع قيمة الشراء.",
      /* إضافة تفاصيل إضافية للعرض في Modal */
      details: [
        "معدل العائد على الإنفاق (ROAS): 15.89",
        "التكلفة لكل نتيجة: 22.8 ج.م",
        "إجمالي المشتريات: 9,970 عملية",
        "القيمة الإجمالية للمشتريات: 3.61 مليون ج.م",
        "معدل التحويل: 5.8%",
      ],
    },
  ],
};

const storeDashboardImages = [
  {
    id: "dashboard3",
    url: result3,
    title: "الإحصائيات الكلية للأرباح والمبيعات",
    description:
      "عرض إجمالي لإيرادات المتجر، صافي الأرباح، ومعدلات التحويل المتميزة التي تؤكد النمو المستدام للمتجر.",
    /* إضافة تفاصيل إضافية للعرض في Modal */
    details: [
      "إجمالي الإيرادات: 13.08 مليون ج.م",
      "صافي الأرباح: 4.2 مليون ج.م",
      "هامش الربح: 32.1%",
      "عدد الطلبات: 36,206 طلب",
      "متوسط قيمة الطلب: 361 ج.م",
    ],
  },
  {
    id: "dashboard5",
    url: result5,
    title: "مؤشرات الأداء اليومية للمتجر",
    description:
      "تتبع لحظي للزيارات والطلبات ومعدل التخلي عن السلة، مما يوفر رؤية سريعة حول أداء المتجر في فترة زمنية قصيرة.",
    /* إضافة تفاصيل إضافية للعرض في Modal */
    details: [
      "الزيارات اليومية: 45,230 زيارة",
      "الطلبات اليومية: 1,245 طلب",
      "معدل التحويل اليومي: 2.75%",
      "معدل التخلي عن السلة: 68.3%",
      "متوسط وقت الجلسة: 4 دقائق 23 ثانية",
    ],
  },
];

const Possibility = () => {
  const [activePlatform, setActivePlatform] = useState("meta");
  const [modalImage, setModalImage] = useState(null);

  const handlePlatformClick = (platform) => {
    setActivePlatform(platform);
  };

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const currentPlatformData = activePlatform === "meta" ? metaData : tiktokData;
  const currentPlatformTitle = activePlatform === "meta" ? "Meta" : "TikTok";

  return (
    <>
      <div className="possibility section__padding" id="possibility">
        {/* Platform Selector */}
        <div className="platform-selector">
          <div
            className={`platform-icon ${
              activePlatform === "tiktok" ? "active" : ""
            }`}
            onClick={() => handlePlatformClick("tiktok")}
          >
            <FaTiktok
              color={activePlatform === "tiktok" ? "#ffffff" : "#555"}
              size={150}
            />
            <span>تيك توك</span>
          </div>
          <div
            className={`platform-icon ${
              activePlatform === "meta" ? "active" : ""
            }`}
            onClick={() => handlePlatformClick("meta")}
          >
            <FaMeta
              color={activePlatform === "meta" ? "#00559A" : "#555"}
              size={150}
            />
            <span>ميتا</span>
          </div>
        </div>

        {/* Results Display */}
        <div className="results-display">
          <h2>
            <span className="platform-title">{currentPlatformTitle}</span>
            {""} أخر نجاحاتنا على
          </h2>
          <p className="results-description">
            إليك نظرة على أهم مؤشرات الأداء التي تعكس حجم المبيعات والكفاءة
            الإعلانية المحققة.
          </p>

          <div className="platform__details">
            <ul>
              <li>المشتريات: {currentPlatformData.purchases} عملية</li>
              <li>إجمالي القيمة: {currentPlatformData.purchaseValue}</li>
              <li>إجمالي الإنفاق: {currentPlatformData.totalSpent}</li>
            </ul>
          </div>

          {/* Platform Images */}
          <div className="platform__images">
            <h3>وثائق تفصيلية للحملات:</h3>
            <div className="images-grid">
              {currentPlatformData.images.map((image) => (
                <div
                  key={image.id}
                  className="image-item"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.title}
                    className="thumbnail"
                  />
                  <p>{image.title}</p>
                  <div className="image-description">{image.description}</div>
                  <span className="click-to-view">انقر للمشاهدة والتفاصيل</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Dashboard Section */}
        <div className="store-dashboard-section">
          <h2>🎯 إجماليات أداء المتجر الشامل والربحية</h2>
          <p className="store-description">
            هذه المقاييس هي النتيجة النهائية والربحية لجهودنا التسويقية
            والتشغيلية.
          </p>

          <div className="images-grid store-grid">
            {storeDashboardImages.map((image) => (
              <div
                key={image.id}
                className="image-item store-item"
                onClick={() => openModal(image)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.title}
                  className="thumbnail"
                />
                <h3>{image.title}</h3>
                <div className="image-description">{image.description}</div>
                <span className="click-to-view">انقر للمشاهدة والتحليل</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <ImageModal
          imageUrl={modalImage.url}
          title={modalImage.title}
          description={modalImage.description}
          details={modalImage.details}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Possibility;
