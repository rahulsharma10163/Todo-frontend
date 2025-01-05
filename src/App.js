import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddTaskPage from "./pages/AddTaskPage";
import Edepag from "./pages/Edepag";
import './style/tailwind.css';
function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddTaskPage />} />
        <Route path="/edit/:taskId" element={<Edepag />} />
        </Routes>
  </Router>
  );
}

export default App;
