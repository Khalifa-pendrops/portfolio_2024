import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://portfolio-2024-2cjd.onrender.com/api/tech-news")
      .then((res) => {
        setNews(response.data.response.docs);
        setLoading(false);
      })
      .catch((err) => {
        "Error fetching news: ", err;
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">Loading Tech News/Articles...</div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Latest Tech News From New York Times</h2>
      <div className="row">
        {news.map((article, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              {/* {article.image_url && (
                <img
                  src={article.image_url}
                  className="card-img-top"
                  alt={article.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )} */}
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{article.headline.main}</h3>
                <p className="card-text">
                  <strong>Published:</strong>
                  {new Date(article.pub_date).toDateString()}
                </p>
                {/* <p className="card-text">{article.published_At}</p> */}
                {/* <span className="card-text">{article.source}</span> */}
                <a
                  href={article.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-btn-lg btn btn-outline-primary mt-auto"
                >
                  Read full article
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
