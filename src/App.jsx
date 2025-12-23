import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import BlogPage from "./pages/BlogPage";
import BlogArticle from "./pages/BlogArticle";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

// Components
import AdminLogin from "./components/admin/AdminLogin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";

import Preloader from "./components/Preloader";

const App = () => {
  useEffect(() => {
    // ... existing lenis code ...
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Preloader />
      {/* Strict Overflow Wrapper to kill any horizontal scroll */}
      <div style={{ overflowX: 'hidden', width: '100%', position: 'relative' }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/mn-secure-zone-2025" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
