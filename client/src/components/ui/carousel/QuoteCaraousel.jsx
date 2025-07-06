// src/components/QuoteCarousel.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import "./QuoteCarousel.css";

const quotes = [
  {
    text: "Travel is the only thing you buy that makes you richer.",
    author: "– Anonymous",
  },
  {
    text: "Jobs fill your pocket, but adventures fill your soul.",
    author: "– Jaime Lyn Beatty",
  },
  {
    text: "Wander often, wonder always.",
    author: "– Unknown",
  },
  {
    text: "The world is a book and those who do not travel read only one page.",
    author: "– Saint Augustine",
  },
];

const QuoteCarousel = () => {
  return (
    <div className="quote-carousel-wrapper">
      <Carousel
        indicators
        interval={5000}
        slide
        controls={false}
        className="custom-carousel"
      >
        {quotes.map((q, index) => (
          <Carousel.Item key={index}>
            <div className="quote-card">
              <p className="quote-text">“{q.text}”</p>
              <p className="quote-author">{q.author}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default QuoteCarousel;
