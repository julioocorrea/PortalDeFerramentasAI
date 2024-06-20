import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ImageGenerator from './Pages/ImageGenerator/ImageGenerator';
import Translator from './Pages/Translator';
import CodeOptimizer from './Pages/CodeOptimizer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-generator" element={<ImageGenerator />} />
        <Route path="/translator" element={<Translator />} />
        <Route path="/code-optimizer" element={<CodeOptimizer />} />
      </Routes>
    </Router>
  );
}

export default App;
