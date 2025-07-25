import React, { useState, useEffect } from "react";
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
import resume from "/resume2.pdf";
import axios from "axios";
import "./Home.css";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
// import Typewriter2 from "./TypeWriter2";

const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const url = "https://portfolio-2024-2cjd.onrender.com/api/contact";

  // for text animation on UI

  const texts = [
    {
      text: "CHIKEZIE",
      className: "text-danger, fw-bold, display-2",
    },
    {
      text: "ILODIGWE",
      className: "text-warning, fw-bold, display-2",
    },
  ];

  const typingSpeed = 200;
  const deletingSpeed = 200;
  const pauseAfterTyping = 2000;

  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const current = texts[loopIndex];
  const fullText = current.text;

  const handleChange = (e) => {
    setIsSubmitting(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);

    if (!formData.email || !formData.message) {
      setResponseMessage({
        type: "error",
        text: "Please fill out all fields.",
      });
      console.log("Validation error message set:", responseMessage);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response:", response);

      if (response.status === 200) {
        setResponseMessage({
          type: "success",
          text: "Form submitted successfully!",
        });

        console.log(responseMessage);
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
      }

      setFormData({ email: "", message: "" });
    } catch (error) {
      console.log("Form submission error: ", error);
      setResponseMessage({
        type: "error",
        text: "An error occurred while submitting. Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
    setFormData({ email: "", message: "" });
  };

  // handle logic to download or open pdf file authomatically on apple devices
  const handleDownload = (e) => {
    const isiOS = /ipad|iphone|ipod/.test(navigator.userAgent);

    if (isiOS) {
      e.preventDefault();
      window.open(resume, "_blank");
    } else {
      window.open(
        resume,
        "_blank",
        "location=yes,height=600,width=800,scrollbars=yes,status=yes"
      );
    }
  };

  useEffect(() => {
    let timeout;

    if (!isDeleting && charIndex <= fullText.length) {
      setDisplayText(fullText.substring(0, charIndex));
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex >= 0) {
      setDisplayText(fullText.substring(0, charIndex));
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, deletingSpeed);
    }

    if (!isDeleting && charIndex === fullText.length + 1) {
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
    <div className="container-xxl d-flex flex-column justify-content-center align-items-center gap-5 py-5" style={{paddingBottom: "5rem"}}>

      {/* UNCOMMENT WHEN A NEW PROJECT STARTS */}
      {/* <div className="container-fluid d-block typewriter-wraper">
        <p className="container-fluid typewriter-text">On-going Project: SafeWatch NG🎉
        </p>
      </div> */}

      <div className="home_heead container-xxl text-center d-flex flex-column justify-content-center align-items-center gap-3 px-4">
        <div className="typewriter2-wrapper container-fluid">
          <div className="container-fluid d-block typewriter-wrapper ">
            <span
              className={`typewriter-text2 ${current.className}`}
              data-aos="zoom-in"
              // data-aos-delay="300"
              data-aos-once="false"
              style={{ opacity: 1 }}
            >
              {displayText}
            </span>
          </div>
        </div>
        <p className=" w-100" data-aos="fade-down">
          A Software Developer and AI enthusiast with experience in researching
          and building scalable products.
        </p>
        <div className="home_buttons container-fluid d-flex d-sm-inline-flex justify-content-center align-items-center gap-2 flex-column flex-sm-row px-5">
          <div className="col-10 col-sm-auto">
            <Link className="linked-btn d-none d-sm-flex" to="/get-in-touch">
              <div className="linked-btn">
                <button
                  className="bg-none-btn btn border rounded-2 d-flex justify-content-center align-items-center flex-wrap gap-2 w-100"
                  data-aos="fade-right"
                  data-aos-delay="300"
                >
                  <FontAwesomeIcon
                    className="icon fs-5"
                    icon={faHandPointRight}
                  />
                  Get in Touch
                </button>
              </div>
            </Link>
            <button
              className="get_in_touch_1 bg-none-btn btn border rounded-2 d-sm-none d-flex justify-content-center align-items-center flex-wrap gap-2 w-100"
              data-aos="fade-right"
              data-aos-delay="300"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <FontAwesomeIcon className="icon fs-5" icon={faHandPointRight} />
              Get in Touch
            </button>
            <div
              className="modal fade py-5"
              id="exampleModal"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="pseudo-modal contact-container d-flex flex-column justify-content-center align-items-center gap-3 container-fluid my-3">
                    <div className="contact_top d-flex flex-column justify-content-center align-items-start text-center">
                      <h1 className="display-5 display-sm-6 align-self-center">
                        Send an Email
                      </h1>
                      <p className="email-text text-center align-self-center">
                        Fill out the form below or contact me with your
                        favourite email client at
                      </p>
                      <a
                        href="mailto:chikezie270@gmail.com?subject=Let's Talk About Your Services "
                        className="email-wider-letters text-danger align-self-center"
                      >
                        chikezie270@gmail.com
                      </a>
                    </div>
                    <form
                      className="d-flex flex-column justify-content-center align-items-center gap-2"
                      onSubmit={handleSubmit}
                    >
                      <div className="d-flex flex-column gap-4 email-text">
                        <label className="d-flex flex-column justify-content-center align-items-start gap-2">
                          Email
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-control rounded border p-2"
                            required
                          ></input>
                        </label>
                        <label className="d-flex flex-column justify-content-center align-items-start gap-2">
                          Message
                          <textarea
                            type="text"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="border rounded p-2 form-control text-area-min-height"
                            required
                          ></textarea>
                        </label>
                      </div>
                      <p className="email-text text-start">
                        Please include your name or/and the name of your
                        organization in the message.
                      </p>
                      <div className="d-flex justify-content-center align-items-center gap-4 w-50">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="contact-btn text-white py-1 px-2 btn d-flex justify-content-center align-items-center gap-2"
                        >
                          <FontAwesomeIcon
                            className="fs-1"
                            icon={faCaretRight}
                          />
                          {isSubmitting ? "Submitting..." : "Send Message"}
                        </button>
                      </div>
                      {responseMessage && (
                        <p
                          style={{
                            color:
                              responseMessage === "success" ? "green" : "red",
                          }}
                        >
                          {responseMessage.text}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-10 col-sm-auto">
            <a
              className="linked-btn get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center flex-wrap gap-2 w-100 position-relative z-999"
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-right"
              data-aos-delay="100"
              onClick={handleDownload}
              download={resume}
              title="curriculum vitae"
            >
              <FontAwesomeIcon className="icon fs-5" icon={faDownload} />
              CV
            </a>
          </div>

          <div className="col-10 col-sm-auto">
            <a
              className="linked-btn get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center flex-wrap gap-2 w-100"
              href="https://github.com/Khalifa-pendrops"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-left"
              data-aos-delay="100"
            >
              <FontAwesomeIcon className="icon fs-5" icon={faGithub} />
              GitHub
            </a>
          </div>

          <div className="col-10 col-sm-auto">
            <a
              href="https://www.linkedin.com/in/chikezie-ilodigwe-942262113?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-left"
              data-aos-delay="300"
              className="linked-btn get_in_touch btn border rounded-2 d-flex justify-content-center align-items-center flex-wrap gap-2 w-100"
            >
              <FontAwesomeIcon className="icon fs-5" icon={faLinkedin} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className="home_body px-4 d-flex flex-column justify-content-center align-items-center gap-2">
        <h2 className="display-5 fw-bolder">Paths</h2>
        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4 my-2 ">
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
              <h4 className="fw-bolder text-primary">Tech News & Research</h4>
              <p>
                Exploring Tech and societal intricacies: AI, public health,
                ageing, peace dynamics, power alliances, relations, sports -
                with emphasis on football.
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
                to cutting-edge frameworks and libraries in React.js, bootstrap,
                Tailwind CSS, etc.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
