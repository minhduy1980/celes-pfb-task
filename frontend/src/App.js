import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Footer from "./Footer";


const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  ); 
};

export default App;
