import React, { useState, useEffect } from "react";
import EditableText from "../components/EditableText";
import { Navbar } from "../components";
import { Footer } from "../containers";
import { Link, useNavigate } from "react-router-dom";
import "./contact.css";

const Contact = () => {
  const [selectedBudget, setSelectedBudget] = useState(25000);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/auth');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="contact-page section__padding">
        
        <div className="contact-container">
            {/* Left Side: Bold Header & Info */}
            <div className="contact-info">
                <div className="contact-header-large">
                    <EditableText section="contact" contentKey="title" defaultContent="دعنا نصنع شيئاً استثنائياً معاً." type="h1" className="gradient__text" />
                </div>
                <div className="contact-subtext">
                    <EditableText 
                        section="contact" 
                        contentKey="description" 
                        defaultContent="هل لديك مشروع في ذهنك؟ نحن هنا لتحويل أفكارك إلى واقع رقمي مبهر. تواصل معنا اليوم." 
                        type="p" 
                    />
                </div>
                
                <div className="contact-methods">
                    <div className="contact-method-item">
                         <EditableText section="contact" contentKey="visitUsTitle" defaultContent="المقر الرئيسي" type="h4" />
                         <EditableText section="contact" contentKey="visitUs" defaultContent="القاهرة، مصر" type="p" />
                    </div>
                    
                    <div className="contact-method-item">
                         <EditableText section="contact" contentKey="emailTitle" defaultContent="تواصل معنا" type="h4" />
                         <EditableText section="contact" contentKey="emailText" defaultContent="hello@mn-agency.com" type="p" />
                    </div>

                    <div className="contact-method-item">
                         <EditableText section="contact" contentKey="phoneTitle" defaultContent="اتصل بنا" type="h4" />
                         <EditableText section="contact" contentKey="phoneText" defaultContent="+20 123 456 789" type="p" />
                    </div>
                </div>
            </div>

            {/* Right Side: Minimal Form */}
            <div className="contact-form-container">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <label>ما اسمك؟</label>
                        <input type="text" placeholder="الاسم الكامل" />
                    </div>
                    <div className="form-group">
                        <label>بريدك الإلكتروني؟</label>
                        <input type="email" placeholder="email@address.com" />
                    </div>
                    
                    <div className="form-group">
                        <label>بماذا أنت مهتم؟</label>
                        <div className="form-options-grid">
                            {["Brand Strategy & Design", "Content Strategy", "Web UX & UI Design", "eCommerce Design", "Web Development", "App Design & Development", "Performance Marketing", "Venture Design"].map(opt => (
                                <div key={opt} className="option-pill" onClick={(e) => {
                                    e.target.classList.toggle('active');
                                }}>{opt}</div>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>تقدير الميزانية</label>
                        <div className="budget-slider-container">
                             <div className="budget-value-display">
                                ${selectedBudget ? Number(selectedBudget).toLocaleString() : '25,000'}
                             </div>
                             
                             <div className="range-wrapper">
                                 <input 
                                    type="range" 
                                    min="25000" 
                                    max="500000" 
                                    step="5000" 
                                    value={selectedBudget || 25000}
                                    className="budget-range"
                                    onChange={(e) => setSelectedBudget(e.target.value)}
                                    style={{
                                        backgroundSize: `${((selectedBudget - 25000) * 100) / (500000 - 25000)}% 100%`
                                    }}
                                 />
                             </div>

                             <div className="budget-labels">
                                 <span>$25,000</span>
                                 <span>$500,000+</span>
                             </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>أهداف شراكتك</label>
                        <textarea rows="2" placeholder="أدخل النص..."></textarea>
                    </div>

                    <div className="form-group">
                        <label>مصدر الإحالة (اختياري)</label>
                        <select defaultValue="">
                            <option value="" disabled>اختر خياراً</option>
                            <option value="google">بحث جوجل</option>
                            <option value="social">وسائل التواصل الاجتماعي</option>
                            <option value="referral">توصية من صديق</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">إرسال الطلب</button>
                </form>
            </div>
        </div>

        {/* FAQ Section Minimal */}
        <div className="faq-section">
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
                 <EditableText section="contact" contentKey="faqTitle" defaultContent="أسئلة و أجوبة" type="h2" className="gradient__text" style={{fontSize: '36px'}} />
            </div>
            
            <div style={{maxWidth: '800px', margin: '0 auto'}}>
                <div className="faq-item">
                    <EditableText section="contact" contentKey="faq1Q" defaultContent="ما هي الخدمات التي تقدمونها؟" type="h4" style={{marginBottom: '0.5rem', color:'#fff', fontSize: '20px'}} />
                    <EditableText section="contact" contentKey="faq1A" defaultContent="نقدم خدمات تسويق رقمي شاملة تشمل إدارة وسائل التواصل، تحسين محركات البحث، وتصميم الهوية البصرية." type="p" style={{color: '#9f9f9f'}} />
                </div>
                <div className="faq-item">
                     <EditableText section="contact" contentKey="faq2Q" defaultContent="كم تكلفة المشاريع عادة؟" type="h4" style={{marginBottom: '0.5rem', color:'#fff', fontSize: '20px'}} />
                    <EditableText section="contact" contentKey="faq2A" defaultContent="تختلف التكلفة بناءً على نطاق العمل، لكننا نقدم باقات مرنة تناسب الشركات الناشئة والمؤسسات الكبيرة." type="p" style={{color: '#9f9f9f'}} />
                </div>
                <div className="faq-item">
                     <EditableText section="contact" contentKey="faq3Q" defaultContent="كم يستغرق تنفيذ المشروع؟" type="h4" style={{marginBottom: '0.5rem', color:'#fff', fontSize: '20px'}} />
                    <EditableText section="contact" contentKey="faq3A" defaultContent="نحن نلتزم بالجداول الزمنية بصرامة. المشاريع الصغيرة قد تستغرق أسبوعين، بينما المشاريع الكبيرة قد تمتد لشهر أو أكثر." type="p" style={{color: '#9f9f9f'}} />
                </div>
            </div>
        </div>

      </main>
      <Footer />
    </>
  );
};

export default Contact;
