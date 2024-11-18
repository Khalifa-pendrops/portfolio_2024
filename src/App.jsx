import React, { useEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
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
        href="https://wa.me/2348156416326"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "80vw",
          zIndex: 1000,
        }}
      >
        <button className="whatsapp-btn d-flex justify-content-center align-items-center flex-wrap gap-2 w-100">
          Chat on Whatsapp
        </button>
      </a>
    </>
  );
};

export default App;
