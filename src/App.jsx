import { useEffect, useState, lazy, Suspense } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./app.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Preloader from "./components/Preloader";
import ScrollToTop from "./components/ScrollToTop";
import Cursor from "./components/Cursor";
import FloatingSocials from "./components/FloatingSocials";
import API_URL from "./apiConfig";

// Lazy Load Pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));

// Lazy Load Admin Components
const AdminLogin = lazy(() => import("./components/admin/AdminLogin"));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute"));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const VisitorNameModal = lazy(() => import("./components/VisitorNameModal"));

// Loading Fallback Component
const PageLoader = () => (
  <div
    style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
      color: "#D4AF37",
    }}
  >
    Loading...
  </div>
);

// Analytics Tracker Component (inside Router context)
const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const storedName = localStorage.getItem("visitorName");

        await fetch(`${API_URL}/api/analytics/track`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            page: location.pathname,
            visitorName: storedName || "",
          }),
        });
      } catch (error) {
        console.error("Analytics Error", error);
      }
    };

    trackVisit();
  }, [location]);

  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect if device is mobile (tablet or smaller)
    const isMobile = window.innerWidth <= 850;

    // Only enable Lenis smooth scroll on desktop
    if (!isMobile) {
      const lenis = new Lenis({
        duration: 2.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false, // Disable touch sync to avoid conflicts on mobile
        touchMultiplier: 1.5,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove((time) => lenis.raf(time * 1000));
        lenis.destroy();
      };
    }
  }, []);

  // Get admin path from env, or default (fallback)
  const adminPath = import.meta.env.VITE_ADMIN_PATH || "/mn-secure-zone-2025";

  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <VisitorNameModal />
      <ScrollToTop />
      <Preloader setLoading={setLoading} />
      <Cursor />
      <FloatingSocials />
      <div style={{ overflowX: "hidden", width: "100%", position: "relative" }}>
        <div className="App">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home loading={loading} />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogArticle />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path={adminPath}
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
