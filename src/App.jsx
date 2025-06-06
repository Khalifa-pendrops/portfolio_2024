import React, { useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Contact from "./Components/Contact";
import Academic from "./Components/Academic";
import Tech from "./Components/Tech";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 1500,
      easing: "ease-in-out",
      delay: 100,
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-in-touch" element={<Contact />} />
        <Route path="/academic" element={<Academic />} />
        <Route path="/tech" element={<Tech />} />
      </Routes>
      <a
        className="whatsapp-a d-none d-sm-flex"
        href="https://wa.me/2348156416326"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="whatsapp-btn ">
          Whatsapp
        </button>
      </a>
    </>
  );
};

export default App;
