import { motion, styleEffect } from 'framer-motion';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

interface NavbarProps {
    setGeneratedEmail: React.Dispatch<React.SetStateAction<string>>
    setError: React.Dispatch<React.SetStateAction<boolean>>
    language: string
    setLanguage: React.Dispatch<React.SetStateAction<string>>
  }



function Navbar({setGeneratedEmail, setError, language, setLanguage} : NavbarProps) {
    const navigate = useNavigate();
  
  return (  
    <motion.header 
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 5, type: 'spring' }}
      style={{ display: 'flex',  position: 'absolute', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', zIndex: 5, borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100vw' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, cursor: 'pointer', color: 'white' }} onClick={() => {setGeneratedEmail(''); setError(false); navigate('/')}}>📨 MailPilot AI</h2>
        <nav style={{ display: 'flex'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <div onClick={() => {language === 'EN' ? setLanguage('PL') : setLanguage('EN')}} style={{cursor: 'pointer'}}>
            <img src={language === 'EN' ? ('uk-flag.png') : ('pl-flag.png')} style={{width: '40px'}} />
          </div>
          <a onClick={() => navigate('/')} style={{ color: 'white', textDecoration: 'none', opacity: 0.8, cursor: 'pointer', fontSize: '21px' }}>{language === 'EN' ? ('Home') : ('Strona główna')}</a>
          <div onClick={() => navigate('/about')}><a   style={{ color: 'white', textDecoration: 'none', opacity: 0.8, marginRight: '100px', cursor: 'pointer', fontSize: '21px' }}>{language === 'EN' ? ('About') : ('O stronie')}</a></div>
          </div>
        </nav>
      </motion.header>
  );
}

export default Navbar;
