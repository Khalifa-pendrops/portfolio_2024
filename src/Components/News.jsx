import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://portfolio-2024-2cjd.onrender.com/api/tech-news")
      .then((res) => {
        setNews(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        "Error fetching news: ", err;
      });
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading Tech News...</div>;
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Latest Tech News</h2>
      <div className="row">
        {news.map((article, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              {article.image && (
                <img
                  src={article.image}
                  className="card-img-top"
                  alt={article.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{faCaretDown.description}</p>
                <p>{article.publishedAt}</p>
                <span>{article.source.name}</span>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto btn btn-primary btn-sm"
                >
                  Read more
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
