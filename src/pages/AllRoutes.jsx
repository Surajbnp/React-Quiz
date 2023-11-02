import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Quiz from "./Quiz";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default AllRoutes;
