import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import MovingTexts from "./MovingTexts";

function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const url = "https://portfolio-2024-new.onrender.com/submissions";
  // const url = "http://localhost:3001/submissions";

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

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setResponseMessage({
          type: "success",
          text: "Form submitted successfully!",
        });
        setFormData({ email: "", message: "" });
      }
    } catch (error) {
      console.error("Form submission error:", error.response || error.message);
      setResponseMessage({
        type: "error",
        text: "An error occurred while submitting. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MovingTexts />
      <div className="contact-container d-flex flex-column justify-content-center align-items-center gap-3 container-fluid my-3 pt-5">
        <div className="contact_top d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-5 display-sm-6 align-self-center">
            Send an Email
          </h1>
          <p className="email-text text-center align-self-center">
            Fill out the form below or contact me with your favorite email
            client at
          </p>
          <a
            href="mailto:khalifabinzayed.portfolio@gmail.com?subject=Let's Talk About Your Services"
            className="email-wider-letters text-danger align-self-center"
          >
            khalifabinzayed.portfolio@gmail.com
          </a>
        </div>
        <form
          className="d-flex flex-column justify-content-center align-items-center gap-2"
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column justify-content-center align-items-start gap-4 email-text">
            <label className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control rounded border p-2"
                required
              />
            </label>
            <label className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
              Message
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border rounded p-2 form-control text-area-min-height"
                required
              ></textarea>
            </label>
          </div>
          <p className="email-text text-start">
            Please include your name or/and the name of your organization in the
            message.
          </p>
          <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
            <button
              type="submit"
              disabled={isSubmitting}
              onSubmit={handleSubmit}
              className="contact-btn-lg bg-white btn d-flex justify-content-center align-items-center gap-2 flex-wrap"
            >
              <FontAwesomeIcon className="icon-right" icon={faCaretRight} />
              {isSubmitting ? "Submitting..." : "Send Message"}
            </button>
            <Link to="/">
              <button className="contact-btn-lg button-text btn border rounded-2 bg-white">
                Back To Home Page
              </button>
            </Link>
          </div>
          {responseMessage && (
            <p
              className={
                responseMessage.type === "success"
                  ? "text-success"
                  : "text-danger"
              }
            >
              {responseMessage.text}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default Contact;
