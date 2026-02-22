import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = lazy(() => import("./Components/Home"));
const Contact = lazy(() => import("./Components/Contact"));
const Academic = lazy(() => import("./Components/Academic"));
const Tech = lazy(() => import("./Components/Tech"));

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
      <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-in-touch" element={<Contact />} />
          <Route path="/academic" element={<Academic />} />
          <Route path="/tech" element={<Tech />} />
        </Routes>
      </Suspense>
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
