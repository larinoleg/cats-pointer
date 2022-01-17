import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CatPagination from "./CatPagination";
import DescCat from "./DescCat";
import NotFound from "./NotFound";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<CatPagination />} />
        <Route path="/:id" element={<DescCat />} />
        <Route path="not_found" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("container")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//
