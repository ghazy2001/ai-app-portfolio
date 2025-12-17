"use client";

import { useState } from "react";
import { FaMeta, FaTiktok } from "react-icons/fa6";
import ImageModal from "./ImageModal";
import EditableText from "../../components/EditableText";
import "./possibility.css";
import result1 from "../../assets/result1.jpg";
import result2 from "../../assets/result2.jpg";
import result3 from "../../assets/result3.jpg";
import result4 from "../../assets/result4.jpg";
import result5 from "../../assets/result5.jpg";

const Possibility = () => {
  const [activePlatform, setActivePlatform] = useState("meta");
  const [modalImage, setModalImage] = useState(null);

  const handlePlatformClick = (platform) => {
    setActivePlatform(platform);
  };

  const openModal = (imageId) => {
    setModalImage(imageId);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const platformPrefix = activePlatform === "meta" ? "meta" : "tiktok";

  // Define image data for each platform
  const metaImages = [
    { id: "meta1", url: result1 },
    { id: "meta4", url: result4 },
  ];

  const tiktokImages = [
   { id: "tiktok2", url: result2 },
  ];

  const storeDashboardImages = [
    { id: "dashboard3", url: result3 },
    { id: "dashboard5", url: result5 },
  ];

  const currentPlatformImages = activePlatform === "meta" ? metaImages : tiktokImages;

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
            <EditableText 
              section="possibility" 
              contentKey="tiktokLabel" 
              defaultContent="تيك توك" 
              type="span"
            />
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
            <EditableText 
              section="possibility" 
              contentKey="metaLabel" 
              defaultContent="ميتا" 
              type="span"
            />
          </div>
        </div>

        {/* Results Display */}
        <div className="results-display">
          <h2>
            <span className="platform-title">{activePlatform === "meta" ? "Meta" : "TikTok"}</span>
            <EditableText 
              section="possibility" 
              contentKey="successTitle" 
              defaultContent=" أخر نجاحاتنا على" 
              type="span"
            />
          </h2>
          <EditableText 
            section="possibility" 
            contentKey="resultsDescription" 
            defaultContent="إليك نظرة على أهم مؤشرات الأداء التي تعكس حجم المبيعات والكفاءة الإعلانية المحققة." 
            className="results-description"
            type="p"
          />

          <div className="platform__details">
            <ul>
              <li>
                <EditableText 
                  section="possibility" 
                  contentKey="purchasesLabel" 
                  defaultContent="المشتريات: " 
                  type="span"
                />
                <EditableText 
                  section="possibility" 
                  contentKey={`${platformPrefix}Purchases`}
                  defaultContent={activePlatform === "meta" ? "26,236" : "9,970"} 
                  type="span"
                />
                {" عملية"}
              </li>
              <li>
                <EditableText 
                  section="possibility" 
                  contentKey="totalValueLabel" 
                  defaultContent="إجمالي القيمة: " 
                  type="span"
                />
                <EditableText 
                  section="possibility" 
                  contentKey={`${platformPrefix}PurchaseValue`}
                  defaultContent={activePlatform === "meta" ? "9.47 مليون" : "3.61 مليون"} 
                  type="span"
                />
              </li>
              <li>
                <EditableText 
                  section="possibility" 
                  contentKey="totalSpentLabel" 
                  defaultContent="إجمالي الإنفاق: " 
                  type="span"
                />
                <EditableText 
                  section="possibility" 
                  contentKey={`${platformPrefix}TotalSpent`}
                  defaultContent={activePlatform === "meta" ? "811 ألف" : "227 ألف"} 
                  type="span"
                />
              </li>
            </ul>
          </div>

          {/* Platform Images */}
          <div className="platform__images">
            <EditableText 
              section="possibility" 
              contentKey="campaignDocsTitle" 
              defaultContent="وثائق تفصيلية للحملات:" 
              type="h3"
            />
            <div className="images-grid">
              {currentPlatformImages.map((image, index) => (
                <div
                  key={image.id}
                  className="image-item"
                  onClick={() => openModal(image.id)}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.id}
                    className="thumbnail"
                  />
                  <EditableText 
                    section="possibility" 
                    contentKey={`${image.id}Title`}
                    defaultContent={
                      image.id === "meta1" ? "تقرير أداء الحملات الرئيسية (Meta)" :
                      image.id === "meta4" ? "تحليل تكلفة النتائج وعائد الإنفاق (Meta)" :
                      "لوحة تحكم إعلانات تيك توك (TikTok)"
                    }
                    type="p"
                    id={`${image.id}-title`}
                  />
                  <EditableText 
                    section="possibility" 
                    contentKey={`${image.id}Description`}
                    defaultContent={
                      image.id === "meta1" ? "نظرة معمقة على مقاييس الأداء الرئيسية (ROAS، التكلفة لكل نتيجة، المشتريات) التي تعكس الكفاءة العالية في تحقيق الأهداف الإعلانية على منصة Meta." :
                      image.id === "meta4" ? "تفاصيل دقيقة لعمليات الشراء، توضح العلاقة بين حجم الإنفاق الإعلاني والعائد المحقق، مما يبرز فعالية استهدافنا وقياس الأداء." :
                      "توضيح مباشر لأداء المجموعات الإعلانية على TikTok، مع التركيز على انخفاض التكلفة لكل نتيجة (Cost per result) وارتفاع قيمة الشراء."
                    }
                    className="image-description"
                    type="div"
                    id={`${image.id}-desc`}
                  />
                  <EditableText 
                    section="possibility" 
                    contentKey="clickToViewText" 
                    defaultContent="انقر للمشاهدة والتفاصيل" 
                    className="click-to-view"
                    type="span"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Store Dashboard Section */}
        <div className="store-dashboard-section">
          <EditableText 
            section="possibility" 
            contentKey="storeDashboardTitle" 
            defaultContent="🎯 إجماليات أداء المتجر الشامل والربحية" 
            type="h2"
          />
          <EditableText 
            section="possibility" 
            contentKey="storeDashboardDescription" 
            defaultContent="هذه المقاييس هي النتيجة النهائية والربحية لجهودنا التسويقية والتشغيلية." 
            className="store-description"
            type="p"
          />

          <div className="images-grid store-grid">
            {storeDashboardImages.map((image, index) => (
              <div
                key={image.id}
                className="image-item store-item"
                onClick={() => openModal(image.id)}
              >
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.id}
                  className="thumbnail"
                />
                <EditableText 
                  section="possibility" 
                  contentKey={`${image.id}Title`}
                  defaultContent={
                    image.id === "dashboard3" ? "الإحصائيات الكلية للأرباح والمبيعات" :
                    "مؤشرات الأداء اليومية للمتجر"
                  }
                  type="h3"
                  id={`${image.id}-title`}
                />
                <EditableText 
                  section="possibility" 
                  contentKey={`${image.id}Description`}
                  defaultContent={
                    image.id === "dashboard3" ? "عرض إجمالي لإيرادات المتجر، صافي الأرباح، ومعدلات التحويل المتميزة التي تؤكد النمو المستدام للمتجر." :
                    "تتبع لحظي للزيارات والطلبات ومعدل التخلي عن السلة، مما يوفر رؤية سريعة حول أداء المتجر في فترة زمنية قصيرة."
                  }
                  className="image-description"
                  type="div"
                  id={`${image.id}-desc`}
                />
                <EditableText 
                  section="possibility" 
                  contentKey="clickToAnalyzeText" 
                  defaultContent="انقر للمشاهدة والتحليل" 
                  className="click-to-view"
                  type="span"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal with editable details */}
      {modalImage && <ImageModal imageId={modalImage} onClose={closeModal} />}
    </>
  );
};

export default Possibility;
