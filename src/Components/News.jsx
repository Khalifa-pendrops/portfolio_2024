import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function News() {
  const [news, setNews] = useState([]);
  const [aiNews, setAiNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMobile = window.innerWidth <= 768; // define smaller screen width:
  const cacheKey = "aiNewsCache";
  const cacheExpiry = 1000 * 60 * 60; //set to 1 hour

  const fetchGoogleNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://portfolio-2024-1.onrender.com/api/top-headlines?lang=en&country=us"
        // {
        //   params: {
        //     category: "technology",
        //     max: 10,
        //     lang: "en",
        //     country: "us",
        //   },
        // }
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

  const fetchAiNews = async () => {
    //first check if response is cahced in localStorage
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      const { data, timestamp } = JSON.parse(cached);

      if (Date.now() - timestamp < cacheExpiry) {
        setAiNews(data);
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axios.get(
        "https://portfolio-2024-1.onrender.com/api/news?language=en&country=us&category=technology"
        // {
        //   params: {
        //     category: "technology",
        //     page_size: 10,
        //     lang: "en",
        //     country: "us",
        //   },
        // }
      );

      const results = response.data.results || [];
      setAiNews(results);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: results, timestamp: Date.now() })
      );
    } catch (error) {
      console.error("Error fetching AI news: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleNews();
    fetchAiNews();
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

  const displayedArticles = isMobile ? aiNews.slice(0, visibleCount) : aiNews;

  return (
    <div className="container my-5">
      <h2
        className="text-center mb-5 font-monospace fs-1 text-decoration-underline fw-bold"
        style={{
          textUnderlineOffset: "10px",
          textDecorationThickness: "1px",
          textDecorationColor: "#F79D29",
        }}
      >
        Latest Tech News
      </h2>
      <div className="row">
        {news.map((article, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm d-flex flex-column gap-4">
              {article.image && (
                <img
                  src={article.image}
                  alt={article.title}
                  className="card-img-top"
                  style={{ height: "300px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">{article.title}</h3>
                <p className="card-text">{article.description}</p>
                <div className="mt-auto d-flex flex-column justify-content-center align-items-center gap-3">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary custom-btn"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mb-4 text-primary ">🧠 AI News</h2>
      <span>Section under maintenance...</span>
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <>
          <div className="row">
            {displayedArticles.map((article, index) => (
              <div className="col-md-6 mb-4" key={index}>
                <div className="card h-100">
                  <div className="card-body  d-flex flex-column">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">
                      {article.description ||
                        "No description available at this time."}
                    </p>
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto btn btn-outline-primary"
                    >
                      Read Full Article
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isMobile && (
            <div className="text-center ">
              {visibleCount < aiNews.length ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setVisibleCount((prev) => prev + 4)}
                >
                  ReadMore
                </button>
              ) : (
                <button
                  className="btn btn-secondary"
                  onClick={() => setVisibleCount(4)}
                >
                  Show Less
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default News;
