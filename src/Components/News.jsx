import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(
          "https://portfolio-2024-2cjd.onrender.com/api/tech-news",
          { timeout: 30000 }
        );

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setNews(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">Loading Tech News/Articles...</div>
    );
  }

  if (error) {
    return <div className="text-center my-5 text-danger">{error}</div>;
  }

  if (news.length === 0) {
    return <div className="text-center my-5">No news articles found.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Latest Tech News From New York Times</h2>
      <div className="row">
        {news.map((article, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <img className="card-img" src={article.image} />
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{article.title}</h3>
                <p className="card-text">{article.description}</p>
                <p className="card-text">
                  <strong>Published:</strong>{" "}
                  {new Date(article.publishedAt).toDateString()}
                </p>
                <a
                  href={article.url}
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
