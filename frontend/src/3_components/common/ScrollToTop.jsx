import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window to the top on every route change — e.g. after
// placing an order, submitting a form, or any other action that
// navigates to a new page.
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;