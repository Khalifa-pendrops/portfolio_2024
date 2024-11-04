import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointRight,
  faDownload,
  faGraduationCap,
  faCode,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "./Home.css";
import resume from "/Resume.pdf";

const Home = () => {
  return (
    <div className="container-xxl d-flex flex-column justify-content-center gap-5 py-5">
      <div className="home_heead container-xxl text-center d-flex flex-column justify-content-center align-items-center gap-3 px-4">
        <h1 className="display-2 display-sm-5 fw-semibold" data-aos="fade-up">
          Chikezie, Ilodigwe
        </h1>
        <p className=" w-50 w-sm-100" data-aos="fade-down">
          A Software Developer and AI enthusiast with experience in researching
          and building scalable products.
        </p>
        <div className="home_buttons container-fluid d-flex d-sm-inline-flex justify-content-center align-items-center gap-2 flex-column flex-sm-row px-5">
          <div className="col-10 col-sm-auto">
            {" "}
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
            {" "}
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
            {" "}
            <a
              className="linked-btn"
              href="/https://github.com/Khalifa-pendrops"
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
            {" "}
            <a
              className="linked-btn"
              href="/https://www.linkedin.com/in/chikezie-ilodigwe-942262113?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
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
      <div className="home_body px-4 d-flex flex-column justify-content-center align-items-center gap-2">
        <h2 className="display-5">Paths</h2>
        <div className="home_body_paths d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 my-2 ">
          <Link className="links zoom-in p-4" to="/academic">
            <div
              className="d-flex flex-column gap-2 justify-content-center align-items-start"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-offset="200"
            >
              <FontAwesomeIcon
                className="icon-2 text-warning"
                icon={faGraduationCap}
              />
              <h4 className="fw-bolder text-primary">Academics & Research</h4>
              <p>
                Exploring societal intricacies: public heealth, ageing, peace
                dynamics, power alliances, relations, sports - with emphasis on
                football.
              </p>
            </div>
          </Link>

          <Link className="links zoom-out p-4" to="/tech">
            <div
              className="d-flex flex-column gap-2 justify-content-center align-items-start"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-offset="200"
            >
              <FontAwesomeIcon className="icon-2 text-warning" icon={faCode} />
              <h4 className="fw-bolder text-primary">Tech Spectrum</h4>
              <p>
                A tech odyssey: from the basic HTML through CSS and JavaScript
                to cutting-edge frameworks and libraries in React.js, bootstrap, Tailwind
                CSS, etc.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
