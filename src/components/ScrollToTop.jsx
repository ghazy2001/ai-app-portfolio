import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Force scroll to top immediately
    window.scrollTo(0, 0);

    // 2. Refresh ScrollTrigger to recalculate start/end positions for the new page layout
    ScrollTrigger.refresh();

    // Optional: If using Lenis, we might ideally want to tell it to scroll to top,
    // but window.scrollTo usually works if Lenis is binding to window scroll.
  }, [pathname]);

  return null;
};

export default ScrollToTop;
