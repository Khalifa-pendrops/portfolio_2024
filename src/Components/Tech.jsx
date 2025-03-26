import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import resume from "/Resume.pdf";
import movie from "../assets/movie-app.png";
import weather from "../assets/weather-app.png";
import whisper from "../assets/whisper-app.png";
import easydesign from "../assets/easy-design.png";
import api1 from "../assets/testAPI.jpg";
import api2 from "../assets/testAPI2.jpg";
import "./Home.css";

function Tech() {
  const [activeSession, setActiveSession] = useState("");

  const getYear = () => {
    return new Date().getFullYear();
  };
  //if you want to have a link opened on same browser tab
  // const handleEasy = () => {
  //   window.location.href = "https://easydesignuk.co.uk/index";
  //   return;
  // };

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log(entry.target.id, entry.isIntersecting);
        if (entry.isIntersecting) {
          setActiveSession(entry.target.id);
        }
      });
    }, observerOptions);
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [activeSession]);

  return (
    <div className="w-100">
      <section
        id="home"
        className="container-sm d-flex flex-column justify-content-center align-items-center gap-4 my-5"
      >
        <nav className="container-fluid transparent-bg d-flex justify-content-center align-items-center position-fixed top-0 left-0 w-100 z-3">
          <ul className="d-flex justify-content-around align-items-center py-4 flex-wrap gap-2">
            <li
              className="muted-bg px-5"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <Link className="bact-to-home" to="/">
                Back To Home Page
              </Link>
            </li>

            <li
              className={`muted-bg px-5 ${
                activeSession === "home" ? "active" : " "
              }`}
            >
              <a href="#home">Home</a>
            </li>
            <li
              className={`muted-bg px-5 ${
                activeSession === "project" ? "active" : " "
              }`}
            >
              <a href="#project">Projects</a>
            </li>
            <li
              className={`muted-bg px-5 ${
                activeSession === "skills" ? "active" : " "
              }`}
            >
              <a href="#skills">Skills</a>
            </li>
          </ul>
        </nav>
        <div className="container-sm d-flex flex-column justify-content-center align-items-center gap-5 hero-section">
          <h1 className="display-4 text-center container-sm">
            Navigate my Tech Spectrum: From the very Basics to Intermediate
            Frontiers.
          </h1>
          <p className="text-center container-sm">
            Welcome to my digital workshop, a chronicle of my voyage through the
            pulsating heart of tech innovation. Here, you will discover a
            vibrant portfolio of web creations, each a testament of
            possibilities enabled by contemporary technologies like HTML, CSS,
            JavaScript, React.JS, Bootstrap, Tailwind and a touch of Express.JS.
            As the future unfolds, I hope to delve into DevOps, UI/UX, Designs,
            Python, and Artificial Intelligence. Together, let's unmask the
            labyrinth of these technologies, confront their challenges, and
            unlock and appreciate the magic they present.
          </p>
          <div className="home_buttons container-fluid d-flex d-sm-inline-flex justify-content-center align-items-center gap-2 flex-column flex-sm-row px-5">
            <div className="col-10 col-sm-auto">
              <Link className="linked-btn" to="/get-in-touch">
                <button
                  className="get_in_touch_1 bg-none-btn btn border rounded-2 d-flex justify-content-center align-items-center gap-2 flex-wrap w-100"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  <FontAwesomeIcon
                    className="icon fs-5"
                    icon={faHandPointRight}
                  />
                  Get in Touch
                </button>
              </Link>
            </div>

            <div className="col-10 col-sm-auto">
              <a
                className="linked-btn"
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  data-aos="fade-right"
                  data-aos-delay="100"
                  className="get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center flex-wrap gap-2 w-100"
                  title="curriculum vitae"
                >
                  <FontAwesomeIcon className="icon fs-5" icon={faDownload} />
                  CV
                </button>
              </a>
            </div>

            <div className="col-10 col-sm-auto">
              <a
                className="linked-btn"
                href="https://github.com/Khalifa-pendrops"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  data-aos="fade-left"
                  data-aos-delay="100"
                  className="get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center flex-wrap gap-2 w-100"
                  title="GitHub Connect"
                >
                  <FontAwesomeIcon className="icon fs-5" icon={faGithub} />
                  GitHub
                </button>
              </a>
            </div>

            <div className="col-10 col-sm-auto">
              <a
                className="linked-btn"
                href="https://www.linkedin.com/in/chikezie-ilodigwe-942262113?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  data-aos="fade-left"
                  data-aos-delay="300"
                  className="get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center flex-wrap gap-2 w-100"
                  title="LinkedIn Connect"
                >
                  <FontAwesomeIcon className="icon fs-5" icon={faLinkedin} />
                  LinkedIn
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="project"
        className="container-sm d-flex justify-content-center align-items-center gap-4"
      >
        <div className=" row w-100 ">
          <div className="col-12 mb-4">
            <a
              className="anchor-hover d-flex justify-content-center align-items-stretch rounded"
              href="https://authentication-m8g6.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 p-3"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                <h4 className="fw-bolder text-primary">
                  Note Taking API with Auth
                </h4>
                <p>
                  This is a simple Note-Taking API built with Node.js,
                  Express.js, TypeScript, and MongoDB Atlas. This API allows you
                  perform CRUD operations such as create, read, update, and
                  delete notes. Users can register, log in, create, read,
                  update, and delete notes. Notes are directly associated with
                  specific users and categories.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">NodeJS</p>
                  <p className="bg-secondary px-2 rounded">ExpressJS</p>
                  <p className="bg-secondary px-2 rounded">TypeScript</p>
                  <p className="bg-secondary px-2 rounded">MongoDB</p>
                </div>
              </div>
              <img
                className="d-none d-xl-block img-fluid h-100 border rounded"
                data-aos="zoom-out"
                data-aos-delay="700"
                src={api1}
                alt="API thumb-nail image"
                width="434px"
              />
            </a>
          </div>

          <div className="col-12 mb-4">
            <a
              className="anchor-hover d-flex justify-content-center align-items-stretch rounded"
              href="https://github.com/Khalifa-pendrops/validate-credit-card-number"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 p-3"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                <h4 className="fw-bolder text-primary">
                  Credit Card Number Validator
                </h4>
                <p>
                  This program validates credit card numbers for various types
                  of credit cards. It is implemented on the command line (CL),
                  where users are prompted to enter a credit card number or
                  press "0" to exit the program. The program first checks
                  whether the entered number matches the criteria for the
                  supported card types (Verve, Visa, and Mastercard – additional
                  card types can be implemented). This is done by verifying the
                  number of digits, as well as the first, first two, or first
                  four digits, as applicable. If this initial check is
                  successful, the program proceeds to validate the number using
                  the Luhn algorithm.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">NodeJS</p>
                  <p className="bg-secondary px-2 rounded">ExpressJS</p>
                  <p className="bg-secondary px-2 rounded">JavaScript</p>
                </div>
              </div>
              <img
                className="d-none d-xl-block img-fluid h-100 border rounded"
                data-aos="zoom-out"
                data-aos-delay="700"
                src={api2}
                alt="API thumb-nail image"
                width="434px"
              />
            </a>
          </div>

          <div className="col-12 mb-4">
            <a
              className="anchor-hover d-flex flex-column flex-lg-row justify-content-center align-items-stretch rounded cursor-pointer cursor"
              // onClick={handleEasy}
              href="https://easydesignuk.co.uk/index"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 p-3"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h4 className="fw-bolder text-primary">Easy Design UK</h4>
                <p>
                  Easy Design UK is a platform that offers innovative web
                  development and digital solutions. This was built with
                  React.JS, Bootstrap, Axios, AOS, CSS, React Router and
                  Express.JS. I built the Frontend of this simple web
                  application from scratch.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">React</p>
                  <p className="bg-secondary px-2 rounded">CSS</p>
                  <p className="bg-secondary px-2 rounded">Bootstrap</p>
                  <p className="bg-secondary px-2 rounded">Express.js</p>
                </div>
              </div>
              <img
                className="d-none d-xl-block img-fluid h-100 border rounded"
                data-aos="zoom-out"
                data-aos-delay="100"
                src={easydesign}
                alt="whisper thumb-nail image"
                width="434px"
              />
            </a>
          </div>

          <div className=" col-12 mb-4">
            <a
              className="anchor-hover d-flex justify-content-center align-items-stretch rounded"
              href="https://whisper-app-three.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 p-3"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <h4 className="fw-bolder text-primary">Whisper</h4>
                <p>
                  Whisper App is a community where you practically whisper -
                  anonymously. So no one knows who is behind whatever texts sent
                  across the platform and yes, it was a cool project by a group
                  of us. I contributed to the Frontend, and I am glad to have
                  been part of this.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">HTML</p>
                  <p className="bg-secondary px-2 rounded">CSS</p>
                  <p className="bg-secondary px-2 rounded">JavaScript</p>
                  <p className="bg-secondary px-2 rounded">Node.js</p>
                  <p className="bg-secondary px-2 rounded">Express.js</p>
                  <p className="bg-secondary px-2 rounded">MongoDB</p>
                </div>
              </div>
              <img
                className="d-none d-xl-block img-fluid h-100 border rounded"
                data-aos="zoom-out"
                data-aos-delay="300"
                src={whisper}
                alt="whisper thumb-nail image"
                width="434px"
              />
            </a>
          </div>

          <div className=" col-12 mb-4">
            <a
              className="anchor-hover d-flex justify-content-center align-items-stretch rounded"
              href="https://movie-search-app-by-khalifa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 p-3"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <h4 className="fw-bolder text-primary">Movie Search App</h4>
                <p>
                  A movie search web application, built with React.js and CSS.
                  It basically fetches movies via an API (TMDB). There is no
                  in-built video player. Searches are directed to YouTube for
                  streaming. I built this from scratch to finish.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">React.js</p>
                  <p className="bg-secondary px-2 rounded">CSS</p>
                  <p className="bg-secondary px-2 rounded">API</p>
                </div>
              </div>
              <img
                className="d-none d-xl-block img-fluid h-100 border rounded"
                data-aos="zoom-out"
                data-aos-delay="500"
                src={movie}
                alt="whisper thumb-nail image"
                width="434px"
              />
            </a>
          </div>

          <div className="col-12 mb-4">
            <a
              className="anchor-hover d-flex justify-content-center align-items-stretch rounded"
              href="https://simple-weather-app-psi-one.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 p-3"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                <h4 className="fw-bolder text-primary">Weather App</h4>
                <p>
                  This is a Weather App. It was a cool project by a small group
                  of us. My major contribution was in the Frontend. The App uses
                  weather API to fetch and display weather conditions.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">HTML</p>
                  <p className="bg-secondary px-2 rounded">CSS</p>
                  <p className="bg-secondary px-2 rounded">Tailwind</p>
                  <p className="bg-secondary px-2 rounded">JavaScript</p>
                </div>
              </div>
              <img
                className="d-none d-xl-block img-fluid h-100 border rounded"
                data-aos="zoom-out"
                data-aos-delay="700"
                src={weather}
                alt="weather thumb-nail image"
                width="434px"
              />
            </a>
          </div>
        </div>
      </section>

      <section
        id="skills"
        className="container-sm d-flex justify-content-center align-items-center my-5"
      >
        <div className="d-flex justify-content-center align-items-center flex-wrap gap-4">
          {/* ADD MORE AS SKILLS IMPROVE */}
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            HMTL
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            CSS
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Bootstrap
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="900"
          >
            Tailwind
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="1200"
          >
            JavaScript
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="1800"
          >
            TypeScript
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="1500"
          >
            React.js
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="1800"
          >
            Node.js
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="1800"
          >
            Express.js
          </p>
          <p
            className="border px-5 py-2 secondary-bg"
            data-aos="fade-up"
            data-aos-delay="2100"
          >
            Git
          </p>
        </div>
      </section>
      <footer className=" py-4 container-sm d-flex justify-content-center align-items-center text-center">
        <p>
          &copy; {getYear()}
          <span className="text-primary "> Chikezie, Ilodigwe.</span> All Rights
          Reserved
        </p>
      </footer>
    </div>
  );
}

export default Tech;
