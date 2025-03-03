import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when pathname changes
  }, [pathname]);

  return null; // No UI element, just logic
};

export default ScrollToTop;