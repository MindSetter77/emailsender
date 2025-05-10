import React, { useState, useEffect } from 'react';

import EmailSender from './EmailSender';
import GeneratedComp from './GeneratedComp';
import ErrorMessage from './ErrorMessage';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

interface HomeProps {
    generatedEmail: string
    setGeneratedEmail: React.Dispatch<React.SetStateAction<string>>
    error: boolean
    setError: React.Dispatch<React.SetStateAction<boolean>>
}

function Home({generatedEmail, setGeneratedEmail, error, setError} : HomeProps) {

    const [minHeight, setMinHeight] = useState('0px');

    useEffect(() => {
      const updateMinHeight = () => {
        const width = window.innerWidth;
        setMinHeight(width < 850 ? '300px' : '0px');
      };
  
      updateMinHeight(); // wywołaj raz na start
      window.addEventListener('resize', updateMinHeight);
      return () => window.removeEventListener('resize', updateMinHeight);
    }, []);

  const Spinner = () => (
    <div
      style={{
        border: '4px solid rgba(255, 255, 255, 0.3)',
        borderTop: '4px solid #fff',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite', // Animacja obrotu
      }}
    />
  );

  return (  
    <div style={{ backgroundColor: '#0d0d0d', width: '100vw', minHeight: '100vh', position: 'relative', overflow: 'hidden', fontFamily: 'Inter, sans-serif', color: 'white' }}>
      <div style={{ position: 'absolute', top: '150%', left: '50%', width: '1200px', height: '800px', backgroundColor: 'rgb(255, 62, 207)', borderRadius: '50%', filter: 'blur(400px)', transform: 'translate(-50%, -50%)', opacity: 0.6, zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '-20%', left: '50%', width: '1200px', height: '800px', backgroundColor: 'rgb(62, 139, 255)', borderRadius: '50%', filter: 'blur(400px)', transform: 'translate(-50%, -50%)', opacity: 0.6, zIndex: 0 }} />
      {/* Główna zawartość */}
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', zIndex: 2, position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, type: 'spring' }}
         style={{minHeight: window.innerWidth < 850 ? ('280px') : ('0px')}}
      >
      <h1 style={{ fontSize: '3rem', textShadow: '0 0 10px rgba(255, 255, 255, 0.6)', marginTop: '75px  ' }}>
        <Typewriter
          words={['✉️ AI Email Generator', '📬 Szybkie. Profesjonalne. AI.']}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={2000}
        />
      </h1>
      </motion.div>
        <motion.p 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, type: 'spring' }}
        style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '2rem', maxWidth: '600px', textAlign: 'center', zIndex: 1 }}>
          Automatycznie generuj profesjonalne maile w kilka sekund dzięki sztucznej inteligencji. Podaj temat i cel, a resztę zrobi AI!
        </motion.p>
        { error ? (<ErrorMessage/>) : null}
        

        <div style={{minHeight: generatedEmail === 'wait' ? ('550px') : ('0px'), display: 'flex', alignItems: 'center'}}>
        {generatedEmail === '' ? (
          <EmailSender setGeneratedEmail={setGeneratedEmail} setError={setError} />
        ) : generatedEmail === 'wait' ? (<Spinner/>) : (
          <GeneratedComp generatedEmail={generatedEmail}/>
        )}
        </div>

      </main>

      {/* Stopka */}
      <footer style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', opacity: 0.6 }}>
        © {new Date().getFullYear()} MailCraft AI — Powered by React & OpenAI
      </footer>

      <style> {` @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } `} </style>
    </div>
  );
}

export default Home;
