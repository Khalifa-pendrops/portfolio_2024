import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

function Academic() {
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center gap-1 pt-5 text-center">
      <h1 className="display-5 w-50 w-sm-100">Academics & Research</h1>
      <p className="p-text fs-5 ">
        Page reconstruction in progress, please check back later. Thank you.
      </p>
      <Link className="linked-btn" to="/">
        <button className="bg-none-btn btn border rounded-2 text-white">
          Go to home
        </button>
      </Link>
    </div>
  );
}

export default Academic;
