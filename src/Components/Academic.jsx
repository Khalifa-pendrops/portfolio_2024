import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";
import News from "./News";

function Academic() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center gap-1 pt-5 text-center">
      <h1 className="header-h1-academic w-100 ">Tech News</h1>
      <p className="p-text fs-5 text-center">
        Page reconstruction still in progress. If you don't find what interests
        you, please check back later. Thank you 🙏
      </p>
      <Link className="linked-btn" to="/">
        <button className="bg-none-btn btn border rounded-2 text-white">
          Go to home
        </button>
      </Link>
      <News />
    </div>
  );
}

export default Academic;
