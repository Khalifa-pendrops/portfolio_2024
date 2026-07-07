import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
    const timer = setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(timer);
  }, [navigate]);

  return null;
}

export default Contact;