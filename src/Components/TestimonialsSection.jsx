import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { TESTIMONIALS } from "../data/testimonials";

const TestimonialCard = ({ testimonial }) => (
  <article
    className={`testimonial-card ${
      testimonial.highlight ? "testimonial-card--highlight" : ""
    }`}
  >
    <div className="testimonial-card__stars" aria-hidden="true">
      ★★★★★
    </div>
    <FontAwesomeIcon
      className="testimonial-card__icon"
      icon={faQuoteLeft}
      aria-hidden="true"
    />
    <blockquote className="testimonial-card__quote">
      {testimonial.quote}
    </blockquote>
    <footer className="testimonial-card__footer">
      <p className="testimonial-card__name">{testimonial.name}</p>
      <p className="testimonial-card__meta">
        {testimonial.role} · {testimonial.location}
      </p>
    </footer>
  </article>
);

const TestimonialsSection = () => {
  const trackItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="section-block testimonials-section">
      <div className="section-heading container-xxl">
        <h2>Testimonials</h2>
        <p>What collaborators and leaders say about working with me.</p>
      </div>

      <div className="testimonials-marquee" aria-label="Client and colleague testimonials">
        <div className="testimonials-track">
          {trackItems.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;