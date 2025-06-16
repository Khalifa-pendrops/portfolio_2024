import React, { useState, useEffect } from "react";
import "./Home.css";

const Typewriter2 = () => {
  const texts = ["Chikezie", "Ilodigwe"];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseAfterTyping = 1500;

  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[loopIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentText.length) {
      setText(currentText.substring(0, charIndex));
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      setText(currentText.substring(0, charIndex));
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    }

    if (!isDeleting && charIndex === currentText.length + 1) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLoopIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, loopIndex]);

  return (
    <div className="typewriter2-wrapper border container-fluid">
      <div className="container-fluid d-block typewriter-wrapper ">
        <span className="typewriter-text">{text}</span>
      </div>
    </div>
  );
};

export default Typewriter2;
