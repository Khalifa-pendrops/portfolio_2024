import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

function Contact() {
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
    <>
      <div className="contact-container d-flex flex-column justify-content-center align-items-center gap-3 container-fluid my-3 pt-5">
        <div className="contact_top d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-5 display-sm-6 align-self-center">
            Send an Email
          </h1>
          <p className="email-text text-center align-self-center">
            Fill out the form below or contact me with your favourite email
            client at
          </p>
          <a
            href="mailto:dikee5200@gmail.com"
            className="email-wider-letters text-danger align-self-center"
          >
            dikee5200@gmail.com
          </a>
        </div>
        <form
          className="d-flex flex-column justify-content-center align-items-center gap-2 "
          onSubmit={handleSubmit}
        >
          <div className="d-flex flex-column justify-content-center align-items-start gap-4 email-text">
            <label className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                // onChange={handleChange}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="form-control rounded border p-2"
                required
              ></input>
            </label>
            <label className="d-flex flex-column justify-content-center align-items-start gap-2 w-100">
              Message
              <textarea
                type="text"
                name="message"
                value={formData.message}
                // onChange={handleChange}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="border rounded p-2 form-control text-area-min-height"
                required
              ></textarea>
            </label>
          </div>
          <p className="email-text text-start ">
            Please include your name or/and the name of your organization in the
            message.
          </p>
          <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-btn-lg bg-white btn d-flex justify-content-center align-items-center gap-2 flex-wrap"
            >
              <FontAwesomeIcon className="icon-right" icon={faCaretRight} />
              {isSubmitting ? "Submitting..." : "Send Message"}
            </button>
            <Link className="" to="/">
              <button className="contact-btn-lg button-text btn border rounded-2  bg-white">
                Back To Home Page
              </button>
            </Link>
          </div>
          {message && (
            <p
              className={
                message.type === "success" ? "text-success" : "text-danger"
              }
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default Contact;
