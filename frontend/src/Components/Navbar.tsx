import { motion, styleEffect } from 'framer-motion';
import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

interface NavbarProps {
    setGeneratedEmail: React.Dispatch<React.SetStateAction<string>>
    setError: React.Dispatch<React.SetStateAction<boolean>>
    language: string
    setLanguage: React.Dispatch<React.SetStateAction<string>>
  }



function Navbar({setGeneratedEmail, setError, language, setLanguage} : NavbarProps) {
    const navigate = useNavigate();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    // cleanup przy odmontowaniu
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (  
    <motion.header 
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 5, type: 'spring' }}
      style={{ display: 'flex',  position: 'absolute', justifyContent: 'space-between', alignItems: 'center', zIndex: 5, borderBottom: '1px solid rgba(255,255,255,0.1)', width: '100vw', height: '60px ' }}>
        <h2 style={{ fontSize: '1.5rem', margin: 0, cursor: 'pointer', color: 'white', marginLeft: window.innerWidth < 540 ? '10px' : '70px' }} onClick={() => {setGeneratedEmail(''); setError(false); navigate('/')}}>📨 MailPilot</h2>
        <div style={{ display: 'flex'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '1rem', width: '100%'}}>
          <div onClick={() => {language === 'EN' ? setLanguage('PL') : setLanguage('EN')}} style={{cursor: 'pointer'}}>
            <img src={language === 'EN' ? ('uk-flag.png') : ('pl-flag.png')} style={{width: '40px'}} />
          </div>
          <a onClick={() => navigate('/')} style={{ color: 'white', textDecoration: 'none', opacity: 0.8, cursor: 'pointer', fontSize: '21px' }}>Home</a>
          <div onClick={() => navigate('/about')}><a   style={{ color: 'white', textDecoration: 'none', opacity: 0.8, marginRight: window.innerWidth < 540 ? '10px' : '70px', cursor: 'pointer', fontSize: '21px' }}>{language === 'EN' ? ('About') : ('O nas')}</a></div>
          </div>
        </div>
      </motion.header>
  );
}

export default Navbar;
