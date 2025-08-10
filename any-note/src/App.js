import './App.css';
import Home from './Component/Home'
import Notes from './Component/Notes'
import { CgAdd } from "react-icons/cg";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/addnote" element ={<CgAdd />}></Route>
      </Routes>
    </Router>
  )
}

export default App
