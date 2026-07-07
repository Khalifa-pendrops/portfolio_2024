import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TOP_OFFSET = 80;

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const scrollingUp = currentY < lastScrollY.current;
        const pastThreshold = currentY > window.innerHeight * 0.75;

        if (currentY <= TOP_OFFSET) {
          setVisible(false);
        } else if (scrollingUp && pastThreshold) {
          setVisible(true);
        } else if (!scrollingUp) {
          setVisible(false);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? "scroll-to-top--visible" : ""}`}
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <FontAwesomeIcon icon={faArrowUp} className="scroll-to-top__icon" />
    </button>
  );
};

export default ScrollToTop;