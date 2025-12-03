"use client";
import { useState, useRef } from "react";
import "./testimonials.css";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Rovana",
      title: " Clothing (Brand)",
      text: "بنتعامل معاهم من زمان فعلآ شركه ممتازة جدآ البشمهندس محمد حد فوق المحترم بشويه بجد ❤️ ❤️",
    },
    {
      id: 2,
      name: "Nada ibrahim",
      title: "makeup artist",
      text: "بعمل معاهم إعلانات شاطرين اوي بجد ❤️❤️",
    },
    {
      id: 3,
      name: "الامام",
      title: "لقطع غيار سيارات",
      text: "بتعامل معاهم فعلآ من زمان وناس عندها مصداقيه في التعامل وأهم حاجه إنك بتلاقي متابعه مستمره",
    },
    {
      id: 4,
      name: "المعتصم",
      title: "مصنع ملابس",
      text: "بنتعامل معاهم في الإعلانات ملابس جمله فعلآ ناس عندها مصداقيه في التعامل البشمهندس محمد صاحب الشركه حد شاطر اوي وزوق",
    },
    {
      id: 5,
      name: "اليسر جروب",
      title: "شركة توظيف و توريد عمالة",
      text: "شركه تسويق عندها مصداقيه فعلآ في التعامل ودي اهم حاجه ونتائج الإعلانات فعلا مختلفه تمامآ عن أي حد بيعمل اعلانات برشح فعلآ تتعاملوا معاها 👏",
    },
    {
      id: 6,
      name: "Elbaz Furniture",
      title: "",
      text: `حقيقي من أحسن شركات التسويق في مصر بالنسبالي 🌟
    والفكره إن التيم بالكامل فاهم اوي يعني اي تسويق بجد
    والأهم انهم مش بيهتموا بالرسالة
    قد مايهمهم حجم المبيعات وعملوا الويب سايت والحمد لله بقالنا أكثر من سنتين مع بعض بجد شكرآ ليكوا 👏👏`,
    },
    {
      id: 7,
      name: "الفهد",
      title: "مصنع ملابس",
      text: `بنتعامل معاهم بقالنا فتره كبيره
والحمد لله من الناس المحترمه في الإعلانات والنتائج ممتاز اللهم بارك والتيم كله متعاون`,
    },
    {
      id: 8,
      name: "الروميساء للعبايات",
      title: "",
      text: `بقالنا معاهم حوالي 5 سنين 🌟🌟
وهما حقيقي شركه ممتازة في التعامل
التيم في قمه الاحترام والاحترافيه
فاهمين تسويق صح وأهم حاجه بيتابعوا معاااك شبه يوميآ
والمبيعات بسم الله ماشاء الله كويسزه معاهم جدآ 🙏🙏
`,
    },
    {
      id: 9,
      name: "Henna's Secret",
      title: "",
      text: `تعامل دائم 3 سنين
من اول الاعلانات لحد بناء السايت و افكار تنمي البيزنس
غير الامانه و المتابعه
و استاذ محمد حقيقي محترم جدا و امين`,
    },
    {
      id: 10,
      name: "حاتم جمال أبو سليم",
      title: "",
      text: `طب يلا نودي حمله زي بتاعت الشهر الفات ولا اي
اخر حمله كانت ماشالله تبارك الرحمن فوق التوقعات
شكرا ليكم بجد ❤️❤️`,
    },
    {
      id: 11,
      name: "Abdallah Hassaan",
      title: "",
      text: "ناس محترمين وشغلكم بيتكلم عنكم ❤️🔥",
    },
    {
      id: 12,
      name: "Haytham Abdelmogheth",
      title: "",
      text: "ناس محترمة وتعامل راقي علي كل المستويات",
    },
    {
      id: 13,
      name: "جنى علي",
      title: "blogger",
      text: "مبسوطه جدًا من الشغل اللي قدمتوه. شكرا على المجهود.",
    },
    {
      id: 14,
      name: "Mohamed Abd Krim",
      title: "",
      text: "والله مصداقيه وشركه محترمه وتصميمات جميله حاجه حديثه جميله قوي يعني بصراحه والتيم اللي بتتعامل معاه تيم كويس ومعاك خطوه بخطوه ولحظه بلحظه ♥️♥️♥️🥰🥰",
    },
    {
      id: 15,
      name: "Sameh Mostafa Gaweesh",
      title: "",
      text: "من افضل الناس ال الواحد اتعامل معاهم حاجه محترمه جدا 💕💕",
    },
    {
      id: 16,
      name: "مروان شريف",
      title: "",
      text: "اتقان في الشغل واهتمام بالتفاصيل.. شيء نادر دلوقتي.",
    },
    {
      id: 17,
      name: "رنا إبراهيم",
      title: "Project Manager",
      text: "الفريق متعاون جدًا وبيشرح كل خطوة بوضوح.",
    },
    {
      id: 18,
      name: "حسن عطية",
      title: "",
      text: "تجربة ممتازة من أول مكالمة لحد استلام النتائج.",
    },
    {
      id: 19,
      name: "منى عادل",
      title: "صاحبة بيزنس صغير",
      text: "ساعدوني أبدأ من الصفر ووصلوني لأول 100 عميل.",
    },
    {
      id: 20,
      name: "كريم عبد الله",
      title: "",
      text: "مافيش لفظ يوفّق حجم الشغل اللي قدمتوه، بجد شكرًا.",
    },
  ];

  const visibleCount = 4;

  const nextTestimonial = () => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % testimonials.length;
      setStartIndex((s) => {
        // if next is beyond the current window, shift the window by one (sliding)
        if (next >= s + visibleCount) {
          // don't overflow
          return Math.min(
            s + 1,
            Math.max(0, testimonials.length - visibleCount)
          );
        }
        // if wrapped backwards to beginning, ensure window covers it
        if (next < s) return Math.max(0, next);
        return s;
      });
      return next;
    });
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + testimonials.length) % testimonials.length;
      setStartIndex((s) => {
        if (next < s) {
          return Math.max(0, s - 1);
        }
        if (next >= s + visibleCount) {
          return Math.min(
            next - visibleCount + 1,
            Math.max(0, testimonials.length - visibleCount)
          );
        }
        return s;
      });
      return next;
    });
  };

  const current = testimonials[activeIndex];

  const itemRefs = useRef([]);

  return (
    <section className="testimonials-section" dir="rtl">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>ما يقوله عملاؤنا</h2>
          <p>آراء حقيقية من عملاء استخدموا خدماتنا</p>
        </div>

        <div className="main-carousel-wrapper">
          <div className="testimonial-card-new">
            <p className="quote">"{current.text}"</p>

            <div className="author-row">
              <div>
                <h4>{current.name}</h4>
                {current.title && <p>{current.title}</p>}
              </div>
            </div>
          </div>

          <div className="testimonials-controls">
            <div className="testimonials-nav">
              <button className="nav-button" onClick={prevTestimonial}>
                ‹
              </button>
              <button className="nav-button" onClick={nextTestimonial}>
                ›
              </button>
            </div>

            <div className="testimonials-indicators">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`indicator ${i === activeIndex ? "active" : ""}`}
                  onClick={() => {
                    setActiveIndex(i);
                    // ensure the clicked index is inside the visible window
                    setStartIndex((s) => {
                      if (i < s) return i;
                      if (i >= s + visibleCount)
                        return Math.min(
                          i - visibleCount + 1,
                          Math.max(0, testimonials.length - visibleCount)
                        );
                      return s;
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="testimonials-grid">
          {testimonials
            .slice(startIndex, startIndex + visibleCount)
            .map((t, i) => (
              <div
                ref={(el) => (itemRefs.current[i] = el)}
                key={t.id}
                className={`grid-card-new ${
                  startIndex + i === activeIndex ? "active" : ""
                }`}
                onClick={() => {
                  const origIndex = startIndex + i;
                  setActiveIndex(origIndex);
                  setStartIndex((s) => {
                    if (origIndex < s) return origIndex;
                    if (origIndex >= s + visibleCount)
                      return Math.min(
                        origIndex - visibleCount + 1,
                        Math.max(0, testimonials.length - visibleCount)
                      );
                    return s;
                  });
                }}
              >
                <p>"{t.text}"</p>
                <div className="grid-author">
                  <div>
                    <h5>{t.name}</h5>
                    {t.title && <p>{t.title}</p>}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
