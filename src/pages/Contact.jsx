import React, { useState, useEffect } from "react";
import EditableText from "../components/EditableText";
import { Navbar } from "../components";
import { Footer } from "../containers";
import { Link, useNavigate } from "react-router-dom";
import "./contact.css";
import API_URL from "../apiConfig";

const Contact = () => {
  const [selectedBudget, setSelectedBudget] = useState(25000);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    referral: "",
    interests: []
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
        // Allow public access to contact page or redirect? 
        // Typically Contact is public, but user context implies auth might be needed for other reasons
        // Keeping redirect for now based on previous code, but Contact usually should be public
        navigate('/auth');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInterestClick = (interest) => {
    setFormData((prev) => {
        const interests = prev.interests.includes(interest)
            ? prev.interests.filter(i => i !== interest)
            : [...prev.interests, interest];
        return { ...prev, interests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
        const res = await fetch(`${API_URL}/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...formData,
                budget: `$${selectedBudget}`
            })
        });

        if (res.ok) {
            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                message: "",
                referral: "",
                interests: []
            });
            setSelectedBudget(25000);
        } else {
            const data = await res.json();
            setError(data.message || "Something went wrong");
        }
    } catch (err) {
        setError("Failed to send message");
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  // Budget slider background calculation
  const getBackgroundSize = () => {
    return {
        backgroundSize: `${((selectedBudget - 25000) * 100) / (500000 - 25000)}% 100%`
    };
  };

  return (
    <>
      <Navbar />
      <main className="contact-page section__padding" dir="rtl">
        
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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>ما اسمك؟</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="الاسم الكامل" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>بريدك الإلكتروني؟</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email@address.com" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>بماذا أنت مهتم؟</label>
                        <div className="form-options-grid">
                            {["Brand Strategy & Design", "Content Strategy", "Web UX & UI Design", "eCommerce Design", "Web Development", "App Design & Development", "Performance Marketing", "Venture Design"].map(opt => (
                                <div 
                                    key={opt} 
                                    className={`option-pill ${formData.interests.includes(opt) ? 'active' : ''}`} 
                                    onClick={() => handleInterestClick(opt)}
                                >
                                    {opt}
                                </div>
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
                                    value={selectedBudget}
                                    className="budget-range"
                                    onChange={(e) => setSelectedBudget(e.target.value)}
                                    style={getBackgroundSize()}
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
                        <textarea 
                            name="message"
                            rows="2" 
                            placeholder="أدخل النص..."
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>مصدر الإحالة (اختياري)</label>
                        <select 
                            name="referral"
                            value={formData.referral}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>اختر خياراً</option>
                            <option value="google">بحث جوجل</option>
                            <option value="social">وسائل التواصل الاجتماعي</option>
                            <option value="referral">توصية من صديق</option>
                            <option value="other">أخرى</option>
                        </select>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "جاري الإرسال..." : "إرسال الطلب"}
                    </button>
                    {success && <p style={{color: '#4caf50', marginTop: '1rem', textAlign: 'center'}}>تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.</p>}
                    {error && <p style={{color: '#f44336', marginTop: '1rem', textAlign: 'center'}}>{error}</p>}
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
