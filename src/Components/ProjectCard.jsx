import React from "react";
import PropTypes from "prop-types";

const ProjectCard = ({ project, compact = false }) => {
  const CardWrapper = project.href ? "a" : "article";
  const wrapperProps = project.href
    ? {
        href: project.href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <CardWrapper
      className={`project-card ${compact ? "project-card--compact" : ""} ${
        project.href ? "project-card--link" : ""
      }`}
      data-aos="fade-up"
      {...wrapperProps}
    >
      <div className="project-card__media">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="project-card__placeholder" aria-hidden="true">
            {project.imageInitials || project.title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="project-card__body">
        <p className="project-card__category">{project.category}</p>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">
          {compact ? project.summary : project.description}
        </p>
        <div className="project-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-card__tag">
              {tag}
            </span>
          ))}
        </div>
        {project.href ? (
          <span className="project-card__cta">{project.hrefLabel} →</span>
        ) : (
          <span className="project-card__cta project-card__cta--muted">
            {project.hrefLabel}
          </span>
        )}
      </div>
    </CardWrapper>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    description: PropTypes.string,
    href: PropTypes.string,
    hrefLabel: PropTypes.string,
    image: PropTypes.string,
    imageInitials: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  compact: PropTypes.bool,
};

export default ProjectCard;