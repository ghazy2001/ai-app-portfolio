import React from "react";
import { Navbar } from "../components";
import { Footer } from "../containers";

const Contact = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <section style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2>تواصل معنا</h2>
          <p>
            املأ النموذج أو راسلنا عبر البريد الإلكتروني وسنرد خلال 24 ساعة.
          </p>
          <form>
            <div style={{ margin: "1rem 0" }}>
              <label>الاسم</label>
              <input type="text" style={{ width: "100%" }} />
            </div>
            <div style={{ margin: "1rem 0" }}>
              <label>البريد الإلكتروني</label>
              <input type="email" style={{ width: "100%" }} />
            </div>
            <div style={{ margin: "1rem 0" }}>
              <label>رسالتك</label>
              <textarea style={{ width: "100%", minHeight: 140 }}></textarea>
            </div>
            <button type="submit">أرسل</button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
