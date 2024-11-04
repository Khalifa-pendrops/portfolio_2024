import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import resume from "/Resume.pdf";
import "./Home.css";

function Tech() {
  const [activeSession, setActiveSession] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSession(entry.target.id);
        }
      });
    }, observerOptions);
    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="d-flex flex-column gap-4">
      <section id="home" className=" d-flex flex-column gap-4  my-5">
        <nav className="container-fluid transparent-bg position-fixed top-0 left-0 w-100 z-3">
          <ul className="d-flex justify-content-around align-items-center gap-4 py-4 flex-wrap gap-2">
            <li
              className="muted-bg px-5"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <Link className="bact-to-home" to="/">
                Back To Home Page
              </Link>
            </li>

            <li className="muted-bg px-5">
              <a href="#home">Home</a>
            </li>
            <li className="muted-bg px-5">
              <a href="#project">Projects</a>
            </li>
            <li className="muted-bg px-5">
              <a href="#skills">Skills</a>
            </li>
          </ul>
        </nav>
        <div className="d-flex flex-column justify-content-center align-items-center gap-5 hero-section">
          <h1 className="text-center">
            Navigate my Tech Spectrum: From the very Basics to Intermediate
            Frontiers (for now 🤗)
          </h1>
          <p className="text-center">
            Welcome to my digital workshop, a chronicle of my voyage through the
            pulsating heart of tech innovation. Here, you will discover a
            vibrant portfolio of web creations, each a testament of
            possibilities enabled by contemporary technologies like HTML, CSS,
            JavaScript, React.JS and a touch of Express.JS. As the future
            unfolds, I hope to delve into DevOps, UI/UX, Designs, Python, and
            Artificial Intelligence. Together, let's unmask the labyrinth of
            these technologies, confront their challenges, and unlock and
            appreciate the magic they present.
          </p>
          <div className="home_buttons container-fluid d-flex d-sm-inline-flex justify-content-center align-items-center gap-2 flex-column flex-sm-row px-5">
            <div className="col-10 col-sm-auto">
              <Link className="linked-btn" to="/get-in-touch">
                <button
                  className="get_in_touch_1 bg-none-btn btn border rounded-2 d-flex justify-content-center align-items-center gap-2 w-100"
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
                  className="get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center gap-2 w-100"
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
                  className="get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center gap-2 w-100"
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
                  className="get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center gap-2 w-100"
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
        className="container-xxl d-flex justify-content-center align-items-center gap-4 my-5"
      >
        <div className=" row w-100">
          <div className="col-12 col-md-6 col-lg-3">
            {/* REMEMBER TO ADD EASY DESIGN LIVE LINK HERE AFTER COMPLETION */}
            <a
              href="https://whisper-app-three.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 border p-3"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <h4>Whisper App</h4>
                <p>
                  Whisper App is a community where you practically whisper -
                  anonymously. So no one knows who's behind whatever texts sent
                  across the platform and yes, it was a cool project by a group
                  of us. I contributed to the Frontend, and I'm glad to have
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
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <a
              href="https://whisper-app-three.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 border p-3"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <h4>Whisper App</h4>
                <p>
                  Whisper App is a community where you practically whisper -
                  anonymously. So no one knows who's behind whatever texts sent
                  across the platform and yes, it was a cool project by a group
                  of us. I contributed to the Frontend, and I'm glad to have
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
            </a>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <a
              href="https://movie-search-app-by-khalifa.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 border p-3"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <h4>Movie Search App</h4>
                <p>
                  A movie search web application, built with React.js and CSS.
                  It basically fetches movies via an API (TMDB). There is no
                  in-built video player. Searches are directed to YouTube for
                  streaming. I built this from scratch to finish.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">React.js</p>
                  <p className="bg-secondary px-2 rounded">CSS</p>
                </div>
              </div>
            </a>
          </div>

          <div className="col-12 col-md-6 col-lg-3">
            <a
              href="https://whisper-app-three.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="d-flex flex-column justify-content-center align-items-start gap-2 border p-3"
                data-aos="zoom-in"
                data-aos-delay="700"
              >
                <h4>Weather App</h4>
                <p>
                  This is a Weather App. It was a cool project by a small group
                  of us. My major contribution was in the UI/UX. The App uses
                  static methods to display weather conditions of some selected
                  cities. No APIs was used!
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <p className="bg-secondary px-2 rounded">HTML</p>
                  <p className="bg-secondary px-2 rounded">CSS</p>
                  <p className="bg-secondary px-2 rounded">JavaScript</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="container-fluid my-5">
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
            Javascript
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
      <footer className=" py-4 container-fluid d-flex justify-content-center align-items-center text-center">
        <p>
          &copy; <span className="text-primary">Chikezie Ilodigwe.</span> All
          Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default Tech;
