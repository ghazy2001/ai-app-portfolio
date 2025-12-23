import result1 from "../assets/result1.jpg";
import result2 from "../assets/result2.jpg";
import result3 from "../assets/result3.jpg";
import result4 from "../assets/result4.jpg";
import result5 from "../assets/result5.jpg";

export const portfolioBackup = {
  meta: {
    label: "Meta",
    color: "#1877F2",
    stats: {
      purchases: "26,236",
      revenue: "$9.47M",
      spend: "$811K"
    },
    caseStudies: [
      {
        id: "meta1",
        image: result1,
        title: "Main Campaign Performance (Meta)",
        description: "Deep dive into core KPIs (ROAS, CPR, Purchases) highlighting high efficiency in achieving ad goals on Meta."
      },
      {
        id: "meta4",
        image: result4,
        title: "Cost & ROAS Analysis (Meta)",
        description: "Detailed purchase breakdown showing the relationship between ad spend and return, demonstrating targeting effectiveness."
      },
    ]
  },
  tiktok: {
    label: "TikTok",
    color: "#FE2C55",
    stats: {
      purchases: "9,970",
      revenue: "$3.61M",
      spend: "$227K"
    },
    caseStudies: [
      {
        id: "tiktok2",
        image: result2,
        title: "TikTok Ads Dashboard",
        description: "Direct view of TikTok ad group performance, focusing on low Cost per Result and high purchase value."
      }
    ]
  },
  store: {
    label: "Store Performance",
    caseStudies: [
      {
        id: "dashboard3",
        image: result3,
        title: "Total Sales & Profit Stats",
        description: "Total store revenue, net profit, and conversion rates confirming sustainable growth."
      },
      {
        id: "dashboard5",
        image: result5,
        title: "Daily Store KPIs",
        description: "Real-time tracking of visits, orders, and cart abandonment, providing quick insights into short-term performance."
      }
    ]
  }
};
