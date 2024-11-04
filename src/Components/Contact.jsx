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
  // REMEMBER TO ADD ACTUAL API HERE FOR FORM SUBMISSION AND DB STORAGE
  const url = "http://localhost/waiting";

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
    try {
      const response = await axios.post(url, { formData });
      if (response.status === 200) {
        setMessage({
          type: "success",
          text: "Form submitted successfully!",
        });
        setFormData({ email: "", message: "" });
      }
    } catch (error) {
      console.log(error);
      setMessage({
        type: "error",
        text: "An error occurred while submitting. Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container d-flex flex-column justify-content-center align-items-center gap-3 container-fluid mt-5">
      <div className="contact_top d-flex flex-column justify-content-center align-items-start text-center">
        <h1 className="display-5 display-sm-6 align-self-center">
          Send an Email
        </h1>
        <p className="email-text text-center align-self-center">
          Fill out the form below or contact me with your favourite email client
          at
        </p>
        <a
          href="mailto:dikee5200@gmail.com?subject=Let's Talk About Your Services "
          className="email-wider-letters text-danger align-self-center"
        >
          dikee5200@gmail.com
        </a>
      </div>
      <form
        className="d-flex flex-column justify-content-center align-items-center gap-2"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-column gap-4 email-text">
          <label className="d-flex flex-column justify-content-center gap-2">
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
          <label className="d-flex flex-column gap-2">
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
          Please include your name or / and the name of your organization in the
          message.
        </p>
        <div className="d-flex justify-content-center align-items-center gap-4 w-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="contact-btn bg-danger text-white py-1 px-4 btn d-flex justify-content-center align-items-center gap-2"
          >
            <FontAwesomeIcon className="fs-1" icon={faCaretRight} />
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
          <Link className="linked-btn" to="/">
            <button className="bg-none-btn btn border rounded-2 text-black">
              Back To Home Page
            </button>
          </Link>
        </div>
        {message && (
          <p
            className={
              message.type === "success" ? "text-primary" : "text-danger"
            }
          >
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

export default Contact;
