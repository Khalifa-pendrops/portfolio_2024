import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Tech() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
    const timer = setTimeout(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(timer);
  }, [navigate]);

  return null;
}

export default Tech;