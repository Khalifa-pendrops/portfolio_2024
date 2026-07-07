import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const MOBILE_LINKS = [
  { id: "work", label: "Work", type: "section" },
  { id: "testimonials", label: "Testimonials", type: "section" },
  { id: "skills", label: "Skills", type: "section" },
  { id: "contact", label: "Contact", type: "section" },
  { id: "cv", label: "Download CV", type: "external", hrefKey: "resumePath" },
];

const MobileNav = ({
  isOpen,
  onToggle,
  onClose,
  onNavigate,
  site,
  onOpenAi,
}) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleSectionClick = (id) => {
    onNavigate(id);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className={`hamburger ${isOpen ? "hamburger--active" : ""}`}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        onClick={onToggle}
      >
        <span className="hamburger__line" />
        <span className="hamburger__line" />
        <span className="hamburger__line" />
      </button>

      <div
        className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="mobile-menu__backdrop" onClick={onClose} />
        <nav
          id="mobile-menu-panel"
          className="mobile-menu__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <p className="mobile-menu__eyebrow">Navigate</p>
          <ul className="mobile-menu__list">
            {MOBILE_LINKS.map((item, index) => (
              <li
                key={item.id}
                className="mobile-menu__item"
                style={{ "--item-index": index }}
              >
                {item.type === "section" ? (
                  <button
                    type="button"
                    className="mobile-menu__link"
                    onClick={() => handleSectionClick(item.id)}
                  >
                    <span className="mobile-menu__link-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </button>
                ) : (
                  <a
                    className="mobile-menu__link"
                    href={site[item.hrefKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                  >
                    <span className="mobile-menu__link-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                )}
              </li>
            ))}
            <li
              className="mobile-menu__item mobile-menu__item--accent"
              style={{ "--item-index": MOBILE_LINKS.length }}
            >
              <button
                type="button"
                className="mobile-menu__link"
                onClick={() => {
                  onClose();
                  onOpenAi();
                }}
              >
                <span className="mobile-menu__link-index">
                  {String(MOBILE_LINKS.length + 1).padStart(2, "0")}
                </span>
                Ask AI
              </button>
            </li>
          </ul>

          <div
            className="mobile-menu__social"
            style={{ "--item-index": MOBILE_LINKS.length + 1 }}
          >
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

MobileNav.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
  site: PropTypes.object.isRequired,
  onOpenAi: PropTypes.func.isRequired,
};

export default MobileNav;