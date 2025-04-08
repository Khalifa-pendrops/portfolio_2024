import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGoogleNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://portfolio-2024-2cjd.onrender.com/api/top-headlines",
        {
          params: {
            category: "general",
            max: 10,
            lang: "en",
            country: "us",
          },
        }
      );
      setNews(response.data.articles || []);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          err.message ||
          "Failed to load news/articles"
      );
      console.error("News fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleNews();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">Loading Tech News/Articles...</div>
    );
  }

  if (error) {
    return <div className="text-center my-5 text-danger">Error: {error}</div>;
  }

  if (!news || news.length === 0) {
    return <div className="text-center my-5">No news articles found.</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Latest Tech News</h2>
      <div className="row">
        {news.map((article, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="news-item card h-100 shadow-sm">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{article.title}</h3>
                <p className="card-text">{article.description}</p>
                <div className="mt-auto">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                  >
                    Read more
                  </a>
                  {article.source?.name && (
                    <small className="d-block mt-2 text-muted">
                      Source: {article.source.name}
                    </small>
                  )}
                  {article.publishedAt && (
                    <small className="d-block text-muted">
                      Published:{" "}
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </small>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
