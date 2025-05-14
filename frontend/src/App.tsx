
import './App.css';
import About from './Components/About';
import { motion } from 'framer-motion';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import React, {useState} from 'react';


function App() {
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('EN')
  

  return (
    <Router>
      <Navbar setGeneratedEmail={setGeneratedEmail} setError={setError} language={language} setLanguage={setLanguage}/>
      <Routes>
        <Route path="/" element={<Home generatedEmail={generatedEmail} setGeneratedEmail={setGeneratedEmail} error={error} setError={setError} language={language} />} />
        <Route path="/about" element={<About language={language}/>} />
      </Routes>
    </Router>
  );
}

export default App;
