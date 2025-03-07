import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfMobile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Detect mobile devices
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    
    if (isMobile) {
      navigate("/mobile"); // Redirect to the download page
    }
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default RedirectIfMobile;
