"use client";


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
      "ROAS: 11.67",
      "Cost per Result: 31.9 EGP",
      "Total Purchases: 26,236",
      "Total Sales Value: 9.47 Million EGP",
      "Conversion Rate: 4.3%",
    ],
    meta4: [
      "Total Ad Spend: 811k EGP",
      "Avg. Cost per Campaign: 203k EGP",
      "Best Performing Campaign: Special Offers (ROAS 14.2)",
      "Lowest Cost per Result: 19.5 EGP",
      "Active Campaigns: 4",
    ],
    tiktok2: [
      "ROAS: 15.89",
      "Cost per Result: 22.8 EGP",
      "Total Purchases: 9,970",
      "Total Sales Value: 3.61 Million EGP",
      "Conversion Rate: 5.8%",
    ],
    dashboard3: [
      "Total Revenue: 13.08 Million EGP",
      "Net Profit: 4.2 Million EGP",
      "Profit Margin: 32.1%",
      "Total Orders: 36,206",
      "Avg. Order Value: 361 EGP",
    ],
    dashboard5: [
      "Daily Visits: 45,230",
      "Daily Orders: 1,245",
      "Daily Conversion Rate: 2.75%",
      "Cart Abandonment Rate: 68.3%",
      "Avg. Session Time: 4m 23s",
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
            <h2>
              {imageId === "meta1" ? "Meta Main Campaigns Performance" :
               imageId === "meta4" ? "Cost Analysis & ROAS (Meta)" :
               imageId === "tiktok2" ? "TikTok Ads Dashboard" :
               imageId === "dashboard3" ? "Total Sales & Profit Overview" :
               "Daily Performance Indicators"}
            </h2>
            <p>
              {imageId === "meta1" ? "In-depth look at key performance metrics (ROAS, CPR, Purchases) reflecting high efficiency in achieving advertising goals on Meta." :
               imageId === "meta4" ? "Detailed purchase analysis showing the relationship between ad spend and realized revenue, highlighting targeting effectiveness." :
               imageId === "tiktok2" ? "Direct insight into TikTok ad set performance, focusing on low Cost per Result and high purchase value." :
               imageId === "dashboard3" ? "Overview of store revenue, net profit, and outstanding conversion rates confirming sustainable growth." :
               "Real-time tracking of visits, orders, and cart abandonment, providing quick insights into short-term performance."}
            </p>
            {details && details.length > 0 && (
              <div className="modal-details">
                <h3>📊 Key Details:</h3>
                <ul>
                  {details.map((detail, index) => (
                    <li key={index}>
                      <span>{detail}</span>
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
