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
import Contact from "./Contact";
import axios from "axios";
import "./Home.css";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const url = "https://portfolio-2024-1.onrender.com/api/contact";

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
    setMessage(null);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Success block triggered");
        setMessage({
          type: "success",
          text: "Form submitted successfully!",
        });
        console.log(message);
        setFormData({ email: "", message: "" });
        console.log("Response status:", response.status);
        console.log("Response data:", response.data);
      }
    } catch (error) {
      console.log("Form submission error: ", error);
      setMessage({
        type: "error",
        text: "An error occurred while submitting. Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
    setFormData({ email: "", message: "" });
  };
  return (
    <div className="container-xxl d-flex flex-column justify-content-center align-items-center gap-5 py-5">
      <div className="home_heead container-xxl text-center d-flex flex-column justify-content-center align-items-center gap-3 px-4">
        <h1
          className="home_head_h1 display-2 display-sm-5 fw-semibold"
          data-aos="zoom-in"
        >
          Chikezie, Ilodigwe
        </h1>
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
                        href="mailto:khalifabinzayed.portfolio@gmail.com?subject=Let's Talk About Your Services "
                        className="email-wider-letters text-danger align-self-center"
                      >
                        khalifabinzayed.portfolio@gmail.com
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
                            // onChange={handleChange}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
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
                            // onChange={handleChange}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
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
                      {message && (
                        <p
                          className={
                            message.type === "success"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {message.text}
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
              >
                <FontAwesomeIcon className="icon fs-5" icon={faLinkedin} />
                LinkedIn
              </button>
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
