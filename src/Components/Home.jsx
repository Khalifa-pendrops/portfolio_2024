import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faRocket,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import axios from "axios";
import BursBg from "./BursBg";
import MobileNav from "./MobileNav";
import ProjectCard from "./ProjectCard";
import TestimonialsSection from "./TestimonialsSection";
import { SITE, SKILLS } from "../data/site";
import {
  featuredProjects,
  projectsByCategory,
  PROJECT_CATEGORIES,
} from "../data/projects";

const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "testimonials", label: "Testimonials" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const Home = () => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiError, setAiError] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAiNotice, setShowAiNotice] = useState(false);

  const apiBase = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
  const url = `${apiBase}/api/contact`;
  const aiUrl = `${apiBase}/api/ai`;

  const formatLine = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const handleChange = (e) => {
    setIsSubmitting(false);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status >= 200 && response.status < 300) {
        setResponseMessage({
          type: "success",
          text: response.data?.message || "Message sent successfully.",
        });
      }
      setFormData({ email: "", message: "" });
    } catch {
      setResponseMessage({
        type: "error",
        text: "Something went wrong. Please try again or email me directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    setAiLoading(true);
    setAiError(null);
    setAiResponse("");

    if (!aiPrompt.trim()) {
      setAiError("Please enter a question.");
      setAiLoading(false);
      return;
    }

    try {
      const response = await axios.post(aiUrl, { prompt: aiPrompt.trim() });
      setAiResponse(response.data?.response || "No response received.");
      setAiPrompt("");
    } catch (error) {
      setAiError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          error.message ||
          "AI request failed",
      );
    } finally {
      setAiLoading(false);
    }
  };

  const closeAiModal = () => {
    setIsAiOpen(false);
    setAiPrompt("");
    setAiResponse("");
    setAiError(null);
    setAiLoading(false);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    document.body.style.overflow =
      isContactOpen || isAiOpen || isMenuOpen ? "hidden" : "";
  }, [isContactOpen, isAiOpen, isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (isAiOpen) closeAiModal();
      else if (isContactOpen) setIsContactOpen(false);
    };

    if (isContactOpen || isAiOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isContactOpen, isAiOpen]);

  useEffect(() => {
    if (!isAiOpen) return;
    setShowAiNotice(true);
    const timer = setTimeout(() => setShowAiNotice(false), 5000);
    return () => clearTimeout(timer);
  }, [isAiOpen]);

  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    const timer = setTimeout(() => scrollToSection(hash), 300);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className="portfolio-page">
      <BursBg className="home-burst-bg" />

      <header className="portfolio-nav transparent-bg">
        <nav className="portfolio-nav__inner container-xxl">
          <button
            type="button"
            className="portfolio-nav__brand"
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            {SITE.name.split(" ")[0]}
          </button>

          <div className="portfolio-nav__end">
            <ul className="portfolio-nav__links portfolio-nav__links--desktop">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="portfolio-nav__link"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  className="portfolio-nav__link"
                  href={SITE.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CV
                </a>
              </li>
            </ul>

            <MobileNav
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen((open) => !open)}
              onClose={() => setIsMenuOpen(false)}
              onNavigate={scrollToSection}
              site={SITE}
              onOpenAi={() => setIsAiOpen(true)}
            />
          </div>
        </nav>
      </header>

      <main className="portfolio-main">
        <section id="top" className="hero-section-block container-xxl">
          <p className="hero-eyebrow" data-aos="fade-down">
            {SITE.location}
          </p>
          <h1 className="hero-name" data-aos="zoom-in">
            {SITE.name}
          </h1>
          <p className="hero-role" data-aos="fade-up" data-aos-delay="100">
            {SITE.title} · {SITE.tagline}
          </p>
          <p className="hero-summary" data-aos="fade-up" data-aos-delay="200">
            {SITE.summary}
          </p>

          <div
            className="hero-actions"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <button
              type="button"
              className="btn hero-btn hero-btn--primary"
              onClick={() => scrollToSection("work")}
            >
              <FontAwesomeIcon icon={faArrowDown} />
              View Work
            </button>
            <a
              className="btn hero-btn"
              href={SITE.resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faDownload} />
              Download CV
            </a>
            <button
              type="button"
              className="btn hero-btn"
              onClick={() => setIsContactOpen(true)}
            >
              <FontAwesomeIcon icon={faRocket} />
              Hire Me
            </button>
            <button
              type="button"
              className="btn hero-btn hero-btn--ghost"
              onClick={() => setIsAiOpen(true)}
            >
              Ask AI
            </button>
            <a
              className="btn hero-btn hero-btn--icon"
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              className="btn hero-btn hero-btn--icon"
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </section>

        <section id="work" className="section-block container-xxl">
          <div className="section-heading">
            <h2>Selected Work</h2>
            <p>Production systems across mobile, web, and backend.</p>
          </div>
          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {Object.values(PROJECT_CATEGORIES).map((category) => {
            const items = projectsByCategory(category);
            if (!items.length) return null;
            return (
              <div key={category} className="project-group">
                <h3 className="project-group__title">{category}</h3>
                <div className="project-grid">
                  {items.map((project) => (
                    <ProjectCard key={project.id} project={project} compact />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        <TestimonialsSection />

        <section id="skills" className="section-block container-xxl">
          <div className="section-heading">
            <h2>Skills</h2>
            <p>Technologies I use to ship reliable products.</p>
          </div>
          <div className="skills-grid">
            {SKILLS.map((skill, index) => (
              <span
                key={skill}
                className="skill-pill secondary-bg"
                data-aos="fade-up"
                data-aos-delay={(index % 6) * 80}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="section-block container-xxl">
          <div className="section-heading">
            <h2>Contact</h2>
            <p>Open to remote full-time and contract roles. Available immediately.</p>
          </div>
          <div className="contact-panel secondary-bg">
            <div className="contact-panel__info">
              <a href={`mailto:${SITE.email}`} className="email-wider-letters">
                {SITE.email}
              </a>
              <p className="contact-panel__phone">{SITE.phone}</p>
              <div className="contact-panel__links">
                <a href={SITE.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a href={SITE.resumePath} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </div>
            </div>
            <button
              type="button"
              className="btn hero-btn hero-btn--primary"
              onClick={() => setIsContactOpen(true)}
            >
              Send a Message
            </button>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <div className="container-xxl portfolio-footer__inner">
          <p>&copy; {currentYear} {SITE.name}</p>
          <div className="portfolio-footer__links">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </footer>

      {isContactOpen && (
        <div
          className="custom-modal-backdrop"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="custom-modal modal-content custom-modal-surface"
            role="dialog"
            aria-modal="true"
            aria-label="Send a message"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header custom-modal-header flex flex-row justify-content-between align-items-center px-2">
              <h5 className="modal-title custom-modal-title">Send a Message</h5>
              <button
                type="button"
                className="btn-close custom-modal-close"
                aria-label="Close"
                onClick={() => setIsContactOpen(false)}
              />
            </div>
            <div className="pseudo-modal contact-container d-flex flex-column justify-content-center align-items-center gap-3 container-fluid my-3">
              <div className="contact_top d-flex flex-column justify-content-center align-items-start text-center">
                <p className="custom-modal-subtitle text-center align-self-center">
                  Reach me at{" "}
                  <a href={`mailto:${SITE.email}`} className="email-wider-letters">
                    {SITE.email}
                  </a>
                </p>
              </div>
              <form
                className="d-flex flex-column justify-content-center align-items-center gap-2 w-100"
                onSubmit={handleSubmit}
              >
                <div className="d-flex flex-column gap-4 email-text custom-modal-body w-100">
                  <label className="d-flex flex-column justify-content-center align-items-start gap-2">
                    Email
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control rounded border p-2 custom-modal-input"
                      required
                    />
                  </label>
                  <label className="d-flex flex-column justify-content-center align-items-start gap-2">
                    Message
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="border rounded p-2 form-control text-area-min-height custom-modal-input"
                      required
                    />
                  </label>
                </div>
                <p className="email-text text-start">
                  Include your name or organization in the message.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-btn text-white py-2 px-4 btn d-flex justify-content-center align-items-center gap-2 custom-modal-cta"
                >
                  <FontAwesomeIcon icon={faCaretRight} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
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
          </div>
        </div>
      )}

      {isAiOpen && (
        <div className="custom-modal-backdrop" onClick={closeAiModal}>
          <div
            className="custom-modal modal-content custom-modal-surface"
            role="dialog"
            aria-modal="true"
            aria-label="Ask the AI assistant"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header custom-modal-header flex flex-row justify-content-between align-items-center">
              <h5 className="modal-title custom-modal-title">
                Ask the AI Assistant
              </h5>
              <button
                type="button"
                className="btn-close custom-modal-close mx-2"
                aria-label="Close"
                onClick={closeAiModal}
              />
            </div>
            <div className="modal-body custom-modal-body">
              <p className="custom-modal-subtitle">
                Ask about my projects, stack, or experience.
              </p>
              {showAiNotice && (
                <div className="custom-modal-notice">
                  This chat clears when you close the modal.
                </div>
              )}
              <form
                className="d-flex flex-column gap-3"
                onSubmit={handleAiSubmit}
              >
                <label className="d-flex flex-column gap-2">
                  Your question
                  <textarea
                    className="border rounded p-2 form-control text-area-min-height custom-modal-input"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleAiSubmit(e);
                      }
                    }}
                    placeholder="Ask anything..."
                    rows={4}
                  />
                </label>
                <button
                  type="submit"
                  className="btn custom-btn custom-modal-cta"
                  disabled={aiLoading}
                >
                  {aiLoading ? "Thinking..." : "Ask"}
                </button>
              </form>
              {aiError && <p className="text-danger mt-3">Error: {aiError}</p>}
              {aiResponse && (
                <div className="mt-4 p-3 rounded secondary-bg border border-info border-opacity-10">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="m-0 text-info">Response</h6>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-info py-0 px-2"
                      onClick={() => {
                        navigator.clipboard.writeText(aiResponse);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <div className="custom-modal-response">
                    {aiResponse.split("\n").map((line, i) => {
                      if (line.trim().startsWith("* ")) {
                        return (
                          <li key={i} className="mb-2 ms-3">
                            {formatLine(line.trim().substring(2))}
                          </li>
                        );
                      }
                      if (/^\d+\.\s/.test(line.trim())) {
                        return (
                          <div key={i} className="mb-2 ms-3">
                            {formatLine(line.trim())}
                          </div>
                        );
                      }
                      if (!line.trim()) return <br key={i} />;
                      return (
                        <p key={i} className="mb-2">
                          {formatLine(line)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;