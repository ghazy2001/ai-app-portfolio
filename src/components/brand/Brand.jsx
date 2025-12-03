import React, { useEffect, useState } from "react";
import "./brand.css";
import { motion } from "framer-motion";

const statsData = [
  { number: 4000, suffix: "+", title: "رضا العملاء" },
  { number: 820, suffix: "", title: "معدل النمو" },
  { number: 120, suffix: "", title: "إدخال البيانات اليومي" },
  { number: 90, suffix: "+", title: "الموظفون المتحمسون" },
];

export default function Brand() {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // مدة العد (2 ثانية)
    const interval = 30;
    const steps = duration / interval;

    statsData.forEach((stat, i) => {
      setTimeout(() => {
        let current = 0;
        const increment = stat.number / steps;

        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(counter);
          }
          setCounts((prev) => {
            const newCounts = [...prev];
            newCounts[i] = Math.floor(current);
            return newCounts;
          });
        }, interval);
      }, i * 0.2 * 1000); // delay to match animation delay
    });
  }, [isInView]);

  return (
    <section className="stats-section">
      <motion.div
        className="stats-container"
        onViewportEnter={() => setIsInView(true)}
        viewport={{ once: true }}
      >
        {statsData.map((stat, i) => (
          <motion.div
            className="stat-box"
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="stat-box" key={i}>
              <h2 className="stat-number">
                {counts[i]}
                {stat.suffix}
              </h2>
              <p className="stat-title">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
